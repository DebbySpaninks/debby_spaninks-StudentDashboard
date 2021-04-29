<!-- Component to display List -->

<script>
import { Link } from 'svelte-navigator';

export let items = [];
const yTicks = [ 5, 4, 3, 2, 1, 0 ];


</script>

  <ul>
    {#each items as item, i}
      <li>
        <Link to="/staafdiagram/{item}">{item}</Link></li>
    {:else}
      <h3>Helaas geen studenten aanwezig</h3>
    {/each}
  </ul>

<svg>

  <!-- vertical numbers -->
  {#each yTicks as grade, i}
    {#if grade <= 5}
      <text class="grades" x="10" y={26 + (i * 45)}>{grade}</text>
    {/if}
  {/each}

</svg>

<style>
  ul {
    list-style-type: none;
    height: 19.7em;
  }
</style>
