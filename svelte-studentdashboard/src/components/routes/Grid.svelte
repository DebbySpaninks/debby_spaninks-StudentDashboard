<!-- component to display Grid -->

<script>

// imports
import { tick } from 'svelte';

// props
export let options = {};
export let data = [ [] ];
export let sizes = {};
export let numRows = [];

// local state
let grid;
let selecting = false;
let resizing = false;
let selected = false;
let focused = false;
let editing = false;
let lastCell = false;
const calculated = {};
const cellsContainingFormula = new Set();
let editor;

// option defaults
const defaults = {
  numRows: numRows,
  numColumns: 26,
  defaultWidth: 10,
  defaultHeight: 2,
  rows: true,
  columns: true
};

$: em = grid ? Number(getComputedStyle(grid, '').fontSize.match(/(\d+(\.\d+)?)px$/)[1]) : 16;
$: options = MergeRecursive(defaults, options);
$: selbox = selected ? calcSelBox(selected) : false;


function isFormulaExpression(expression) {
  return typeof expression === 'string' && expression.length >= 2 && expression.charAt(0) === '=';
}


function toUpperCaseFormula(expression) {
  const PATTERN = /(\\"|"(?:\\"|[^"])*"|(\+))|(\\'|'(?:\\'|[^'])*'|(\+))/g;
  const strings = expression.match(PATTERN) || [];
  let index = -1;
  return expression.toUpperCase().replace(PATTERN, () => {
    index += 1;
    return strings[index];
  });
}


function evaluateFormula(f) {
  if (typeof f !== 'string') {
    return 10;
  }
  if (f[0] === '=') {
    f = f.substr(1, 999);
  }
  return 'result of ' + f;
}

// function recalcSheets() {
//   cellsContainingFormula.forEach(cell => {
//     calculated[cell.row] = calculated[cell.row] || {};
//     calculated[cell.row][cell.column] = evaluateFormula(data[cell.row][cell.column])
//   })
// }

export function findCellsContainingFormula(e) {
  // cellsContainingFormula.clear();
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      if (data[row][col] && data[row][col][0] === '=') {
        calculated[row] = calculated[row] || {};
        calculated[row][col] = evaluateFormula(data[row][col]);
        // cellsContainingFormula.add({row, cell})
      }
    }
  }
  // recalcSheets();
}


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
  e.stopPropagation();
  const x = getElementIndex(e.target) - 1;
  const y = getElementIndex(e.target.parentElement);
  const isColumnHeader = (e.target.tagName === 'FIXEDCELL') && (e.target.parentElement.tagName == 'GRIDHEADER');
  const isRowHeader = (e.target.tagName === 'FIXEDCELL') && (e.target.parentElement.tagName == 'ROW');
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
    focused = {
      x: x,
      y: 0
    };
  }
  else if (isRowHeader) {
    selected = {
      min: {
        x: 0,
        y: y
      },
      max: {
        x: options.numColumns - 1,
        y: y
      }
    };
    focused = {
      x: 0,
      y: y
    };
  }
  else {
    if (e.shiftKey && focused) {
      // extend selection from focused cell
      selected = {
        min: { x: Math.min(x, focused.x), y: Math.min(y, focused.y) },
        max: { x: Math.max(x, focused.x), y: Math.max(y, focused.y) }
      };
      editing = false;
      lastCell = false;
    }
    else {
      focused = cell;
      editing = false;
      lastCell = false;
      selected = {
        min: { x, y },
        max: { x, y }
      };
    }
  }
}

