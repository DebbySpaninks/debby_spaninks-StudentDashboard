<!-- Component to display List -->

<script>
import { Link } from 'svelte-navigator';

export let items = [];
// const yTicks = [ 5, 4, 3, 2, 1, 0 ];


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
  <!-- {#each yTicks as grade, i}
    {#if grade <= 5}
      <text class="grades" x="2" y={26 + (i * 45)}>{grade}</text>
    {/if}
  {/each} -->

  <!-- vertical ticks and dashed lines -->
  <!-- {#each yTicks as tick, i}
    <path d="M17 {20 + (i * 45)} h10 v1 H17 M0 0 h0 v275 H0 z" />
    <path d="M38 {20.5 + (i * 45)} L 2099 {20.5 + (i * 45)}"
          stroke="black"
          stroke-linecap="round"
          stroke-width="0.2"
          stroke-dasharray="2,2"
          fill="none"
    />
  {/each} -->

</svg>

<style>

  ul {
    list-style-type: none;
    height: 19.7em;
    padding: 3.3em 3.5em 3em;
  }

  svg {
    width: 2em;
  }

</style>
