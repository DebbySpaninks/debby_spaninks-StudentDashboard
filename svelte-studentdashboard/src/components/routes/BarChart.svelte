<!-- Component to display BarChart -->

<script>
  // import Checkbox from './Checkbox.svelte';

  export let enjoyScores = [];
  export let diffScores = [];
  export let xTicks = [];

  // let group = 1;
  // let selection = [];
  let yes = false;

  const yTicks = [ 5, 4, 3, 2, 1, 0 ];

</script>

<!-- <h3>Checkboxes: {selection.join(', ')}</h3> -->

<div class="legend-container">

  <!-- legend green -->
  <label>
    <input type=checkbox bind:checked={yes}/>
    <svg class="legend" width="80" height="25">
      <rect x="1" y="9" width="30" height="15" style="fill:#00D84F;stroke:black" />
      <text class="legend-green" x="36" y="23" width="30" height="15">Leuk</text>
    </svg>
  </label>

  <!-- legend pink -->
  <label>
    <input type=checkbox bind:checked={yes}/>
    <svg class="legend" width="100" height="25">
      <rect x="1" y="9" width="30" height="15" style="fill:#FF377A;stroke:black" />
      <text class="legend-pink" x="36" y="23" width="30" height="15">Moeilijk</text>
    </svg>
  </label>

</div>

<div class="svg-container">
  <div class="svg-wrapper" style="--viewboxWidth:{diffScores.length * 42}px">

    <svg viewbox="0 0 {diffScores.length * 42} 370" fill="#222">

      <!-- black baselines (x- and y-axis) -->
      <path d="M35 245 h2064 v1 H35 M35 20 h1 v225 H35 z" />

      <!-- horizontal green bar -->
      {#if yes}
        {#each enjoyScores as score, i}
          <path
            d="M{43 + (i * 37)} {245 - ((225 / 5) * score)} h10 v{(225 / 5) * score} H{43 + (i * 37)} z"
            fill="#00D84F"
          />
      	{/each}
      {/if}

      <!-- horizontal pink bar -->
      {#if yes}
        {#each diffScores as score, i}
          <path
            d="M{54 + (i * 37)} {245 - ((225 / 5) * score)} h10 v{(225 / 5) * score} H{54 + (i * 37)} z"
            fill="#FF377A"
          />
      	{/each}
      {/if}

      <!-- horizontal ticks -->
      {#each xTicks as tick, i}
        <path d="M{53 + (i * 37)} 246 h1 v10 H{53 + (i * 37)} M0 0 h0 v275 H0 z" />
      {/each}

      <!-- horizontal text -->
      {#each xTicks as text, i}
        {#if text}
          <text
            class="text" x={60 + (i * 37)} y="265"
            transform="rotate(-45 {60 + (i * 37)} 270)"
            style="text-anchor: end">{text}
          </text>
        {/if}
      {/each}

      <!-- vertical numbers -->
      {#each yTicks as grade, i}
        {#if grade <= 5}
          <text class="grades" x="10" y={26 + (i * 45)}>{grade}</text>
        {/if}
      {/each}

      <!-- vertical ticks and dashed lines -->
      {#each yTicks as tick, i}
        <path d="M25 {20 + (i * 45)} h10 v1 H25 M0 0 h0 v275 H0 z" />
        <path d="M38 {20.5 + (i * 45)} L 2099 {20.5 + (i * 45)}"
              stroke="black"
              stroke-linecap="round"
              stroke-width="0.2"
              stroke-dasharray="2,2"
              fill="none"
        />
      {/each}

    </svg>

  </div>
</div>

<style>

.legend-container {
  display: flex;
  align-self: flex-start;
  padding: 1.5em 0em 27em 6em;
  position: absolute;
}

.legend:hover {
    font-weight: bold;
}

text.legend-green,
text.legend-pink,
rect,
input {
  cursor: pointer;
}

  .svg-container {
    max-width: 1215px;
    width: 87.5%;
    overflow: auto;
    margin-left: -4em;
  }

  .svg-wrapper {
    width: var(--viewboxWidth);
  }

  .text {
    font-size: 0.55em;
    position: sticky;
  }

  .grades {
    font-size: 0.8em;
    background-color: #F3F4F5;
  }

</style>
