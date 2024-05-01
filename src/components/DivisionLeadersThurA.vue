<template>
    <Nav />
    <div class="container">
      <div class="title">
        <h1>Division Leaders</h1>
      </div>
      <div class="ChampWrapper">
        <table class="table">
          <thead>
            <tr>
              <th class="centered">Rank</th>
              <th class="centered">Name</th>
              <th class="centered">Team</th>
              <th class="centered">PPG</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in topPlayers" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ player.name }}</td>
              <td>{{ player.team }}</td>
              <td>{{ player.ppg }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script scoped>
  import Nav from "./NavBar.vue";
  import { ref } from 'vue';
  import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
  
  export default {
    components: {
      Nav,
    },
    setup() {
      const db = getDatabase();
      const rosterRef = dbRef(db, 'rostersThurA');
      const players = ref([]);
  
      // Function to calculate Points Per Game
      const calculatePPG = (points, gamesPlayed) => {
        return gamesPlayed > 0 ? (points / gamesPlayed).toFixed(1) : '0.0';
      };
  
      // Function to process and sort players
      const processPlayers = (data) => {
        return Object.values(data)
          .map(player => ({
            ...player,
            ppg: calculatePPG(player.points, player.gamesPlayed),
          }))
          .sort((a, b) => b.ppg - a.ppg)
          .slice(0, 10);
      };
  
      // Listen for changes in Firebase and update the player list
      onValue(rosterRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          players.value = processPlayers(data);
        }
      });
  
      return {
        topPlayers: players,
      };
    },
  };
</script>
  
<style scoped>
.container {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Segoe UI', Arial, sans-serif;
}

.title {
  font-size: 35px;
  font-weight: bold;
  color: #0d2d5a;
  padding: 20px 0;
}

.ChampWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 5px solid #0d2d5a;
  padding: 25px;
  min-width: 320px;
  max-width: 960px;
  margin: 1px auto;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 20px;
  margin-bottom: 35px;
}

th {
  background-color: #0d2d5a;
  color: #ffffff;
  padding: 15px;
  text-align: left;
  font-weight: bold;
  border-bottom: 3px solid #fff;
}

td {
  border: 1px solid #ccc;
  padding: 16px;
  font-size: 20px;
}

.centered {
  text-align: center;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

@media (max-width: 767px) {
  .ChampWrapper {
    min-width: 100%;
    padding: 0.625rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .table, th, td {
    font-size: 0.75rem;
  }

  th, td {
    padding: 0.5rem;
  }
}
</style>

  