<!-- Component to display StudentList -->

<script>
  export let listItems = [];

// How to add keys to csv text???????         see svelte tutorial!
  // {
  //   "student": "Evelyn",
  //   "assignment": "SCRUM",
  //   "difficultyRating": 3,
  //   "enjoymentRating": 4
  // },


</script>

<!-- list for left sidebar -->
  <ul>
  {#each listItems as item}
    <li>{item}</li>
  {/each}
</ul>
