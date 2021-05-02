<!-- Component to display Link buttons in Header -->
<script>
  import { Link } from "svelte-navigator";

  export let title = "";
</script>

<div class="header">
  <nav>
    <h1>{title}</h1>
    <Link to="/">
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
    padding: 1.5em;
    height: 155px;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #30DA6E 50%, #FF377A 80%);
  }

  nav {
    text-align: center;
  }

  h1 {
    margin: 0em 0em 0.2em;
    font-size: 3em;
    outline: none;
  }

  button {
    white-space: nowrap;
    border-radius: 3px;
    padding-top: 0.35em;
  }
</style>
