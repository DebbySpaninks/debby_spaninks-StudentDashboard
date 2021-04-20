<script>
import { Router, Route } from 'svelte-navigator';
import Header from './components/Header.svelte';
// import Home from './components/routes/Home.svelte';
import BarChart from './components/routes/BarChart.svelte';
import Grid from './components/routes/Grid.svelte';
import List from './components/List.svelte';
import { onMount } from 'svelte';

// \n = new line character, trim is used for space
const parseCSV = text => text.split('\n').filter(line => line.trim() !== '').map(row => row.split(','));

let studentdata = false;
// array of all studentnames (studentdata.map(row => row[0])
$: studentnames = studentdata ? [ ...new Set(studentdata.map(row => row[0])) ].sort() : [];
$: studentassignments = studentdata ? [ ...new Set(studentdata.map(row => row[1])) ].sort() : [];
console.log(studentassignments);


let sizes = {};
$: console.log(sizes);


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
   <Header />

  <div>
    <Route exact path="/">
      <div class="canvas">
        <List on:click={() => console.log('clicked', studentnames)} items={studentnames}/>
          <div class="chart">
            <h1>Staafdiagram</h1>
            <BarChart names={studentnames}/>
            <!-- <BarChart class="bartchart" data={studentdata}/> -->
          </div>
      </div>
    </Route>
    <Route path="barchart">
      <div class="canvas">
        <List on:click={() => console.log('clicked', studentnames)} items={studentnames}/>
          <div class="chart">
            <h1>Staafdiagram</h1>
            <BarChart names={studentnames}/>
            <!-- <BarChart class="bartchart" data={studentdata}/> -->
          </div>
      </div>
    </Route>

    <Route path="grid" >
      <div class="canvas">
                  <!-- ipv console.log op alle studentnames moet het op de naam die (geclicked) getarget wordt -->
        <List on:click={() => console.log('clicked', studentnames)} items={studentnames}/>
      {#if !studentdata}
        <div>Even geduld...</div>
      {:else}
      <div class="grid-container">
        <h1>Tabel-overzicht</h1>
        <Grid class="grid" bind:data={studentdata} bind:sizes />
      </div>
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

.chart, .grid-container {
  padding-left: 2em;
}

</style>
