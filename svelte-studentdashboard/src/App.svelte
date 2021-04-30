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
const uniqueItems = index => [ ...new Set(studentdata.map(row => row[index])) ].sort();
const extractCol = index => studentdata.map(row => row[index]);

$: studentnames = studentdata ? uniqueItems(0) : [];
$: assignments = studentdata ? uniqueItems(1) : [];
$: enjoymentRating = studentdata ? extractCol(2) : [];
$: difficultyRating = studentdata ? extractCol(3) : [];

// const average = enjoy => enjoy.reduce((a, b) => a + b, 0) / enjoy.length;

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

    <Route path="/">
      <Header title="Student Dashboard"/>
      <div class="canvas">
        <List items={studentnames}/>
          <div class="chart">
            <BarChart
              bind:xTicks={assignments}
              bind:enjoyScores={enjoymentRating}
              bind:diffScores={difficultyRating}
            />
          </div>
      </div>
    </Route>

    <Route path="staafdiagram">
      <Header title="Staafdiagram"/>

      <div class="canvas">
          <List items={studentnames}/>
          <div class="chart">
            <BarChart
              bind:xTicks={assignments}
              bind:enjoyScores={enjoymentRating}
              bind:diffScores={difficultyRating}
            />
          </div>
      </div>
    </Route>

    <Route path="staafdiagram/:id" let:params>
      <Header title="Staafdiagram van {params.id}"/>
      <div class="canvas">
          <List items={studentnames}/>
          <div class="chart">
            <BarChart
              bind:xTicks={assignments}
              bind:enjoyScores={enjoymentRating}
              bind:diffScores={difficultyRating}
            />
          </div>
      </div>
    </Route>

    <Route path="tabeloverzicht">
      <Header title="Tabel-overzicht"/>
      <div class="canvas-grid">
      {#if !studentdata}
        <div>Even geduld...</div>
      {:else}
        <List items={studentnames}/>
          <Grid class="grid" bind:data={studentdata} bind:sizes />
      {/if}
      </div>
    </Route>

</Router>

<style>

.canvas {
  display: flex;
  height: 100%;
  flex: 1;
}

.chart {
  padding-left: 2em;
}

.canvas-grid {
  display: flex;
  flex: 1;
  height: 100%;
  /* width: 70%; */
  overflow: auto;
}

div.chart {
  padding: 0;
}

</style>
