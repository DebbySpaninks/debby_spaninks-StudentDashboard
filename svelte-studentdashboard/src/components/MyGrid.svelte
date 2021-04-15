


<!-- Remove old Grid if not used -->

<script>
  export let rows = [];
</script>

<!-- <textarea value={JSON.stringify(data)} /> -->

<table>
  {#each rows as row, i}
  <tr>
    <td>{i + 1}</td>
    {#each row as cell}
      <td>{cell}</td>
    {/each}
  </tr>
  {/each}
</table>



<style>
  table {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
    width: 100%;
    height: 50%;
    display: block;
    background-color: red;
    overflow: auto;
  }
</style>
