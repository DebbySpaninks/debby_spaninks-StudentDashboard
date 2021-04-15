<!-- Component to display Grid -->

<script>

import { tick } from 'svelte';

export let options = {};
export let data;
export let sizes = {};

let selecting = false;
let resizing = false;
let selected = false;
let focused = false;
let editing = false;
let lastCell = false;
let editor;

const defaults = {
  numRows: 100,
  numColumns: 26,
  defaultWidth: 10,
  defaultHeight: 2,
  rows: true,
  columns: true
};

function getElementIndex(node) {
  var index = 0;
  while ((node = node.previousElementSibling)) {
    index++;
  }
  return index;
}

function getCellFromPoint(x, y) {
  const result = {
    col: -1,
    row: -1
  };
  let j = 0;
  let sum = 0;
  while (x >= sum) {
    result.col++;
    sum += sizes && sizes['c' + j] ? sizes['c' + j] : options.defaultWidth;
    j++;
  }
  j = 0;
  sum = 0;
  while (y >= sum) {
    result.row++;
    sum += sizes && sizes['r' + j] ? sizes['r' + j] : options.defaultHeight;
    j++;
  }
  return result;
}

function hDown(e, index, columns = true) {
  e.preventDefault;
  e.stopPropagation();
  const elRect = e.target.parentElement.getBoundingClientRect();
  resizing = {
    columns: columns,
    index: index,
    orig: columns ?
      (sizes && sizes['c' + index] ? sizes['c' + index] : options.defaultWidth) :
      (sizes && sizes['r' + index] ? sizes['r' + index] : options.defaultHeight),
    start: columns ? elRect.x + elRect.width : elRect.y + elRect.height,
    em: Number(getComputedStyle(document.body, '').fontSize.match(/(\d+(\.\d+)?)px$/)[1])
  };
}

function pDown(e) {

  selecting = true;
  const x = getElementIndex(e.path[0]) - 1;
  const y = getElementIndex(e.path[1]);
  const isColumnHeader = e.path[0].tagName === 'TH';
  const cell = { x, y };
  if (isColumnHeader) {
    selected = {
      min: {
        x: x,
        y: 0
      },
      max: {
        x: x,
        y: options.numRows - 1
      }
    };
  }
  else {
    selected = {
      min: {
        x: x,
        y: y
      },
      max: {
        x: x,
        y: y
      }
    };
  }
  focused = cell;
  editing = false;
  console.log(x, y, isColumnHeader, e.path[0].tagName);
}

function pMove(e) {
  e.stopPropagation();
  if (selecting) {
    const x = getElementIndex(e.path[0]) - 1;
    const y = getElementIndex(e.path[1]);
    const minX = Math.min(x, focused.x);
    const maxX = Math.max(x, focused.x);
    const minY = Math.min(y, focused.y);
    const maxY = Math.max(y, focused.y);
    selected = {
      min: {
        x: minX,
        y: minY
      },
      max: {
        x: maxX,
        y: maxY
      }
    };
  }
  else if (resizing) {
    if (resizing.columns) {
      // a header column is being resized
      sizes['c' + resizing.index] = resizing.orig - ((resizing.start - e.clientX) / resizing.em);
    }
    else  {
      // a row is being resized
      sizes['r' + resizing.index] = resizing.orig - ((resizing.start - e.clientY) / resizing.em);
    }
  }
}

function pUp(e) {
  selecting = false;
  resizing = false;
}

