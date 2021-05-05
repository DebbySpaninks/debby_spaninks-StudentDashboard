<script>
  export let group = [];
	export let value = [];
</script>

<label>
  <input type="checkbox" bind:group value={value} class="legend-checkbox">
  <input type="checkbox" bind:group value={value} class="legend-checkbox">
	<slot />
</label>
