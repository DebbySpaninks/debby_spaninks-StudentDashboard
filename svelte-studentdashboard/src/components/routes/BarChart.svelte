<!-- Component to display BarChart -->

<script>
  export let enjoyScores = [];
  export let diffScores = [];
  export let xTicks = [];

  const yTicks = [ 5, 4, 3, 2, 1, 0 ];

  // $: barWidth = 10;

</script>

<!-- legend green and pink -->
<svg width="400" height="43">
  <rect x="70" y="13" width="30" height="15" style="fill:#00D84F;stroke:black" />
  <text x="105" y="26" width="30" height="15">Leuk</text>
  <rect x="165" y="13" width="30" height="15" style="fill:#FF377A;stroke:black" />
  <text x="200" y="26" width="30" height="15">Moeilijk</text>
</svg>

<div class="svg-container">
  <div class="svg-wrapper" style="--viewboxWidth:{diffScores.length * 42}px">

    <svg viewbox="0 0 {diffScores.length * 42} 370" fill="#222">

      <!-- black baselines (x- and y-axis) -->
      <!-- Move to 0(x) 130(y), h(x) / v(y) = length  -->
      <path d="M35 245 h2064 v1 H35 M35 20 h1 v225 H35 z" />

      <!-- horizontal green bar -->
      {#each enjoyScores as score, i}
        <path
          d="M{43 + (i * 37)} {245 - ((225 / 5) * score)} h10 v{(225 / 5) * score} H{43 + (i * 37)} z"
          fill="#00D84F"
        />
    	{/each}

      <!-- horizontal pink bar -->
      {#each diffScores as score, i}
        <path
          d="M{54 + (i * 37)} {245 - ((225 / 5) * score)} h10 v{(225 / 5) * score} H{54 + (i * 37)} z"
          fill="#FF377A"
        />
    	{/each}

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

  .svg-container {
    max-width: 1215px;
    width: 100%;
    overflow: auto;
  }

  .svg-wrapper {
    /* background-color: #F3F4F5; */
    width: var(--viewboxWidth);
  }

  .text {
    font-size: 0.5em;
    position: sticky;
  }

  /* .grades {
    font-size: 0.8em;
    background-color: #F3F4F5;
  } */

</style>
