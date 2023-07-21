<template>
  <Nav />
  <div class="width">
    <h1 class="Winter">Standings</h1>
    <div class="ChampWrapper">
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
  import{ ref, onMounted, watch } from 'vue';
  import { getDatabase, ref as dbRef, set, onValue, push, get } from 'firebase/database';

  export default {
    components: {
    Nav,
  
  },
  setup() {
    const db = getDatabase();
    const standingsRef = dbRef(db, 'standingsSunC');
    const winRef = dbRef(db, 'winsTh');
    const lossRef = dbRef(db, 'lossTh');
    const pdRef = dbRef(db, 'pdThur');
    
    const standings = ref([
        {name: "Shrimp Gang", wins: 1, losses: 1, pointDiff: 1},
        {name: "Rattatas", wins: 1, losses: 1, pointDiff: 1},
        {name: "Juss Hoop", wins: 1, losses: 1, pointDiff: 1},
        {name: "Shoot em up!", wins: 1, losses: 1, pointDiff: 1},
        {name: "BBQ Chicken", wins: 1, losses: 1, pointDiff: 1},
        {name: "Living Grace", wins: 1, losses: 1, pointDiff: 1},
        {name: "True Grit", wins: 1, losses: 1, pointDiff: 1},
        {name: "Mukboys", wins: 1, losses: 1, pointDiff: 1},
        
        
    ]);
    const wins = ref(0);
    const losses = ref(0);
    const pd = ref(0);

    const updateWins = (newWins) => {
      set(winRef, newWins.value);
    };
    const updateLosses = (newLosses) => {
      set(lossRef, newLosses.value);
    }
    const updatePd = (newPd) => {
      set(pdRef, newPd.value);
    }

    onMounted(async () => {
        // Check if the games have already been written to the database
        const snapshot = await get(standingsRef);
        if (snapshot.exists()) {
          // The games have already been written, so we don't need to write them again
          return;
        }
        // Write the games to the database
        standings.value.forEach((standings) => {
          const newStandingsRef = push(standingsRef);
          set(newStandingsRef, standings);
        });
      });

    onMounted(() => {
        // Listen for changes in Firebase and update the roster, points and gamesPlayed variables
        onValue(standingsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            standings.value = Object.values(data).sort((a, b) => {
          // Sort by win percentage (descending)
          const aWinPct = a.wins / (a.wins + a.losses);
          const bWinPct = b.wins / (b.wins + b.losses);
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

        onValue(winRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            wins.value = data;
          }
        }, {
          onlyOnce: false //This option ensures that the callback is called everytime the data changes
        });

        onValue(lossRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            losses.value = data;
          }
        }, {
          onlyOnce: false //This option ensures that the callback is called everytime the data changes
        });

        onValue(pdRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            pd.value = data;
          }
        }, {
          onlyOnce: false //This option ensures that the callback is called everytime the data changes
        });

        watch(wins, (newWins) => {
          updateWins(newWins);
        });

        watch(losses, (newLosses) => {
          updateLosses(newLosses);
        });

        watch(pd, (newPd) => {
          updatePd(newPd);
        });
      });
      return {
        standings,
        wins,
        losses,
        pd,
        updateWins,
        updateLosses,
        updatePd,
      };
  },
};
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.width {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
  text-align: center;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
}

.Winter {
  font-size: 28px;
    font-weight: bold;
    color: #0d2d5a;
    padding: 20px 0;
}

.ChampWrapper {
  border: 5px solid #0d2d5a;
  padding: 5px;
  min-width: 320px;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
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

.centered {
  text-align: center;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
@media (max-width: 767px) {
    .ChampWrapper {
      min-width: 100%;
      padding: 10px;
    }

    .Winter {
      font-size: 24px;
    }
    .table {
      font-size: 14px;
    }

    th, td {
      padding: 8px;
    }
  }
</style>