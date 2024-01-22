<template>
  <Nav />
  <div class="container">
    <div class="title">
      <h1>Rosters</h1>
    </div>
    <div class="search-wrapper">
      <input
        type="text"
        v-model="searchTeam"
        class="search-input"
        placeholder="Search by Team Name"
      />
    </div>
    <div class="roster-wrapper">
      <div v-for="(teamRoster, team) in filteredRosters" :key="team">
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
              <td>{{ calculatePPG(player.points, player.gamesPlayed) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script scoped>
import Nav from "./NavBar.vue";
import { ref, computed } from 'vue';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

export default {
components: {
  Nav,
},
setup() {
  const db = getDatabase();
  const rosterRef = dbRef(db, 'rostersSunC');
  const roster = ref([]);
  const searchTeam = ref('');

  // Function to calculate Points Per Game
  const calculatePPG = (points, gamesPlayed) => {
    return gamesPlayed > 0 ? (points / gamesPlayed).toFixed(1) : '0.0';
  };

  // Listen for changes in Firebase and update the roster
  onValue(rosterRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      roster.value = Object.values(data);
    }
  });

  // Computed property for filtered and sorted rosters
  const filteredRosters = computed(() => {
    // Group roster by team name 
    const grouped = {};
    roster.value.forEach(player => {
      if (!grouped[player.team]) {
        grouped[player.team] = [];
      }
      grouped[player.team].push(player);
    });

    // Sort players within each team by PPG in descending order
    for (const team in grouped) {
      grouped[team].sort((a, b) => {
        const aPPG = calculatePPG(a.points, a.gamesPlayed);
        const bPPG = calculatePPG(b.points, b.gamesPlayed);
        return bPPG - aPPG;
      });
    }

    // Sort team names by alphabetical order
    const sortedTeams = Object.keys(grouped).sort();
    const sortedRosters = {};
    sortedTeams.forEach(team => {
      sortedRosters[team] = grouped[team];
    });

    // Filter by team name if search is applied
    if (searchTeam.value) {
      return Object.fromEntries(
        Object.entries(sortedRosters).filter(([teamName]) =>
          teamName.toLowerCase().includes(searchTeam.value.toLowerCase())
        )
      );
    }

    return sortedRosters;
  });

  return {
    searchTeam,
    filteredRosters,
    calculatePPG,
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
.search-wrapper {
   display: flex;
   justify-content: center;
   margin-bottom: 20px;
   position: relative;
 }

 .search-input {
   width: 50%;
   padding: 10px 40px 10px 20px;
   border: 1px solid #ccc;
   border-radius: 25px;
   font-size: 16px;
   outline: none;
   background-color: white;
   transition: box-shadow 0.3s, border-color 0.3s;
 }

 .search-input::placeholder {
   color: #888;
 }

 .search-input:focus {
   box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
   border-color: #0d2d5a;
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
   .search-input {
     width: 90%;
     font-size: 14px;
   }
 }

</style>