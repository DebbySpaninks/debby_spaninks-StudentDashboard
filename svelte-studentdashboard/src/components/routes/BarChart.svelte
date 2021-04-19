<!-- Component to display BarChart -->

<script>
import { MDBRow, MDBCol } from 'mdbsvelte';
import Bar from 'svelte-chartjs/src/Bar.svelte';

const data = {
  labels: [ 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange' ],
  datasets: [
    {
      label: 'Leuk',
      data: [ 15, 19, 11, 7, 15, 8 ],
      backgroundColor: [
        'rgba(113, 205, 205,0.4)'
      ],
      borderWidth: 2,
      borderColor: [
        'rgba(113, 205, 205, 1)'
      ]
    },
    {
      label: 'Moeilijk',
      data: [ 15, 19, 11, 7, 15, 8 ],
      backgroundColor: [
        'rgba(255, 134,159,0.4)'
      ],
      borderWidth: 2,
      borderColor: [
        'rgba(255, 134, 159, 1)'
      ]
    }
  ]
};

const options = {
  responsive: true,
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

<!-- <Bar
  data={data}
  options={{ maintainAspectRatio: false }}
/> -->

<MDBRow>
  <MDBCol md="8" class="mx-auto">
    <Bar
      {data}
      width={700}
      height={300}
      {options} />
  </MDBCol>
</MDBRow>

<style>

</style>
