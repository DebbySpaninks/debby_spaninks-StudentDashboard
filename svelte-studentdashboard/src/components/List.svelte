<!-- Component to display List -->

<script>
  import { createEventDispatcher } from 'svelte';

  export let items = [];

	let dispatch = createEventDispatcher();
</script>

  <ul>
  {#each items as item}
    <li on:click={() => dispatch('click')}>{item}</li>
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
  }
</style>
