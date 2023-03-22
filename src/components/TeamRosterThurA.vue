<template>
    <Nav />
    <div class = "width">
        <div class = "Winter"></div>
        <div class = "ChampWrapper">
          <div v-for="(teamRoster, team) in groupedRosters" :key="team">
            <h2>{{ team }}</h2>
            <table class="table">
              <thead>
                <tr>
                  <th class="centered">Name</th>
                  <th class="centered">PPG</th> 
                </tr>
              </thead>
              <tbody>
                <tr v-for="(player, index) in teamRoster" :key="index">
                    <td>{{ player.name }}</td>
                    <td>{{ (player.points / player.gamesPlayed).toFixed(1) }}</td>
                </tr>
            </tbody>
            </table>
          </div>      
    </div>
    </div>
</template>

<script scoped>
  import Nav from "./NavBar.vue";
  import { getDatabase, ref as dbRef, set, push, get, onValue } from 'firebase/database';
  import{ ref, onMounted } from 'vue';
  
  export default {
    components: {
      Nav,
    },

    setup(){
      const db = getDatabase();
      const rosterRef = dbRef(db, 'rosterTh');
      const roster = ref({});
      const groupedRosters = ref({});
      

      onMounted(async () => {
        // Check if the games have already been written to the database
        const snapshot = await get(rosterRef);
        if (!snapshot.exists()) {
          // Write the games to the database
          const initialRoster = [
            {team: 'LFG', name: 'Paul Vargas', points: 200, gamesPlayed: 10},
            {team: 'LFG', name: 'David Thomas', points: 220, gamesPlayed: 10},
            {team: 'Average Joes', name: 'Joseph Obianyo', points: 100, gamesPlayed: 10},
            {team: 'Average Joes', name: 'Ray Herbert', points: 150, gamesPlayed: 15},
          ];
          initialRoster.forEach((player) => {
            const newRosterRef = push(rosterRef);
            set(newRosterRef, player);
          });
        } else {
          // set the roster with the data from the database
          roster.value = Object.values(snapshot.val()).sort((a, b) => b.points / b.gamesPlayed - a.points / a.gamesPlayed);
          updateGroupedRosters();
        }
      });

      //Listen for changes in Firebase and update the roster
      onValue(rosterRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          roster.value = Object.values(data).sort((a, b) => b.points / b.gamesPlayed - a.points / a.gamesPlayed);
          updateGroupedRosters();
        }
      });

      const updateGroupedRosters = () => {
        //Clear the groupRosters object
        Object.keys(groupedRosters.value).forEach(key => {
          delete groupedRosters.value[key];
        });

        //Group roster by team name 
        roster.value.forEach((player) => {
          if (!groupedRosters.value[player.team]) {
            groupedRosters.value[player.team] = [];
          }
          groupedRosters.value[player.team].push(player);
        });

        //Sort team names by alphabetical order
        const sortedTeams = Object.keys(groupedRosters.value).sort();
        const sortedRosters = {};
        sortedTeams.forEach((team) => {
          sortedRosters[team] = groupedRosters.value[team];
        });
        groupedRosters.value = sortedRosters;
      };

      return {
        roster,
        groupedRosters,
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
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: left;
}

td {
  border: 1px solid #ccc;
  padding: 10px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.centered{
    text-align: center;
}

  </style>