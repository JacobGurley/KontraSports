<template>
  <Nav />
  <div class = "width">
      <div class = "Winter"></div>
      <div class = "ChampWrapper">
        <table class="table">
          <thead>
            <tr>
              <th class="centered">Rank</th>
              <th class="centered">Team</th>
              <th class="centered">Wins</th>
              <th class="centered">Losses</th>
              <th class="centered">PD</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(team, index) in teams" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ team.name }}</td>
              <td>{{ team.wins }}</td>
              <td>{{ team.losses }}</td>
              <td>{{ team.pointDiff }}</td>
            </tr>
          </tbody>
        </table>
          
  </div>
  </div>
</template>

<script scoped>
import Nav from "./NavBar.vue";

export default {
  components: {
  Nav,

},
data(){
  return{
    teams: [
      {name: "Trailblazians", wins: 7, losses: 0, pointDiff: 89},
      {name: "Rudeboyz", wins: 6, losses: 1, pointDiff: 43},
      {name: "Hooligans", wins: 4, losses: 3, pointDiff: 31},
      {name: "Uncle Drews", wins: 4, losses: 3, pointDiff: -4},
      {name: "BBQ Chicken", wins: 3, losses: 4, pointDiff: -47},
      {name: "Mukboys", wins: 2, losses: 5, pointDiff: -9},
      {name: "Dawgs", wins: 2, losses: 5, pointDiff: -56},
      {name: "Alcoholics", wins: 1, losses: 6, pointDiff: -35},

    ],
  };
},
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.width{
width:100%;
padding-right: 15px;
padding-left: 15px;
margin-right: auto;
margin-left: auto;
text-align: center;
}



.ChampWrapper{  
border: 5px solid #0d2d5a;
padding: 5px;
min-width: 992px;
max-width: 960px;
margin-left: auto;
margin-right: auto;
}

.Winter{
text-align: center;

margin-bottom: 30px;
}

.table{
width: 100%;
border-collapse: collapse;
font-size: 14px;
}

th {
background-color: #0d2d5a;
color: white;
padding: 10px;
text-align: left;
}

td {
border: 1px solid #ccc;
padding: 10px;
}

.centered{
  text-align: center;
}

tr:nth-child(even) {
background-color: #f2f2f2;
}


</style>