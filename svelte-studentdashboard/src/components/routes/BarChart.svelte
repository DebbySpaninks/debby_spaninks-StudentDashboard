<!-- Component to display BarChart -->

<script>
  export let diffScores = [];
  export let enjoyScores = [];

  export let xTicks = [];
  // console.log(xTicks);

  const yTicks = [5, 4, 3, 2, 1, 0];
  // console.log(yTicks);

  // $: barWidth = 10;

</script>
<div class="svg-container">
  <svg viewbox="0 0 1000 800" fill="#222">
    <!-- Move to 0(x) 130(y), h(x) / v(y) = length  -->
    <path d="M35 245 h800 v1 H35 M35 20 h1 v225 H35 z" />

<!-- horizontal pink bar -->
    {#each diffScores as bar, i}
      <path d="M{45 + (i * 45)} 112 h14 v133 H{45 + (i * 45)} z" fill="#FF377A" />
  	{/each}

<!-- horizontal green bar -->
    {#each enjoyScores as bar, i}
      <path d="M{60 + (i * 45)} 67 h14 v178 H{60 + (i * 45)} z" fill="#00D84F" />
  	{/each}

<!-- horizontal ticks -->
    {#each xTicks as tick, i}
      <path d="M{59 + (i * 45)} 246 h1 v10 H{59 + (i * 45)} M0 0 h0 v275 H0 z" />
    {/each}

<!-- horizontal text -->
    {#each xTicks as text, i}
      {#if text}
        <text class="text" x={40 + (i * 45)} y="270">{text}</text>
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

<style>

  .svg-container {
    /* 56(assignments) x 20 = 1120 */
    min-width: 1120px;
    overflow: auto;
  }

  svg {
    /* background-color: #F3F4F5; */
  }

  .text {
    font-size: 0.5em;
  }

  .grades {
    font-size: 0.8em;
  }

</style>
