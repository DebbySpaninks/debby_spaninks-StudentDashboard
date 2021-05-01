<script>
  import { Router, Route } from "svelte-navigator";
  import Header from "./components/Header.svelte";
  import BarChart from "./components/routes/BarChart.svelte";
  import Grid from "./components/routes/Grid.svelte";
  import List from "./components/List.svelte";
  import { onMount } from "svelte";

  // \n = new line character, trim is used for space
  const parseCSV = (text) =>
    text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((row) => row.split(","));

  let studentdata = false;

  // const average = rating => rating.reduce((a, b) => a + b, 0) / rating.length;

  // array of all studentnames (studentdata.map(row => row[0])
  const uniqueItems = (index) =>
    [...new Set(studentdata.map((row) => row[index]))].sort();
  const extractCol = (index) => studentdata.map((row) => row[index]);

  $: studentnames = studentdata ? uniqueItems(0) : [];
  $: assignments = studentdata ? uniqueItems(1) : [];
  $: enjoymentRating = studentdata ? extractCol(2) : [];
  $: difficultyRating = studentdata ? extractCol(3) : [];

  // const average = enjoy => enjoy.reduce((a, b) => a + b, 0) / enjoy.length;

  let sizes = {};

  onMount(async () => {
    console.log("Mounted");
    try {
      // read csv file
      const response = await fetch("/studentdata.csv");
      const responseAsText = await response.text();
      setTimeout(function resTimeOut() {
        studentdata = parseCSV(responseAsText);
      }, 100);
    } catch (error) {
      console.log("Oops something went wrong:", error);
    }
  });
</script>

<Router>
  <Route path="/">
    <Header title="Student Dashboard" />
    <div class="canvas">
      <List items={studentnames} />
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
    <Header title="Staafdiagram" />

    <div class="canvas">
      <List items={studentnames} />
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
    <Header title="Evaluatie van {params.id}" />
    <div class="canvas">
      {#if !studentdata}
        <div>Even geduld...</div>
      {:else}
        <List items={studentnames} />
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
    <div class="canvas">
      {#if !studentdata}
        <div>Even geduld...</div>
      {:else}
        <List items={studentnames} />
        <div class="gridcontainer">
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
  .canvas {
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }

  .chart {
    padding-left: 2em;
  }

  .gridcontainer {
    overflow: auto;
    font-size: 85%;
  }

  div.chart {
    padding: 0;
  }
</style>
