<!-- Component to display BarChart -->

<script>

  export let scores = [
    { name: 'toets 1',
      fun: 4,
      level: 2 },
    { name: 'toets 2',
      fun: 5,
      level: 3 },
    { name: 'toets 3',
      fun: 1,
      level: 5 },
    { name: 'toets 4',
      fun: 3,
      level: 4 },
    { name: 'toets 5',
      fun: 4,
      level: 1 },
    { name: 'toets 1',
      fun: 4,
      level: 2 },
    { name: 'toets 2',
      fun: 5,
      level: 3 },
    { name: 'toets 3',
      fun: 1,
      level: 5 },
    { name: 'toets 4',
      fun: 3,
      level: 4 },
    { name: 'toets 5',
      fun: 4,
      level: 1 },
    { name: 'toets 1',
      fun: 4,
      level: 2 },
    { name: 'toets 2',
      fun: 5,
      level: 3 },
    { name: 'toets 3',
      fun: 1,
      level: 5 },
    { name: 'toets 4',
      fun: 3,
      level: 4 },
    { name: 'toets 5',
      fun: 4,
      level: 1 }
  ];

  // $: barWidth = 10;

</script>
<div class="svg-container">
  <svg viewbox="0 0 900 400" fill="gray">
    <!-- Move to 0(x) 130(y), h(x) / v(y) = length  -->
    <path d="M35 295 h799 v1 H35 M35 20 h1 v275 H35 z"/>
    <text x="10" y="26">5</text>
    <text x="10" y="81">4</text>
    <text x="10" y="135.7">3</text>
    <text x="10" y="190.5">2</text>
    <text x="10" y="245">1</text>
    <text x="10" y="301">0</text>

    <path d="M25 20 h20 v1 H25 M0 0 h0 v275 H0 z" />
    <path d="M25 75 h20 v1 H25 M0 0 h0 v275 H0 z" />
    <path d="M25 130 h20 v1 H25 M0 0 h0 v275 H0 z" />
    <path d="M25 185 h20 v1 H25 M0 0 h0 v275 H0 z" />
    <path d="M25 240 h20 v1 H25 M0 0 h0 v275 H0 z" />
    <path d="M25 295 h10 v1 H25 M0 0 h0 v275 H0 z" />

    {#each scores as score, i}
      <path d="M{57 + (i * 55)} 95 h20 v200 H{57 + (i * 55)} z" fill="green" />
      <path d="M{77 + (i * 55)} 55 h20 v240 H{77 + (i * 55)} z" fill="red" />
  	{/each}

  </svg>
</div>

<style>
  .svg-container {
    min-width: 1120px;
    overflow: auto;
  }

  svg {
    /* background-color: #F3F4F5; */
  }
</style>
