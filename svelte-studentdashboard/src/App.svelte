<script>
	import { onMount } from 'svelte';
	import studentdata from '../data/studentdata';
	export let name;


// 	const csv = `hallo,1,2,3
// doei,4,5,6`;
//
const parse = str => str.split('\n').map(row => row.split(','));

console.log(parse(studentdata));

</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
