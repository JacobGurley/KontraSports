<template>
  <Nav />
  <div class="container">
      <div class="title">Game Schedule</div>
      <div class="ChampWrapper">
          <div v-for="(games, date) in groupedGames" :key="date">
              <h2 class="date-title">{{ date }}</h2>
      <table class="table">
          <thead>
              <tr>
                  <th class="centered">Time</th>
                  <th class="centered">Home Team</th>
                  <th class="centered">Away Team</th>
                  <th class="centered">Score</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(game, index) in games" :key="index">
                  
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
  const gamesRef = dbRef(db, 'gamesSunA');
  const scoreRef = dbRef(db, 'score');

  const score = ref('')
  const games = ref([
     { date: '01/16', time: '8:00 PM', homeTeam: 'Practice Squad', awayTeam: 'OHB', score: "" },
     { date: '01/20', time: '8:00 PM', homeTeam: '9-5ers', awayTeam: 'Unite', score: "" },
    

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
        const updatedGames = Object.values(data);
        //Update the scores in the games array
        updatedGames.forEach((game, index) => {
          games.value[index].score = game.score;
        });
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

  .ChampWrapper{  
    border: 5px solid #0d2d5a;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
  }

  .date-title {
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

  input[type="number"] {
    width: 50px;
    text-align: center;
  }

  .centered {
    text-align: center;
  }
  </style>