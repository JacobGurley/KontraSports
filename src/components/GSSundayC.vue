<template>
  <Nav />
  <div class = "width">
      <div class = "Winter"></div>
      <div class = "ChampWrapper">
          <div v-for="(dateGames, date) in groupedGames" :key="date">
              <h2>{{ date }}</h2>
      <table class = "table">
          <thead>
              <tr>
                  <th class="centered">Time</th>
                  <th class="centered">Home Team</th>
                  <th class="centered">Away Team</th>
                  <th class="centered">Score</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(game, index) in dateGames" :key="index">
                  
                  <td>{{ game.time }}</td>
                  <td>{{ game.homeTeam }}</td>
                  <td>{{ game.awayTeam }}</td>
                  <td>{{ game.score }}</td>
              </tr>
          </tbody>
      </table>
  </div>
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
  const gamesRef = dbRef(db, 'gamesSunC');
  const scoreRef = dbRef(db, 'score');

  const score = ref('')
  const games = ref([
     { date: '01/16', time: '8:00 PM', homeTeam: 'tundra', awayTeam: 'lowlifes', score: "" },
     { date: '01/20', time: '8:00 PM', homeTeam: 'pew', awayTeam: 'eh', score: "" },
    

  ]);
  const groupedGames = ref({});

  const updateScore = (newScore) => {
    set(scoreRef, newScore.value);
  };

  onMounted(async () => {
    // Check if the games have already been written to the database
    const snapshot = await get(gamesRef);
    if (snapshot.exists()) {
    // The games have already been written, so we don't need to write them again
      return;
    }

    // Write the games to the database
    games.value.forEach((game) => {
      const newGameRef = push(gamesRef);
      set(newGameRef, game);
    });
  });

  onMounted(() => {
    // Group games by date
    games.value.forEach((game) => {
      if (!groupedGames.value[game.date]) {
        groupedGames.value[game.date] = [];
      }
      groupedGames.value[game.date].push(game);
    });

    // Listen for changes in Firebase and update the games and score variables
    onValue(gamesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        games.value = Object.values(data);
      }
    });

    onValue(scoreRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        score.value = data;
      }
    }, {
      onlyOnce: false //This option ensures that the callback is called everytime the data changes
    });

    watch(score, (newScore) => {
      updateScore(newScore);
    });
  });

  return {
    score,
    games,
    groupedGames,
    updateScore,
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

.table{
width: 100%;
border-collapse: collapse;
font-size: 14px;
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

input[type="number"] {
width: 50px;
text-align: center;
}

.centered{
  text-align: center;
}
</style>