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
  import{ ref, onMounted, watch } from 'vue';
  
  export default {
    components: {
      Nav,
    },

    setup(){
      const db = getDatabase();
      const rosterRef = dbRef(db, 'rosterTh');
      const pointsRef = dbRef(db, 'points');
      const gamesPlayedRef = dbRef(db, 'gamesPlayed');

      const roster = ref([
        {team: 'LFG', name: 'Paul Vargas', points: 200, gamesPlayed: 10},
        {team: 'LFG', name: 'David Thomas', points: 220, gamesPlayed: 10},
        {team: 'Average Joes', name: 'Joseph Obianyo', points: 100, gamesPlayed: 10},
        {team: 'Average Joes', name: 'Ray Herbert', points: 150, gamesPlayed: 15},
      ]);

      const groupedRosters = ref({});
      const points = ref(0);
      const gamesPlayed = ref(0);

      const updatePoints = (newPoints) => {
        set(pointsRef, newPoints.value);
      };

      const updateGamesPlayed = (newGamesPlayed) => {
        set(gamesPlayedRef, newGamesPlayed.value);
      };

      onMounted(async () => {
        // Check if the games have already been written to the database
        const snapshot = await get(rosterRef);
        if (snapshot.exists()) {
          // The games have already been written, so we don't need to write them again
          return;
        }
        // Write the games to the database
        roster.value.forEach((roster) => {
          const newRosterRef = push(rosterRef);
          set(newRosterRef, roster);
        });
      });

      onMounted(() => {
        // Sort the roster array by PPG before grouping the players by team name
        roster.value.sort((a, b) => b.points / b.gamesPlayed - a.points / a.gamesPlayed);

        // Group roster by teamname
        roster.value.forEach((roster) => {
          if (!groupedRosters.value[roster.team]) {
            groupedRosters.value[roster.team] = [];
          }
          groupedRosters.value[roster.team].push(roster);
        });

        // Sort team names by alphabetical order
        const sortedTeams = Object.keys(groupedRosters.value).sort();
        const sortedRosters = {};
        sortedTeams.forEach((team) => {
          sortedRosters[team] = groupedRosters.value[team];
        });
        groupedRosters.value = sortedRosters;

        // Listen for changes in Firebase and update the roster, points and gamesPlayed variables
        onValue(rosterRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            roster.value = Object.values(data).sort((a, b) => b.points / b.gamesPlayed - a.points / a.gamesPlayed);
          }
        });

        onValue(pointsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            points.value = data;
          }
        }, {
          onlyOnce: false //This option ensures that the callback is called everytime the data changes
        });

        onValue(gamesPlayedRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            gamesPlayed.value = data;
          }
        }, {
          onlyOnce: false //This option ensures that the callback is called everytime the data changes
        });

        watch(points, (newPoints) => {
          updatePoints(newPoints);
        });

        watch(gamesPlayed, (newGamesPlayed) => {
          updateGamesPlayed(newGamesPlayed);
        });
      });

      return {
        roster,
        groupedRosters,
        points,
        gamesPlayed,
        updatePoints,
        updateGamesPlayed,
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