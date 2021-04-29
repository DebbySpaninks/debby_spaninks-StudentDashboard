<!-- Component to display BarChart -->

<script>
  export let diffScores = [];
  export let enjoyScores = [];
  export let xTicks = [];

  const yTicks = [ 5, 4, 3, 2, 1, 0 ];

  // $: barWidth = 10;

</script>
<div class="svg-container">
  <div class="svg-wrapper" style="--viewboxWidth:{diffScores.length * 42}px">
    <svg viewbox="0 0 {diffScores.length * 42} 370" fill="#222">
      <!-- Move to 0(x) 130(y), h(x) / v(y) = length  -->
      <path d="M35 245 h800 v1 H35 M35 20 h1 v225 H35 z" />

      <!-- horizontal pink bar -->
      {#each diffScores as score, i}
        <path
          d="M{43 + (i * 43)} {245 - ((225 / 5) * score)} h10 v{(225 / 5) * score} H{43 + (i * 43)} z"
          fill="#FF377A"
        />
    	{/each}

      <!-- horizontal green bar -->
      {#each enjoyScores as score, i}
        <path
          d="M{54 + (i * 43)} {245 - ((225 / 5) * score)} h10 v{(225 / 5) * score} H{54 + (i * 43)} z"
          fill="#00D84F"
        />
    	{/each}

      <!-- horizontal ticks -->
      {#each xTicks as tick, i}
        <path d="M{53 + (i * 43)} 246 h1 v10 H{53 + (i * 43)} M0 0 h0 v275 H0 z" />
      {/each}

      <!-- horizontal text -->
      {#each xTicks as text, i}
        {#if text}
          <text
            class="text" x={59 + (i * 43)} y="265"
            transform="rotate(-45 {59 + (i * 43)} 270)"
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

      <!-- vertical ticks -->
      {#each yTicks as tick, i}
        <path d="M25 {20 + (i * 45)} h10 v1 H25 M0 0 h0 v275 H0 z" />
      {/each}

  </svg>
  </div>
</div>

<style>

  .svg-container {
    max-width: 1000px;
    /* 56(assignments) x 20 = 1120 */
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

  .grades {
    font-size: 0.8em;
  }

</style>
