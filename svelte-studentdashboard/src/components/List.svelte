<!-- Component to display List -->

<script>
import { Link } from 'svelte-navigator';

export let items = [];

</script>

  <ul>
    {#each items as item, i}
      <li>
        <Link to="/staafdiagram/{item}">{item}</Link></li>
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
