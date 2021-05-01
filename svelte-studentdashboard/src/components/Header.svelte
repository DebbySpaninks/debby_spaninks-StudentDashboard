<!-- Component to display Link buttons in Header -->
<script>
  import { Link } from "svelte-navigator";
  // import List from './components/List.svelte';

  export let title = "Staafdiagram";
</script>

<div class="header">
  <nav>
    <h1>{title}</h1>

    <Link to="/">
      <button>Home</button>
    </Link>

    <Link to="/staafdiagram">
      <button>Staafdiagram</button>
    </Link>

    <Link to="/tabeloverzicht">
      <button>Tabel-overzicht</button>
    </Link>
  </nav>
</div>

<style>
  div.header {
    margin: 0;
    padding: 2em;
    height: 180px;
    box-sizing: border-box;
    background: #fcf;
  }

  nav {
    text-align: center;
  }

  h1 {
    margin: 0em 0em 0.4em;
    font-size: 3em;
    outline: none;
  }

  button {
    /* order: 1; */
    white-space: nowrap;
  }
</style>
