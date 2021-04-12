<script>
  import StudentData from './data/StudentData.svelte';

  let show = false;

// 	const csv = `hallo,1,2,3
// doei,4,5,6`;
// const parse = str => str.split('\n').map(row => row.split(','));
// console.log(parse(studentdata));


</script>

<button on:click={() => (show = !show)}>Toggle</button>

{#if show}
<StudentData />
{/if}

<style>
/*
main {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
} */
	/* h1 {
		font-size: 72px;
		text-align: center;
	} */
</style>