async function keyDown(e) {
  if (!lastCell) {
    lastCell = {
      x: focused.x,
      y: focused.y
    };
  }
  let calcsel = false;
  switch (e.code) {
    case 'ArrowUp':
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey) {
        lastCell.y = lastCell.y > 0 ? lastCell.y - 1 : 0;
        calcsel = true;
      }
      else {
        focused.y = focused.y > 0 ? focused.y - 1 : 0;
        selected = false;
      }
      break;
    case 'ArrowDown':
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey) {
        lastCell.y = lastCell.y < (options.numRows - 1) ? lastCell.y + 1 : (options.numRows - 1);
        calcsel = true;
      }
      else {
        focused.y = focused.y < (options.numRows - 1) ? focused.y + 1 : (options.numRows - 1);
        selected = false;
      }
      break;
    case 'ArrowRight':
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey) {
        lastCell.x = lastCell.x < (options.numColumns - 1) ? lastCell.x + 1 : (options.numColumns - 1);
        calcsel = true;
      }
      else {
        focused.x = focused.x < (options.numColumns - 1) ? focused.x + 1 : (options.numColumns - 1);
        selected = false;
      }
      break;
    case 'ArrowLeft':
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey) {
        lastCell.x = lastCell.x > 0 ? lastCell.x - 1 : 0;
        calcsel = true;
      }
      else {
        focused.x = focused.x > 0 ? focused.x - 1 : 0;
        selected = false;
      }
      break;
    case 'Tab':
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey) {
        if (focused.x > 0) {
          focused.x--;
        }
        else {
          if (focused.y > 0) {
            focused.y--;
          }
          focused.x = (options.numColumns - 1);
        }
      }
      else {
        if (focused.x == (options.numColumns - 1)) {
          focused.x = 0;
          focused.y++;
        }
        else {
          focused.x++;
        }
      }
      break;
    case 'Enter':
      focused.y = focused.y < (options.numRows - 1) ? focused.y + 1 : (options.numRows - 1);
      selected = false;
      break;
    default:
      if (!editing) {
        editing = true;
        selected = false;
        await tick();
        editor.value = '';
        editor.focus();
      }
      console.log(e.code);
      break;
  }
  if (calcsel) {
    const minX = Math.min(lastCell.x, focused.x);
    const maxX = Math.max(lastCell.x, focused.x);
    const minY = Math.min(lastCell.y, focused.y);
    const maxY = Math.max(lastCell.y, focused.y);
    selected = {
      min: {
        x: minX,
        y: minY
      },
      max: {
        x: maxX,
        y: maxY
      }
    };
  }
}

function colName(i) {
  const n = Math.floor(i / 26);
  const rest = i % 26;
  let result = '';
  for (let counter = 0; counter < n; counter++) {
    result += 'A';
  }
  result += String.fromCharCode(65 + rest);
  return result;
  // return String.fromCharCode(65+i);
}

function MergeRecursive(obj1, obj2) {
  for (var p in obj2) {
    try {
      if (obj2[p].constructor == Object) {
        obj1[p] = MergeRecursive(obj1[p], obj2[p]);
      }
      else {
        obj1[p] = obj2[p];
      }
    }
    catch (e) {
      obj1[p] = obj2[p];
    }
  }
  return obj1;
}

$: options = MergeRecursive(defaults, options);
// $: totalWidth = data.w.reduce( (acc,cur) => acc+=cur, 0);
// $: totalHeight = data.h.reduce( (acc,cur) => acc+=cur, 0);
$: console.log(options);

</script>

<h1>Dit is het display component van Grid</h1>

<svelte:window on:pointermove={pMove} on:pointerup={pUp} />

