<script>
  import { Router, Route } from 'svelte-navigator';
  import Header from './components/Header.svelte';
  import BarChart from './components/routes/BarChart.svelte';
  import Grid from './components/routes/Grid.svelte';
  import List from './components/List.svelte';
  import { onMount } from 'svelte';

  // \n = new line character, trim is used for space
  const parseCSV = text =>
    text
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(row => row.split(','));

  let studentdata = false;

  // const getAverage = (assignments, enjoymentRating) => {
  //
  // }


  // array of all studentnames (studentdata.map(row => row[0])
  const uniqueItems = index =>
    [ ...new Set(studentdata.map(row => row[index])) ];
  const extractCol = index => studentdata.map(row => row[index]);

  $: studentnames = studentdata ? uniqueItems(0) : [];
  $: assignments = studentdata ? uniqueItems(1) : [];
  $: enjoymentRating = studentdata ? extractCol(2) : [];
  $: difficultyRating = studentdata ? extractCol(3) : [];
  // $: assignments && console.log(assignments.length);

const rating = (index, array) =>
    enjoymentRating.slice(index * assignments.length, (index + 1) * assignments.length);
  // console.log(rating(0, enjoymentRating));

  let sizes = {};

  onMount(async() => {
    console.log('Mounted');
    try {
      // read csv file
      const response = await fetch('/studentdata.csv');
      const responseAsText = await response.text();
      setTimeout(function resTimeOut() {
        studentdata = parseCSV(responseAsText);
      }, 150);
    }
    catch (error) {
      console.log('Oops something went wrong:', error);
    }
  });
</script>

<Router>
  <Route path="/">
    <Header title="Student Dashboard" />
      <div class="canvas">
        {#if !studentdata}
          <div class="message">Even geduld...</div>
        {:else}
          <List items={studentnames.sort()} />
          <div class="chart">
            <BarChart
              bind:xTicks={assignments}
              bind:enjoyScores={enjoymentRating}
              bind:diffScores={difficultyRating}
            />
          </div>
        {/if}
      </div>
  </Route>

  <Route path="staafdiagram/:id" let:params>
    <Header title="Evaluatie van {params.id}" />
    <div class="canvas">
      {#if !studentdata}
        <div class="message">Even geduld...</div>
      {:else}
        <List items={studentnames.sort()} />
        <div class="chart">
          <BarChart
            bind:xTicks={assignments}
            bind:enjoyScores={enjoymentRating}
            bind:diffScores={difficultyRating}
          />
        </div>
      {/if}
    </div>
  </Route>

  <Route path="tabeloverzicht">
    <Header title="Tabel-overzicht" />
    <div class="canvas canvas-grid">
      {#if !studentdata}
        <div class="message">Even geduld...</div>
      {:else}
        <List items={studentnames.sort()} />
        <div class="grid-container"></div>
        <div class="grid-wrapper">
          <Grid
            bind:data={studentdata}
            bind:sizes
            bind:numRows={studentdata.length}
          />
        </div>
      {/if}
    </div>
  </Route>
</Router>

<style>
div.message {
  padding: 2em 3em;
  font-size: 1.5em;
}
  .canvas {
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    margin: 0em 1em;
  }

.canvas-grid {
  margin: 0em;
}

.grid-container {
  padding-left: 3em;
}

  .grid-wrapper {
    overflow: auto;
    font-size: 85%;
  }

  div.chart {
    height: 30em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 84.5%;
    margin: 0;
    padding-top: 1em;
  }
</style>
