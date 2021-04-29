<!-- Component to display Link buttons in Header -->

<script>
import { Link } from 'svelte-navigator';
// import List from './components/List.svelte';

let title = 'Staafdiagram';

function handleClick() {
  title = title === 'Tabel-overzicht' ? 'Staafdiagram' : 'Staafdiagram';
}

</script>

<div class="header">
  <h1>Student Dashboard</h1>

  <nav>
    <span>
      <h2>{title}</h2>

      <Link to="home">
        <button on:click={handleClick}>Home</button>
      </Link>

      <Link to="staafdiagram">
        <button on:click={handleClick}>Staafdiagram</button>
      </Link>

      <Link to="staafdiagram/student">
        <!-- <List items={studentnames}/> -->
        <button
          on:click={() => title = title === 'Staafdiagram' ? 'Naam-Student' : 'Naam-Student'}>Student
        </button>
      </Link>

      <Link to="tabeloverzicht">
        <button
          on:click={() => title = title === 'Staafdiagram' ? 'Tabel-overzicht' : 'Tabel-overzicht'}>Tabel-overzicht
        </button>
      </Link>
      
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
    width: 57.95em;
  }

  h2 {
    margin: 0em 8.8em 0.5em 2em;
    font-size: 2em;
    order: 0;
  }

  button {
    order: 1;
  }
</style>
