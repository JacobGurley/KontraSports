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
      {name: "Average Joes", wins: 0, losses: 0, pointDiff: 0},
      {name: "OHB", wins: 0, losses: 0, pointDiff: 0},
      {name: "Beach", wins: 0, losses: 0, pointDiff: 0},
      {name: "TMT", wins: 0, losses: 0, pointDiff: 0},
      {name: "LFG", wins: 0, losses: 0, pointDiff: 0},
      {name: "Uptempo", wins: 0, losses: 0, pointDiff: 0},
      {name: "AIM", wins: 0, losses: 0, pointDiff: 0},
      {name: "Run it", wins: 0, losses: 0, pointDiff: 0},
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