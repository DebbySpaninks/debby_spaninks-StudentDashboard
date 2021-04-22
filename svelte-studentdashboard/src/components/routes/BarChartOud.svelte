<!-- Component to display BarChart -->

<script>

// imports
import { MDBRow, MDBCol } from 'mdbsvelte';
import Bar from 'svelte-chartjs/src/Bar.svelte';

export let names;
console.log(names);

$: data = {
  labels: names,
  datasets: [
    {
      label: 'Leuk',
      data: [ 1, 1, 4, 3, 5, 2, 1, 2, 5, 3 ],
      backgroundColor:
        'rgba(113, 205, 205,0.4)',
      borderWidth: 2,
      borderColor:
        'rgba(113, 205, 205, 1)'
    },
    {
      label: 'Moeilijk',
      data: [ 5, 4, 1, 5, 1, 2, 1, 5, 3, 2 ],
      backgroundColor:
        'rgba(255, 134,159,0.4)',
      borderWidth: 2,
      borderColor:
        'rgba(255, 134, 159, 1)'
    }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  datasets: {
    barPercentage: 1,
    gridLines: {
      display: true,
      color: 'rgba(0, 0, 0, 0.1)'
    },
    ticks: {
      beginAtZero: true
    }
  }
};

</script>

<!-- <MDBContainer size="lg"> -->
  <MDBRow>
    <MDBCol>
      <Bar
        {data}
        {options} />
    </MDBCol>
  </MDBRow>
<!-- </MDBContainer> -->

<style>
</style>
