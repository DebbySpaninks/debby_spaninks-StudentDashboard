<!-- Component to display List -->
<script>
  import { Link } from "svelte-navigator";

  export let items = [];
</script>

<ul>
  {#each items as item, i}
    <li>
      <Link to="/staafdiagram/{item}">{item}</Link>
    </li>
  {:else}
    <p>Helaas geen studenten aanwezig</p>
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
    order: 0;
    padding: 5.25em 1em 0em 4.5em;
    overflow: auto;
    flex-shrink: 0;
    margin: 0;
  }
</style>
