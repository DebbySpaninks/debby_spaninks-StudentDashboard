<script>
import { Router, Link, Route } from 'svelte-navigator';
import BarChart from './components/routes/BarChart.svelte';
import Grid from './components/routes/Grid.svelte';
import StudentList from './components/StudentList.svelte';
import { onMount } from 'svelte';

// \n = new line character                 // nog voor.map invoegen .filter(arr => !Array.isArray(arr) || arr.length === 0 : )
const parseCSV = text => text.split('\n').map(row => row.split(','));

let studentdata = false;
let sizes = {};
$: console.log(sizes);

// function saveData(e) {
//   console.log('saving in local storage');
//   localStorage['demo'] = JSON.stringify({
//     meta: {
//       title: 'demo sheet'
//     },
//     data: studentdata,
//     sizes: sizes
//   });
// }
//
// function loadData(e) {
//   console.log('loading from local storage');
//   ({ studentdata, sizes } = JSON.parse(localStorage['demo'] || '{data: [], sizes: {}}'));
// }

onMount(async() => {
  console.log('Mounted');
  try {
  // read csv file
    const response = await fetch('/studentdata.csv');
    // console.log('The studentdata in onMount function ', studentdata);
    const responseAsText = await response.text();
    setTimeout(function resTimeOut() {
      studentdata = parseCSV(responseAsText);
    }, 100);
  }
  catch (error) {
    console.log('Oops something went wrong:', error);
  }
});

</script>

<Router>
 <div class="container">
	<nav>
    <Link to="/"><button class="btn-home">Home</button></Link>
    <Link to="/"><button class="btn-barchart">Staafdiagram</button></Link>
    <Link to="grid"><button class="btn-table">Tabel overzicht</button></Link>
	</nav>
	<div>
    <sidebar>
      <StudentList listItems={studentdata[0]}/>
    </sidebar>
		<Route exact path="/">
			<BarChart class="bartchart" data={studentdata}/>
		</Route>
      <Route path="grid" >
      {#if !studentdata}
        <div>Even geduld...</div>
      {:else}
        <Grid class="grid" bind:data={studentdata} bind:sizes />
      {/if}
      </Route>
	  </div>
  </div>
</Router>

<style>

.container {
  margin: 2.5em;
  padding: 1em;
	display: flex;
	flex-direction: column;
  background-color: lightgreen;
}

.container button {

}


</style>
