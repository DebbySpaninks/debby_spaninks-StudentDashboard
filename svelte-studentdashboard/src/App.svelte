<script>
import { Router, Link, Route } from 'svelte-navigator';
import Home from './components/routes/Home.svelte';
import BarChart from './components/routes/BarChart.svelte';
import Grid from './components/routes/Grid2.svelte';
import List from './components/List.svelte';
import { onMount } from 'svelte';

// \n = new line character, trim is used for space
const parseCSV = text => text.split('\n').filter(line => line.trim() !== '').map(row => row.split(','));

let studentdata = false;
// array of all studentnames (studentdata.map(row => row[0])
$: studentnames = studentdata ? [ ...new Set(studentdata.map(row => row[0])) ].sort() : [];


let sizes = {};
$: console.log(sizes);

// function handleClick(e) {
//   console.log(e.detail);
// };

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
    const responseAsText = await response.text();
    // console.log('The responseAsText in onMount function ', responseAsText);
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
    <Link to="barchart"><button class="btn-barchart">Staafdiagram</button></Link>
    <Link to="grid"><button class="btn-table">Tabel overzicht</button></Link>
	</nav>

  <div>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="barchart">
      <BarChart />
      <!-- <BarChart class="bartchart" data={studentdata}/> -->
    </Route>

    <Route path="grid" >
      <div class="canvas">
                                    <!-- ipv console.log op alle studentnames moet het op de naam die (geclicked) getarget wordt -->
        <List on:click={() => console.log('clicked', studentnames)} items={studentnames}/>
      {#if !studentdata}
        <div>Even geduld...</div>
      {:else}
        <Grid class="grid" bind:data={studentdata} bind:sizes />
      {/if}
      </div>
    </Route>
	 </div>
  </div>
</Router>

<style>

.canvas {
  display: flex;
  direction: row;
}

.container {
  margin: 2.5em;
  padding: 1em;
	display: flex;
	flex-direction: column;
  /* background-color: lightgreen; */
}


</style>
