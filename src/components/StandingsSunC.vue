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
      {name: "X Factors", wins: 6, losses: 1, pointDiff: 121},
      {name: "True Grit", wins: 6, losses: 1, pointDiff: 56},
      {name: "Mamba Mentality", wins: 6, losses: 1, pointDiff: 45},
      {name: "60pointgame", wins: 5, losses: 2, pointDiff: 51},
      {name: "Juss Hoop", wins: 4, losses: 3, pointDiff: 35},
      {name: "3 & Deez Nutz", wins: 4, losses: 3, pointDiff: 19},
      {name: "LeTeam", wins: 4, losses: 3, pointDiff: 16},
      {name: "Shot Crew", wins: 3, losses: 3, pointDiff: 48},
      {name: "Moon Goons", wins: 3, losses: 4, pointDiff: 3},
      {name: "Long Beach State Rec Team", wins: 3, losses: 4, pointDiff: -4},
      {name: "Volume 0", wins: 1, losses: 6, pointDiff: -65},
      {name: "Primeflight", wins: 1, losses: 6, pointDiff: -75},
      {name: "Mexipinos", wins: 1, losses: 6, pointDiff: -104},
      {name: "Fade Away", wins: 1, losses: 6, pointDiff: -135},
      

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