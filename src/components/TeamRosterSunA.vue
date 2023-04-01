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
import{ ref, onMounted, computed } from 'vue';

export default {
  components: {
    Nav,
  },

  setup(){
    const db = getDatabase();
    const rosterRef = dbRef(db, 'rosterSunA');
    const roster = ref({});
    const groupedRosters = ref({});
    const searchTeam = ref('');

       // Create a computed property that filters the rosters based on the search query
       const filteredRosters = computed(() => {
        if (!searchTeam.value) {
          return groupedRosters.value;
        }
        return Object.fromEntries(
          Object.entries(groupedRosters.value).filter(([team]) =>
            team.toLowerCase().includes(searchTeam.value.toLowerCase())
          )
        );
      });

    onMounted(async () => {
      // Check if the games have already been written to the database
      const snapshot = await get(rosterRef);
      if (!snapshot.exists()) {
        // Write the games to the database
        const initialRoster = [
          {team: 'Strap City', name: 'Chris Gipson', points: 0, gamesPlayed: 1},
          {team: 'Strap City', name: 'Ruben Jefferson', points: 0, gamesPlayed: 1},
          {team: 'Strap City', name: 'Jordan Jefferson ', points: 0, gamesPlayed: 1},
          {team: 'Strap City', name: 'Tommie Flanagan', points: 0, gamesPlayed: 1},
          {team: 'Strap City', name: 'Myles Smith', points: 0, gamesPlayed: 1},
          {team: 'Strap City', name: 'Chris Smith', points: 0, gamesPlayed: 1},
          {team: 'Light em up', name: 'Malk Dre', points: 0, gamesPlayed: 1},
          {team: 'Light em up', name: 'Boa Swervo', points: 0, gamesPlayed: 1},
          {team: 'Light em up', name: 'Granle C', points: 0, gamesPlayed: 1},
          {team: 'Light em up', name: 'Jacy Galore', points: 0, gamesPlayed: 1},
          {team: 'Light em up', name: 'T Phillips', points: 0, gamesPlayed: 1},
          {team: 'Light em up', name: 'Mar For Three', points: 0, gamesPlayed: 1},
          {team: 'Light em up', name: 'Jay T', points: 0, gamesPlayed: 1},
          {team: 'FBG', name: 'Dejon', points: 0, gamesPlayed: 1},
          {team: 'FBG', name: 'Simon', points: 0, gamesPlayed: 1},
          {team: 'FBG', name: 'Brian', points: 0, gamesPlayed: 1},
          {team: 'FBG', name: 'Samuel', points: 0, gamesPlayed: 1},
          {team: 'FBG', name: 'Spencer', points: 0, gamesPlayed: 1},
          {team: 'FBG', name: 'JD', points: 0, gamesPlayed: 1},
          {team: 'FBG', name: 'Keno', points: 0, gamesPlayed: 1},
          {team: 'FBG', name: 'Brandon', points: 0, gamesPlayed: 1},
          {team: 'FBG', name: 'Dev', points: 0, gamesPlayed: 1},
          {team: 'OHB', name: 'Jerald Clark', points: 0, gamesPlayed: 1},
          {team: 'OHB', name: 'Lavelle Tolliver', points: 0, gamesPlayed: 1},
          {team: 'OHB', name: 'Isaiah Bell', points: 0, gamesPlayed: 1},
          {team: 'OHB', name: 'Cejay Anderson', points: 0, gamesPlayed: 1},
          {team: 'OHB', name: 'Zeshare Walkins', points: 0, gamesPlayed: 1},
          {team: 'OHB', name: 'Rob Shannon', points: 0, gamesPlayed: 1},
          {team: 'OHB', name: 'Chris Luna', points: 0, gamesPlayed: 1},
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
      searchTeam,
      filteredRosters,
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