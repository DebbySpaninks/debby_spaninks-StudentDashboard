<!-- Component to display List -->

<script>
  export let items = [];

</script>

  <ul>
  {#each items as item}
    <li on:click{handleClick}>{item}</li>
  {/each}
</ul>
