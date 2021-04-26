<!-- Component to display List -->

<script>
  import { createEventDispatcher } from 'svelte';

  export let items = [];

const dispatch = createEventDispatcher();
</script>

  <ul>
  {#each items as item}
    <li on:click={() => dispatch('click')}>{item}</li>
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
