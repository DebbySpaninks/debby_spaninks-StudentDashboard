<!-- Component to display BarChart -->

<script>

// imports
import { MDBContainer, MDBRow, MDBCol } from 'mdbsvelte';
import Bar from 'svelte-chartjs/src/Bar.svelte';

export let names;
console.log(names);

$: data = {
  labels: names,
  datasets: [
    {
      label: 'Leuk',
      data: [ 15, 19, 11, 7, 15, 8, 11, 7, 15, 8 ],
      backgroundColor:
        'rgba(113, 205, 205,0.4)',
      borderWidth: 2,
      borderColor:
        'rgba(113, 205, 205, 1)'
    },
    {
      label: 'Moeilijk',
      data: [ 15, 19, 11, 7, 15, 8, 11, 7, 15, 8 ],
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
  scales: {
    xAxes: [
      {
        barPercentage: 1,
        gridLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};
</script>

<MDBContainer>
  <MDBRow>
    <MDBCol md="10" class="mx-auto">
      <Bar
        {data}
        width={200}
        height={350}
        {options} />
    </MDBCol>
  </MDBRow>
</MDBContainer>

<style>
</style>
