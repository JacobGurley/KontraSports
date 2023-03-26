<template>
  <Nav />
  <div class="container">
      <div class="title">
          <h1>Rosters</h1>
      </div>
      <div class="roster-wrapper">
        <div v-for="(teamRoster, team) in groupedRosters" :key="team">
          <h2 class="team-title">{{ team }}</h2>
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
    const rosterRef = dbRef(db, 'rosterSunC');
    const roster = ref({});
    const groupedRosters = ref({});
    

    onMounted(async () => {
      // Check if the games have already been written to the database
      const snapshot = await get(rosterRef);
      if (!snapshot.exists()) {
        // Write the games to the database
        const initialRoster = [
            {team: 'LFG', name: 'Raul Garrets', points: 203, gamesPlayed: 10},
            {team: 'LFG', name: 'Vinnie Valaza', points: 220, gamesPlayed: 10},
            {team: 'Average Joes', name: 'Boris Dunn', points: 250, gamesPlayed: 10},
            {team: 'Average Joes', name: 'Roy Gilbert', points: 150, gamesPlayed: 10},
            {team: 'Beach', name: 'Don Tom', points: 300, gamesPlayed: 10},
            {team: 'CatFishes', name: 'Pete Rose', points: 350, gamesPlayed: 10},
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
 <style scoped>

.container {
    width: 100%;
    padding: 0 15px;
    margin: 0 auto;
    text-align: center;
    background-color: #f5f5f5;
    font-family: Arial, sans-serif;
  }

  .title {
    font-size: 28px;
    font-weight: bold;
    color: #0d2d5a;
    padding: 20px 0;
  }

.roster-wrapper {
  border: 5px solid #0d2d5a;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    min-width: 320px;
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.team-title{
  font-size: 24px;
    color: #0d2d5a;
    margin-bottom: 15px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    font-size: 16px;
    margin-bottom: 30px;
}

th {
    background-color: #0d2d5a;
    color: white;
    padding: 10px;
    text-align: left;
    font-weight: bold;
}

td {
    border: 1px solid #ccc;
    padding: 10px;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

.centered {
    text-align: center;
}
/* Responsive styles */
@media (max-width: 767px) {
    .roster-wrapper {
      min-width: 100%;
      padding: 10px;
    }

    .title {
      font-size: 24px;
    }

    .team-title {
      font-size: 20px;
    }

    .table {
      font-size: 14px;
    }

    th, td {
      padding: 8px;
    }
  }

</style>