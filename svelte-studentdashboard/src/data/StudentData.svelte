<script>
import { onMount } from 'svelte';

let studentdata = [];

onMount(async() => {
  console.log('Mounted');

  const response = await fetch('/studentdata.csv');
  studentdata = await response.text();
});
</script>
