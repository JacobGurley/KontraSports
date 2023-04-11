<template>
    <Nav />
    <div class="container">
        <div class="title">Game Schedule</div>
        <div class="search-wrapper">
        <input
          type="text"
          v-model="searchDate"
          class="search-input"
          placeholder="Search by date (MM/DD)"
        />
        
      </div>
        <div class="ChampWrapper">
            <div v-for="(games, date) in filteredGroupedGames" :key="date">
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
    import{ ref, onMounted, watch, computed } from 'vue';
    import { getDatabase, ref as dbRef, set, onValue, push, get } from 'firebase/database';
    
    export default {
      components: {
      Nav,
    
    },
    setup() {
      const db = getDatabase();
      const gamesRef = dbRef(db, 'gamesWed');
      const scoreRef = dbRef(db, 'score');
      
  
      const score = ref('');
      const games = ref([
         { date: '04/05', time: '8:00 PM', homeTeam: 'Practice Squad', awayTeam: 'All PGs', score: "" },
         { date: '04/05', time: '8:45 PM', homeTeam: 'Tita Slayerz', awayTeam: 'OC Ballers', score: "" },
         { date: '04/05', time: '9:30 PM', homeTeam: 'TUBT', awayTeam: 'BBQ Chicken', score: "" },
         { date: '04/12', time: '8:00 PM', homeTeam: 'All PGs', awayTeam: 'OC Ballers', score: "" },
         { date: '04/12', time: '8:45 PM', homeTeam: 'Practice Squad', awayTeam: 'BBQ Chicken', score: "" },
         { date: '04/12', time: '9:30 PM', homeTeam: 'TUBT', awayTeam: 'Tita Slayerz', score: "" },
         { date: '04/19', time: '8:00 PM', homeTeam: 'OC Ballers', awayTeam: 'Practice Squad', score: "" },
         { date: '04/19', time: '8:45 PM', homeTeam: 'TUBT', awayTeam: 'All PGs', score: "" },
         { date: '04/19', time: '9:30 PM', homeTeam: 'BBQ Chicken', awayTeam: 'Tita Slayerz', score: "" },
         { date: '04/26', time: '8:00 PM', homeTeam: 'Practice Squad', awayTeam: 'Tita Slayerz', score: "" },
         { date: '04/26', time: '8:45 PM', homeTeam: 'All PGs', awayTeam: 'BBQ Chicken', score: "" },
         { date: '04/26', time: '9:30 PM', homeTeam: 'TUBT', awayTeam: 'OC Ballers', score: "" },
         { date: '05/03', time: '8:00 PM', homeTeam: 'TUBT', awayTeam: 'Practice Squad', score: "" },
         { date: '05/03', time: '8:45 PM', homeTeam: 'All PGs', awayTeam: 'Tita Slayerz', score: "" },
         { date: '05/03', time: '9:30 PM', homeTeam: 'OC Ballers', awayTeam: 'BBQ Chicken', score: "" },
         { date: '05/10', time: '8:00 PM', homeTeam: 'TUBT', awayTeam: 'BBQ Chicken', score: "" },
         { date: '05/10', time: '8:45 PM', homeTeam: 'Tita Slayerz', awayTeam: 'OC Ballers', score: "" },
         { date: '05/10', time: '9:30 PM', homeTeam: 'Practice Squad', awayTeam: 'All PGs', score: "" },
         { date: '05/17', time: '8:00 PM', homeTeam: 'All PGs', awayTeam: 'OC Ballers', score: "" },
         { date: '05/17', time: '8:45 PM', homeTeam: 'TUBT', awayTeam: 'Tita Slayerz', score: "" },
         { date: '05/17', time: '9:30 PM', homeTeam: 'Practice Squad', awayTeam: 'BBQ Chicken', score: "" },
         
  
      ]);
      const groupedGames = ref({});
      const searchDate = ref("");
  
      // Add a computed property to filter the games based on the search input
      const filteredGroupedGames = computed(() => {
        if (searchDate.value === "") {
          return groupedGames.value;
        } else {
          const filtered = {};
          Object.entries(groupedGames.value).forEach(([date, games]) => {
            if (date.includes(searchDate.value)) {
              filtered[date] = games;
            }
          });
          return filtered;
        }
      });
  
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
        games.value.forEach((games) => {
          const newGameRef = push(gamesRef);
          set(newGameRef, games);
        });
      });
  
      onMounted(() => {
        // Group games by date
        games.value.forEach((games) => {
          if (!groupedGames.value[games.date]) {
            groupedGames.value[games.date] = [];
          }
          groupedGames.value[games.date].push(games);
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
        searchDate,
        filteredGroupedGames,
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
  
    .ChampWrapper {
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
      .ChampWrapper {
        min-width: 100%;
        padding: 10px;
      }
  
      .title {
        font-size: 24px;
      }
  
      .date-title {
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