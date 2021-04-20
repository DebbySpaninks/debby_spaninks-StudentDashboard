<script>
import { Link } from 'svelte-navigator';

</script>

<div class="header">
    <h1>Student Dashboard</h1>
  <!-- display link in header -->
  <nav>
    <Link to="/"><button class="btn-home">Home</button></Link>
    <Link to="/barchart"><button class="btn-barchart">Staafdiagram</button></Link>
    <Link to="grid"><button class="btn-table">Tabel-overzicht</button></Link>
	</nav>

</div>
