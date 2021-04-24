<!-- Component to display BarChart -->

<script>

  export let items = [];

</script>

<svg>
  {#each items as item}
  <rect
    width="20"
    height="100"
    style="fill:#0f0;
    stroke-width:1;
    stroke:#090">{item}
  </rect>
  {/each}
</svg>

<style>
  svg {
    background-color: pink;
    width: 70em;
    height: 20em;
  }
</style>
