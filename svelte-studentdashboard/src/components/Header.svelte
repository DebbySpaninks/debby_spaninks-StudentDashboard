<script>
import { Link } from 'svelte-navigator';

let title = "Staafdiagram";
</script>

<div class="header">
    <h1>Student Dashboard</h1>

  <nav>
    <span>
      <h2>{title}</h2>
      <!-- display link in header -->
      <Link to="/"><button class="btn-home">Home</button></Link>
      <Link to="/barchart"><button class="btn-barchart">Staafdiagram</button></Link>
      <Link to="grid"><button class="btn-table">Tabel-overzicht</button></Link>
    </span>
	</nav>

</div>

<style>
  h1 {
    margin-top: 0em;
    text-align: center;
    font-size: 3em;
  }

  span {
    display: flex;
    justify-content:flex-end;
    align-items: center;
    width: 57.97em;
  }

  h2 {
    margin: 0em 1em 0.5em 2em;
    /* align-self: center; */
    font-size: 2em;
    order: 0;
  }

  button {
    /* align-self: center; */
    order: 1;
  }



</style>
