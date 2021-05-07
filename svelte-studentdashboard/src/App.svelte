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

  // array of all studentnames (studentdata.map(row => row[0])
  const uniqueItems = index =>
    [ ...new Set(studentdata.map(row => row[index])) ];

  $: studentnames = studentdata ? uniqueItems(0) : [];

  // function to display averages from all students or single student
  function ratings(studentdata, studentname) {
    return studentdata.reduce((averages, row) => {
      if (studentname && (row[0] !== studentname)) {
        return averages;
      }
      const key = row[1];
      const enjoymentRating = parseInt(row[2]) || null;
      const difficultyRating = parseInt(row[3]) || null;
      if (!averages[key]) {
        averages[key] = {
          enjoymentRatings: [],
          difficultyRatings: [],
          enjoymentAverage: 0,
          difficultyAverage: 0
        };
      }

      if (enjoymentRating !== null) {
        averages[key].enjoymentRatings.push(enjoymentRating);
        // recalculate average if a new rating is added
        averages[key].enjoymentAverage = averages[key].enjoymentRatings.reduce((num, rating) => (num += rating), 0) / averages[key].enjoymentRatings.length;
      }

      if (difficultyRating !== null) {
        averages[key].difficultyRatings.push(difficultyRating);
        // recalculate average if a new rating is added
        averages[key].difficultyAverage = averages[key].difficultyRatings.reduce((num, rating) => (num += rating), 0) / averages[key].difficultyRatings.length;
      }

      return averages;
    }, {});
  }

  const enjoymentRating = ratings => Object.values(ratings).map(assignment => assignment.enjoymentAverage);
  const difficultyRating = ratings => Object.values(ratings).map(assignment => assignment.difficultyAverage);
  const assignments = ratings => Object.keys(ratings);


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
              xTicks={assignments(ratings(studentdata))}
              enjoyScores={enjoymentRating(ratings(studentdata))}
              diffScores={difficultyRating(ratings(studentdata))}
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
            xTicks={assignments(ratings(studentdata, params.id))}
            enjoyScores={enjoymentRating(ratings(studentdata, params.id))}
            diffScores={difficultyRating(ratings(studentdata, params.id))}
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
