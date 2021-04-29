<!-- Component to display List -->

<script>
  export let items = [];

items = Array.apply(null, { length: 10 }).map((_, i) => `item ${++i}`);

function click(e) {
    const li = e.target.closest('li');
    if (li) {
      const item = items[+li.value];
      console.log('Clicked', item);
    }
}

</script>

  <ul on:click={click}>
  {#each items as item, i}
    <li value={i}>{item}</li>

  {:else}
    <h3>Helaas geen studenten aanwezig</h3>
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
    height: 19.7em;
  }
</style>
