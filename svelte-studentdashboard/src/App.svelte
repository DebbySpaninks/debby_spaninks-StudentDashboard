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

// const average = rating => rating.reduce((a, b) => a + b, 0) / rating.length;

// array of all studentnames (studentdata.map(row => row[0])
const uniqueItems = index => [ ...new Set(studentdata.map(row => row[index])) ].sort();
const extractCol = index => studentdata.map(row => row[index]);

$: studentnames = studentdata ? uniqueItems(0) : [];
$: assignments = studentdata ? uniqueItems(1) : [];
$: difficultyRating = studentdata ? extractCol(2) : [];
$: enjoymentRating = studentdata ? extractCol(3) : [];

let sizes = {};
$: console.log(sizes);

onMount(async() => {
  console.log('Mounted');
  try {
  // read csv file
    const response = await fetch('/studentdata.csv');
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
   <Header />

  <main>
    <Route exact path="/">
      <div class="canvas">
        <List on:click={() => console.log('clicked', studentnames)} items={studentnames}/>
          <div class="chart">
            <BarChart
              bind:xTicks={assignments}
              bind:diffScores={difficultyRating}
              bind:enjoyScores={enjoymentRating}
            />
          </div>
      </div>
    </Route>
    <Route path="barchart">
      <div class="canvas">
        <List on:click={() => console.log('clicked', studentnames)} items={studentnames}/>
          <div class="chart">
            <BarChart
              bind:xTicks={assignments}
              bind:diffScores={difficultyRating}
              bind:enjoyScores={enjoymentRating}
            />
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
        <Grid class="grid" bind:data={studentdata} bind:sizes />
      </div>
      {/if}
      </div>
    </Route>

  </main>
  </div>
</Router>

<style>

/* h1 {
  margin: 0;
  max-width: 8em;
} */

.canvas {
  display: flex;
  /* direction: row; */
}

.container {
  margin: 1em 2.5em;
  padding: 1em;
	/* flex-direction: column; */
}

.chart, .grid-container {
  padding-left: 2em;
}

</style>
