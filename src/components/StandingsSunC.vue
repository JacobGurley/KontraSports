<template>
  <Nav />
  <div class="width">
    <h1 class="Winter">STANDINGS</h1>
    <div class="ChampWrapper">
      <table class="table">
        <thead>
          <tr>
            <th class="centered">RANK</th>
            <th class="centered">TEAM</th>
            <th class="centered">WINS</th>
            <th class="centered">LOSSES</th>
            <th class="centered">PD</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in standings" :key="index">
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
import { ref } from 'vue';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

export default {
components: {
  Nav,
},
setup() {
  const db = getDatabase();
  const standingsRef = dbRef(db, 'standingsSunC');
  const standings = ref([]);

  // Listen for changes in Firebase and update the standings
  onValue(standingsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      standings.value = Object.values(data).sort((a, b) => {
        // Calculate win percentage, default to 0 if wins and losses are both 0
        const calculateWinPct = (wins, losses) => {
          return (wins + losses) > 0 ? wins / (wins + losses) : 0;
        };

        const aWinPct = calculateWinPct(a.wins, a.losses);
        const bWinPct = calculateWinPct(b.wins, b.losses);

        // Sort by win percentage (descending)
        if (aWinPct !== bWinPct) {
          return bWinPct - aWinPct;
        }

        // If win percentage is tied, sort by point differential (descending)
        if (a.pointDiff !== b.pointDiff) {
          return b.pointDiff - a.pointDiff;
        }

        // If point differential is also tied, sort alphabetically by team name (ascending)
        return a.name.localeCompare(b.name);
      });
    }
  });

  return {
    standings,
  };
},
};
</script>

<style scoped>
.width {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Segoe UI', Arial, sans-serif;
}

.Winter {
  font-size: 40px;
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
  
  .Winter {
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