function pMove(e) {
  e.stopPropagation();
  if (selecting && (e.target.tagName !== 'TH')) {
    const x = getElementIndex(e.target) - 1;
    const y = getElementIndex(e.target.parentElement);
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
    lastCell = { x:x, y:y };
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
  selected = selected;
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
      if (e.ctrlKey || e.metaKey) {
        let found = false;
        // find next non-empty cell above, or first row if no non-empty cells were found
        while (!found && (lastCell.y > 0)) {
          // check if cell has value
          lastCell.y--;
          if ((lastCell.y < data.length) && (lastCell.x < data[lastCell.y].length)) {
            found = (data[lastCell.y][lastCell.x] !== '') && (data[lastCell.y][lastCell.x] !== null);
          }
        }
        if (e.shiftKey) {
          calcsel = true;
        }
        else {
          focused = lastCell;
          selected = false;
        }
      }
      else if (e.shiftKey) {
        lastCell.y = lastCell.y > 0 ? lastCell.y - 1 : 0;
        calcsel = true;
      }
      else {
        focused.y = focused.y > 0 ? focused.y - 1 : 0;
        selected = false;
        lastCell = false;
      }
      grid.focus();
      break;
    case 'ArrowDown':
      e.preventDefault();
      e.stopPropagation();
      if (e.ctrlKey || e.metaKey) {
        let found = false;
        // find next non-empty cell below, or last row if no non-empty cells were found
        while (!found && (lastCell.y < (options.numRows - 1))) {
          // check if cell has value
          lastCell.y++;
          if ((lastCell.y < data.length) && (lastCell.x < data[lastCell.y].length)) {
            found = (data[lastCell.y][lastCell.x] !== '') && (data[lastCell.y][lastCell.x] !== null);
          }
        }
        if (e.shiftKey) {
          calcsel = true;
        }
        else {
          focused = lastCell;
          selected = false;
        }
      }
      else if (e.shiftKey) {
        lastCell.y = lastCell.y < (options.numRows - 1) ? lastCell.y + 1 : (options.numRows - 1);
        calcsel = true;
      }
      else {
        focused.y = focused.y < (options.numRows - 1) ? focused.y + 1 : (options.numRows - 1);
        selected = false;
        lastCell = false;
      }
      grid.focus();
      break;
    case 'ArrowRight':
      e.preventDefault();
      e.stopPropagation();
      if (e.ctrlKey || e.metaKey) {
        let found = false;
        // find next non-empty cell above, or first row if no non-empty cells were found
        while (!found && (lastCell.x < options.numColumns - 1)) {
          // check if cell has value
          lastCell.x++;
          if ((lastCell.y < data.length) && (lastCell.x < data[lastCell.y].length)) {
            found = (data[lastCell.y][lastCell.x] !== '') && (data[lastCell.y][lastCell.x] !== null);
          }
        }
        if (e.shiftKey) {
          calcsel = true;
        }
        else {
          focused = lastCell;
          selected = false;
        }
      }
      else if (e.shiftKey) {
        lastCell.x = lastCell.x < (options.numColumns - 1) ? lastCell.x + 1 : (options.numColumns - 1);
        calcsel = true;
      }
      else {
        focused.x = focused.x < (options.numColumns - 1) ? focused.x + 1 : (options.numColumns - 1);
        selected = false;
        lastCell = false;
      }
      grid.focus();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      e.stopPropagation();
      if (e.ctrlKey || e.metaKey) {
        let found = false;
        // find next non-empty cell above, or first row if no non-empty cells were found
        while (!found && (lastCell.x > 0)) {
          // check if cell has value
          lastCell.x--;
          if ((lastCell.y < data.length) && (lastCell.x < data[lastCell.y].length)) {
            found = (data[lastCell.y][lastCell.x] !== '') && (data[lastCell.y][lastCell.x] !== null);
          }
        }
        if (e.shiftKey) {
          calcsel = true;
        }
        else {
          focused = lastCell;
          selected = false;
        }
      }
      else if (e.shiftKey) {
        lastCell.x = lastCell.x > 0 ? lastCell.x - 1 : 0;
        calcsel = true;
      }
      else {
        focused.x = focused.x > 0 ? focused.x - 1 : 0;
        selected = false;
        lastCell = false;
      }
      grid.focus();
      break;
    case 'Tab': {
      e.preventDefault();
      e.stopPropagation();
      const atLeastTwoCellsSelected = selected && ((selected.min.x != selected.max.x) || (selected.min.y != selected.max.y));
      const firstColumn = atLeastTwoCellsSelected ? selected.min.x : 0;
      const lastColumn = atLeastTwoCellsSelected ? selected.max.x : options.numColumns - 1;
      const firstRow = atLeastTwoCellsSelected ? selected.min.y : 0;
      const lastRow = atLeastTwoCellsSelected ? selected.max.y : options.numRows - 1;
      if (e.shiftKey) {
        if (focused.x > firstColumn) {
          focused.x--;
        }
        else {
          if (focused.y > 0) {
            focused.x = lastColumn;
          }
          if (focused.y > firstRow) {
            focused.y--;
          }
        }
      }
      else {
        if (focused.x == lastColumn) {
          focused.x = firstColumn;
          focused.y = focused.y < lastRow ? focused.y + 1 : firstRow;
        }
        else {
          focused.x++;
        }
      }
      grid.focus();
      break;
    }
    case 'Enter':
      focused.y = focused.y < (options.numRows - 1) ? focused.y + 1 : (options.numRows - 1);
      selected = false;
      grid.focus();
      break;
    case 'MetaRight':
    case 'MetaLeft':
    case 'AltRight':
    case 'AltLeft':
    case 'CtrlRight':
    case 'CtrlLeft':
    case 'ShiftRight':
    case 'ShiftLeft':
      break;
    default:
      if (!editing) {
        // ensure data array is large enough to contain focused cell
        while (data.length <= focused.y) {
          data.push([]);
        }
        while (data[focused.y].length <= focused.x) {
          data[focused.y].push('');
        }
        editing = true;
        selected = false;
        await tick();
        editor.value = '';
        editor.focus();
      }
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

async function editCell(e, row, col) {
  while (data.length <= focused.y) {
    data.push([]);
  }
  while (data[focused.y].length <= focused.x) {
    data[focused.y].push('');
  }
  editing = true;
  await tick();
  editor.value = data[row][col];
  editor.focus();
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

function parseValue(e) {
  editing = false;
  findCellsContainingFormula();
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

function calcSelBox(selected) {
  let left = 4 * em, right = 4 * em, top = 2 * em, bottom = 2 * em;
  for (let i = 0; i < selected.min.x; i++) {
    left += sizes['c' + i] ? sizes['c' + i] * em : (options.defaultWidth * em);
  }
  for (let i = 0; i <= selected.max.x; i++) {
    right += sizes['c' + i] ? sizes['c' + i] * em : (options.defaultWidth * em);
  }
  for (let i = 0; i < selected.min.y; i++) {
    top += (1 + sizes['r' + i] ? sizes['r' + i] * em : (options.defaultHeight * em));
  }
  for (let i = 0; i <= selected.max.y; i++) {
    bottom += (1 + sizes['r' + i] ? sizes['r' + i] * em : (options.defaultHeight * em));
  }
  left -= (selected.min.x + 1);
  right -= (selected.max.x + 3);
  return {
    left: left,
    width: right - left,
    top: top - 1,
    height: (bottom - top) - 1
  };
}


</script>

<svelte:window on:pointermove={pMove} on:pointerup={pUp} />

<grid class="{$$props.class || ''}" tabindex="0" bind:this={grid} on:keydown={keyDown} on:pointerdown={pDown}>
  {#if options.columns}
    <gridheader style="height: {options.defaultHeight}em;" class:hresizing={resizing}>
      <fixedcell />
      {#each Array(options.numColumns).fill() as col, ci}
        <fixedcell class:hresizing={resizing}
              class:sel={selected && (ci >= selected.min.x && ci <= selected.max.x) || focused.x == ci}
              style="min-width: {sizes && sizes['c' + ci] ? sizes['c' + ci] : options.defaultWidth}em; max-width: {sizes && sizes['c' + ci] ? sizes['c' + ci] : options.defaultWidth}em;"
              >
          {colName(ci)}
          <hresizer class:silent={resizing} on:pointerdown={e => hDown(e, ci, true)} />
        </fixedcell>
      {/each}
    </gridheader>
  {/if}
  <rows>
    {#each Array(options.numRows).fill() as _, ri}
      <row style="height: {sizes && sizes['r' + ri] ? sizes['r' + ri] : options.defaultHeight}em;">
        {#each Array(options.numColumns).fill() as col, ci}
          {#if options.rows && ci === 0}
            <fixedcell class:vresizing={resizing} class:sel={selected && (ri >= selected.min.y && ri <= selected.max.y) || focused.y == ri}>
              {ri + 1}
              <vresizer class:silent={resizing} on:pointerdown={e => hDown(e, ri, false)} />
            </fixedcell>
          {/if}
          <cell style="min-width: {sizes && sizes['c' + ci] ? sizes['c' + ci] : options.defaultWidth}em; max-width: {sizes && sizes['c' + ci] ? sizes['c' + ci] : options.defaultWidth}em;"
            class:focused={focused && focused.x == ci && focused.y == ri}
            class:sel={selected && (ci >= selected.min.x) && (ci <= selected.max.x) && (ri >= selected.min.y) && (ri <= selected.max.y)}
            on:dblclick={e => editCell(e, ri, ci)}
          >
            {#if editing && focused && focused.x == ci && focused.y == ri}
              <input bind:this={editor} on:blur={parseValue} type='text' bind:value={data[ri][ci]}>
            {:else}
              {#if data[ri] && data[ri][ci]}
                {#if data[ri][ci][0] === '='}
                  {calculated[ri] && calculated[ri][ci] ? calculated[ri][ci] : data[ri][ci]}
                {:else}
                  {data[ri][ci]}
                {/if}
              {/if}
            {/if}
          </cell>
        {/each}
      </row>
    {/each}
    {#if resizing && selected}
      <selectionbox style="top: {selbox.top}px; left: {selbox.left}px; width: {selbox.width}px; height: {selbox.height}px;" class="selborder">
        <div class="replicator" />
      </selectionbox>
    {/if}
  </rows>
</grid>


<style>

selectionbox {
  position: absolute;
  border: 1px solid #1f91f4;
  pointer-events: none;
}

.replicator {
  position: absolute;
  font-size: 0;
  cursor: crosshair;
  background-color: rgb(75, 137, 255);
  height: 6px;
  width: 6px;
  border: 1px solid #fff;
  z-index: 8;
  pointer-events: all;
  display: block;
  bottom: -4px;
  right: -4px;
}

.replicator.busy {
  pointer-events: none;
}

grid {
  display: table;
  table-layout: fixed;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  white-space: nowrap;
  margin: 0;
  border: none;
  border-collapse: collapse;
  border-spacing: 0;
}

grid:focus {
  outline: none;
}

gridheader {
  position: sticky;
  top: 0;
  z-index: 10;
  flex: 0;
  white-space: nowrap;
  display: flex;
}
gridheader>fixedcell {
  border: 1px solid #C0C0C0;
  text-align: left;
  cursor: s-resize;
  margin-left: -1px;
}
gridheader>fixedcell.sel {
  background: #E8EAED;
}
gridheader>fixedcell:first-child {
  z-index: 11;
  margin-left: 0;
}

row {
  display: flex;
}

fixedcell {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 0;
  z-index: 9;
  padding: 0 .4em;
  background: #f8f9fa;
  border-bottom: 1px solid #C0C0C0;
  border-right: 1px solid #C0C0C0;
  font-weight: normal;
  text-align: right;
  color: #888;
  line-height: 2em;
  box-sizing: border-box;
  cursor: e-resize;
  display: inline-block;
  width: 4em;
  flex-shrink: 0;
}

fixedcell.sel {
  background: #E8EAED;
}

cell {
  padding: 0 .3em;
  border: 1px solid #E2E2E3;
  text-align: left;
  line-height: 2em;
  margin-top: -1px;
  margin-left: -1px;
  box-sizing: border-box;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
cell.right {
  text-align: right;
}
cell.center {
  text-align: center;
}
cell>input {
  font-family: inherit;
  font-weight: inherit;
  border: none;
  padding: 0;
  margin: 0;
  font-size: inherit;
  box-sizing: border-box;
  width: 100%;
  outline: none;
}
cell.sel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #005eff;
  opacity: .1;
}

.focused {
  border-color: #2196F3;
  z-index: 8;
  outline: 1px solid #2196F3;
  outline-offset: -2px;
}

.silent {
  pointer-events: none;
}

vresizer {
  bottom: 0;
  width: 100%;
  height: .4em;
  left: 0;
  cursor: ns-resize;
  position: absolute;
}

.vresizing {
  cursor: ns-resize;
}

hresizer {
  right: 0;
  height: 100%;
  width: .4em;
  top: 0;
  cursor: ew-resize;
  position: absolute;
}

.hresizing {
  cursor: ew-resize;
}

</style>