<div class="spreadsheet viewport {$$props.class || ''}">
  <table tabindex="0" on:keydown={keyDown} on:pointerdown={pDown}>
  {#if options.columns}
    <thead>
      <tr style="height: {options.defaultHeight}em;" class:hresizing={resizing}>
        <th></th>
        {#each data[0] as col, ci}
          <th class:sel={selected && ci >= selected.min.x && ci <= selected.max.x}>
            {colName(ci)}
            <div class="resizer horizontal" class:silent={resizing} on:pointerdown={e => hDown(e, ci, true)} />
          </th>
        {/each}
      </tr>
    </thead>
  {/if}
  <tbody>
    {#each data as row, ri}
      <tr style="height: {sizes && sizes['r' + ri] ? sizes['r' + ri] : options.defaultHeight}em;">
        {#each row as col, ci}
          {#if options.rows && ci === 0}
            <th class:vresizing={resizing} class:sel={selected && ri >= selected.min.y && ri <= selected.max.y}>
              {ri + 1}
              <div class="resizer vertical" class:silent={resizing} on:pointerdown={e => hDown(e, ri, false)} />
            </th>
          {/if}
          <td style="min-width: {sizes && sizes['c' + ci] ? sizes['c' + ci] : options.defaultWidth}em; width: {sizes && sizes['c' + ci] ? sizes['c' + ci] : options.defaultWidth}em;"
            class:focused={focused && focused.x == ci && focused.y == ri}
            class:sel={selected && (ci >= selected.min.x) && (ci <= selected.max.x) && (ri >= selected.min.y) && (ri <= selected.max.y)}
            class:right={col.alignment === 'right'}
            class:center={col.alignment === 'center'}
            class:left={col.alignment === 'left'}
          >
            {#if editing && focused && focused.x == ci && focused.y == ri}
              <input bind:this={editor} type='text' bind:value={data[ri][ci]}>
            {:else}
              {data[ri][ci]}
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

</div>

<style type="text/less">

.spreadsheet {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: scroll;
  position: relative;
}

table {
  position: relative;
  border-collapse: collapse;
  user-select: none;
}

table:focus {
  outline: none;
}

thead {
  border-top: 0;
  border-left: 1px solid #ccc;
}

thead th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  top: 0;
  background: #f0f0f0;
  color: #444;
  background-clip: padding-box;
  padding: .25em;
  z-index: 1;
  border-right: 1px solid #ccc;
  font-weight: normal;
  color: #888;
  box-sizing: border-box;
}

thead th:first-child {
  left: 0;
  z-index: 2;
}

thead th.sel:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  bottom: 0;
  background: #2196f3;
  opacity: 0.2;
}

tbody th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 0;
  z-index: 1;
  padding: 0 .4em;
  background: #f0f0f0;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  font-weight: normal;
  text-align: right;
  color: #888;
  box-sizing: border-box;
}

tbody td {
  padding: 0 .3em;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  text-align: left;
  box-sizing: border-box;
  position: relative;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* &.right {
    text-align: right;
  }
  &.center {
    text-align: center;
  }
  &>input {
    font-family: inherit;
    border: none;
    padding: 0;
    margin: 0;
    font-size: inherit;
    box-sizing: border-box;
    width: 100%;
    outline: none;
  } */
}

tbody td.right {
  text-align: right;
}

tbody td.left {
  text-align: left;
}

tbody td.center {
  text-align: center;
}

tbody td > input {
  font-family: inherit;
  border: none;
  padding: 0;
  margin: 0;
  font-size: inherit;
  box-sizing: border-box;
  width: 100%;
  outline: none;
}

.focused {
  outline: 2px solid #2196f3;
}

.silent {
  pointer-events: none;
}

.resizer {
  position: absolute;
  /* &.horizontal {
    right: 0;
    height: 100%;
    width: .4em;
    top: 0;
    cursor: ew-resize;
  }
  &.vertical {
    bottom: 0;
    width: 100%;
    height: .4em;
    left: 0;
    cursor: ns-resize;
  } */
}

.resizer.horizontal {
  right: 0;
  height: 100%;
  width: .4em;
  top: 0;
  cursor: ew-resize;
}

.resizer.vertical {
  bottom: 0;
  width: 100%;
  height: .4em;
  left: 0;
  cursor: ns-resize;
}

.hresizing {
  cursor: ew-resize;
}
.vresizing {
  cursor: ns-resize;
}

tbody .sel:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  bottom: 0;
  background: #2196f3;
  opacity: 0.2;
}

</style>
