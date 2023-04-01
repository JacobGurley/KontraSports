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
      const rosterRef = dbRef(db, 'rosterTh');
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
            {team: 'LFG', name: 'Paul Vargas', points: 0, gamesPlayed: 1},
            {team: 'LFG', name: 'David Thomas', points: 0, gamesPlayed: 1},
            {team: 'LFG', name: 'Nick Sanchez', points: 0, gamesPlayed: 1},
            {team: 'LFG', name: 'Christopher Gibson', points: 0, gamesPlayed: 1},
            {team: 'LFG', name: 'Larry Davis', points: 0, gamesPlayed: 1},
            {team: 'LFG', name: 'Jordan Henry', points: 0, gamesPlayed: 1},
            {team: 'LFG', name: 'Ivan Ramon', points: 0, gamesPlayed: 1},
            {team: 'Dale Gas', name: 'Joey', points: 0, gamesPlayed: 1},
            {team: 'Dale Gas', name: 'Oscar', points: 0, gamesPlayed: 1},
            {team: 'Dale Gas', name: 'Fern', points: 0, gamesPlayed: 1},
            {team: 'Dale Gas', name: 'Jeyson', points: 0, gamesPlayed: 1},
            {team: 'Dale Gas', name: 'Ollie', points: 0, gamesPlayed: 1},
            {team: 'Dale Gas', name: 'Joe', points: 0, gamesPlayed: 1},
            {team: 'Dale Gas', name: 'Alfred', points: 0, gamesPlayed: 1},
            {team: 'Dale Gas', name: 'Nick', points: 0, gamesPlayed: 1},
            {team: 'Uptempo', name: 'Everett Burnett', points: 0, gamesPlayed: 1},
            {team: 'Uptempo', name: 'Cameron Fisher', points: 0, gamesPlayed: 1},
            {team: 'Uptempo', name: 'Aron Reynolds', points: 0, gamesPlayed: 1},
            {team: 'Uptempo', name: 'Brandon Reynolds', points: 0, gamesPlayed: 1},
            {team: 'Uptempo', name: 'Calvin Lawson', points: 0, gamesPlayed: 1},
            {team: 'Uptempo', name: 'Anfernee Roberts', points: 0, gamesPlayed: 1},
            {team: 'Uptempo', name: 'David Castro', points: 0, gamesPlayed: 1},
            {team: 'Uptempo', name: 'Henry Fernandez', points: 0, gamesPlayed: 1},
            {team: 'Uptempo', name: 'Josh', points: 0, gamesPlayed: 1},
            {team: 'Young Bucs', name: 'David Moniel', points: 0, gamesPlayed: 1},
            {team: 'Young Bucs', name: 'Alan Ramirez', points: 0, gamesPlayed: 1},
            {team: 'Young Bucs', name: 'Arturo Flores', points: 0, gamesPlayed: 1},
            {team: 'Young Bucs', name: 'Luis Montelegre', points: 0, gamesPlayed: 1},
            {team: 'Young Bucs', name: 'Andres Cervantes', points: 0, gamesPlayed: 1},
            {team: 'Young Bucs', name: 'Chuy Flores', points: 0, gamesPlayed: 1},
            {team: 'Young Bucs', name: 'Lalo Flores', points: 0, gamesPlayed: 1},
            {team: 'Elements', name: 'Jimmy Le', points: 0, gamesPlayed: 1},
            {team: 'Elements', name: 'Leo Nguyen', points: 0, gamesPlayed: 1},
            {team: 'Elements', name: 'Victor Ha', points: 0, gamesPlayed: 1},
            {team: 'Elements', name: 'Justin Nguyen', points: 0, gamesPlayed: 1},
            {team: 'Elements', name: 'Thai Vo', points: 0, gamesPlayed: 1},
            {team: 'Elements', name: 'Riley Laines', points: 0, gamesPlayed: 1},
            {team: 'Elements', name: 'Connor Laines', points: 0, gamesPlayed: 1},
            {team: 'Elements', name: 'Tristan Vu', points: 0, gamesPlayed: 1},
            {team: 'Beach', name: 'Elijah', points: 0, gamesPlayed: 1},
            {team: 'Beach', name: 'Tori', points: 0, gamesPlayed: 1},
            {team: 'Beach', name: 'Garrison', points: 0, gamesPlayed: 1},
            {team: 'Beach', name: 'Q', points: 0, gamesPlayed: 1},
            {team: 'Beach', name: 'Casey', points: 0, gamesPlayed: 1},
            {team: 'Beach', name: 'Marcus', points: 0, gamesPlayed: 1},
            {team: 'Beach', name: 'Garret', points: 0, gamesPlayed: 1},
            {team: 'Beach', name: 'David', points: 0, gamesPlayed: 1},
            {team: 'Beach', name: 'Craig', points: 0, gamesPlayed: 1},
            {team: 'OHB', name: 'Derek Vernon', points: 0, gamesPlayed: 1},
            {team: 'OHB', name: 'Tre Jefferson', points: 0, gamesPlayed: 1},
            {team: 'OHB', name: 'Victor Ramirez', points: 0, gamesPlayed: 1},
            {team: 'OHB', name: 'Steven Royal', points: 0, gamesPlayed: 1},
            {team: 'OHB', name: 'Markieth Taylor', points: 0, gamesPlayed: 1},
            {team: 'OHB', name: 'Nate Jordan', points: 0, gamesPlayed: 1},
            {team: 'OHB', name: 'Anthony Howard', points: 0, gamesPlayed: 1},
            {team: 'OHB', name: 'Cristian Acevedo', points: 0, gamesPlayed: 1},
            {team: 'AIM', name: 'Gary Bardales', points: 0, gamesPlayed: 1},
            {team: 'AIM', name: 'Cristian Butler', points: 0, gamesPlayed: 1},
            {team: 'AIM', name: 'Joseph Jamrozik', points: 0, gamesPlayed: 1},
            {team: 'AIM', name: 'John Gallegos', points: 0, gamesPlayed: 1},
            {team: 'AIM', name: 'Jaxson Lee', points: 0, gamesPlayed: 1},
            {team: 'AIM', name: 'Isaac Richards', points: 0, gamesPlayed: 1},
            {team: 'AIM', name: 'Karrey Johnson', points: 0, gamesPlayed: 1},


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