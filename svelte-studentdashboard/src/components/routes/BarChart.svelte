<!-- Component to display BarChart -->

<script>

  export let items = [];

</script>

<svg>

  <!-- Move to 0(x) 130(y), h(x) / v(y) = length  -->
  <path d="M0 280 h799 v1 H0 M0 0 h1 v280 H0 z"/>
  {#each items as item}
	<path d="M7 80 h20 v200 H7 z" fill="green">{item}</path>
  {/each}

  <path d="M27 60 h20 v220 H27 z" fill="red" />
</svg>

<style>
  svg {
    background-color: #DBEBF7;
    width: 50em;
    height: 17.6em;
  }
</style>
