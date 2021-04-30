<!-- Component to display Link buttons in Header -->

<script>
import { Link } from 'svelte-navigator';
// import List from './components/List.svelte';

export let title = 'Staafdiagram';

</script>

<div class="header">

  <nav>
    <h1>{title}</h1>
    <!-- <span> -->

      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/staafdiagram">
        <button>Staafdiagram</button>
      </Link>

      <Link to="/tabeloverzicht">
        <button>Tabel-overzicht</button>
      </Link>

    <!-- </span> -->
	</nav>

</div>

<style>

  div.header {
    margin: 3em;
  }

  nav {
    text-align: center;
  }

  h1 {
    margin-top: 0em;
    font-size: 3em;
  }

  button {
    /* order: 1; */
    white-space: nowrap;
  }

</style>
