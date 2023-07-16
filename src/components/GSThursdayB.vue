<template>
    <Nav />
    <div class="container">
        <div class="title">Game Schedule</div>
        <div class="search-wrapper">
        <input
          type="text"
          v-model="searchDate"
          class="search-input"
          placeholder="Search by date (MM-DD)"
        />
        
      </div>
        <div class="ChampWrapper">
            <div v-for="(games, date) in filteredGroupedGames" :key="date">
                <h2 class="date-title">{{ date }}</h2>
                <h4 class="location-title">{{ locations[date] || 'No location provided' }}</h4>
        <table class="table">
            <thead>
                <tr>
                    <th class="centered">Time</th>
                    <th class="centered">Court</th>
                    <th class="centered">Home Team</th>
                    <th class="centered">Away Team</th>
                    <th class="centered">Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(game, index) in games" :key="index">
                    
                    <td>{{ game.time }}</td>
                    <td>{{ game.courtNumber }}</td>
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
    import { ref, onMounted, computed } from 'vue';
    import { getDatabase, ref as dbRef, set, onValue, push, get } from 'firebase/database';
    
    export default {
      components: {
      Nav,
    
    },
    setup() {
      const db = getDatabase();
      const gamesRef = dbRef(db, 'gamesThurB');
      const locationsRef = dbRef(db, 'locationsThurB');
      const games = ref([
         { date: '06-22', time: '8:00 PM', courtNumber: "", homeTeam: 'Alcoholics', awayTeam: 'Voltron', score: "" },
         { date: '06-22', time: '8:50 PM', courtNumber: "", homeTeam: 'Young Bucs', awayTeam: 'Yomato', score: "" },
         { date: '06-29', time: '8:00 PM', courtNumber: "", homeTeam: 'Alcoholics', awayTeam: 'Yomato', score: "" },
         { date: '06-29', time: '8:00 PM', courtNumber: "", homeTeam: 'Kaizen', awayTeam: 'Voltron', score: "" },
         { date: '06-29', time: '8:50 PM', courtNumber: "", homeTeam: 'Day Ones', awayTeam: 'Young Bucs', score: "" },
         { date: '07-13', time: '8:00 PM', courtNumber: "", homeTeam: 'Voltron', awayTeam: 'Yomato', score: "" },
         { date: '07-13', time: '8:00 PM', courtNumber: "", homeTeam: 'Kaizen', awayTeam: 'Day Ones', score: "" },
         { date: '07-13', time: '8:50 PM', courtNumber: "", homeTeam: 'Young Bucs', awayTeam: 'Alcoholics', score: "" },
         { date: '07-20', time: '8:00 PM', courtNumber: "", homeTeam: 'Voltron', awayTeam: 'Young Bucs', score: "" },
         { date: '07-20', time: '8:50 PM', courtNumber: "", homeTeam: 'Yomato', awayTeam: 'Day Ones', score: "" },
         { date: '07-20', time: '8:50 PM', courtNumber: "", homeTeam: 'Kaizen', awayTeam: 'Alcoholics', score: "" },
         { date: '07-27', time: '7:30 PM', courtNumber: "", homeTeam: 'Young Bucs', awayTeam: 'Kaizen', score: "" },
         { date: '07-27', time: '8:20 PM', courtNumber: "", homeTeam: 'Day Ones', awayTeam: 'Alcoholics', score: "" },
         { date: '07-27', time: '9:10 PM', courtNumber: "", homeTeam: 'Kaizen', awayTeam: 'Yomato', score: "" },
         { date: '07-27', time: '9:10 PM', courtNumber: "", homeTeam: 'Voltron', awayTeam: 'Day Ones', score: "" },
         { date: '08-03', time: '7:50 PM', courtNumber: "", homeTeam: 'Voltron', awayTeam: 'Alcoholics', score: "" },
         { date: '08-03', time: '8:40 PM', courtNumber: "", homeTeam: 'Yomato', awayTeam: 'Young Bucs', score: "" },
         { date: '08-03', time: '8:40 PM', courtNumber: "", homeTeam: 'Kaizen', awayTeam: 'Day Ones', score: "" },
         { date: '08-10', time: '7:50 PM', courtNumber: "", homeTeam: 'Day Ones', awayTeam: 'Young Bucs', score: "" },
         { date: '08-10', time: '7:50 PM', courtNumber: "", homeTeam: 'Kaizen', awayTeam: 'Voltron', score: "" },
         { date: '08-10', time: '8:40 PM', courtNumber: "", homeTeam: 'Alcoholics', awayTeam: 'Day Ones', score: "" },
         { date: '08-17', time: '7:30 PM', courtNumber: "", homeTeam: '#5', awayTeam: '#4', score: "" },
         { date: '08-17', time: '8:20 PM', courtNumber: "", homeTeam: '#6', awayTeam: '#3', score: "" },
         { date: '08-24', time: '8:00 PM', courtNumber: "", homeTeam: '#1', awayTeam: 'Winner of #4-#5', score: "" },
         { date: '08-24', time: '8:00 PM', courtNumber: "", homeTeam: '#2', awayTeam: 'Winner of #3-#6', score: "" },
         { date: '08-31', time: '8:00 PM', courtNumber: "", homeTeam: 'FINALS', awayTeam: 'FINALS', score: "" },
         
         
          
  
      ]);
      const groupedGames = ref({});
      const searchDate = ref("");
      const locations = ref({
        '06-22': 'Location 1',
        '06-29': 'Location 2',
        '07-13': 'Location 3',
        '07-20': 'Location 4',
        '07-27': 'Location 5',
        '08-03': 'Location 6',
        '08-10': 'Location 7',
        '08-17': 'Location 8',
        '08-24': 'Location 9',
        '08-31': 'Location 10',
      });
  
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
  
    onMounted(async () => {
      // Check if the games have already been written to the database
      const snapshot = await get(gamesRef);
      if (!snapshot.exists()) {
        // The games have not been written yet, write them to the database
        games.value.forEach((game) => {
            const newGameRef = push(gamesRef);
            set(newGameRef, game);
        });
      }
  
      // Check if the locations have already been written to the database
      const snapshotLocations = await get(locationsRef);
      if (!snapshotLocations.exists()) {
        // The locations have not been written yet, write them to the database
        set(locationsRef, locations.value);
      }
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
            updatedGames.forEach((updatedGame, index) => {
            games.value[index].score = updatedGame.score;
            games.value[index].time = updatedGame.time;
            games.value[index].courtNumber = updatedGame.courtNumber;
            games.value[index].homeTeam = updatedGame.homeTeam;
            games.value[index].awayTeam = updatedGame.awayTeam;
          });
          }
        });
        onValue(locationsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            locations.value = data;
          }
        });
      });
  
      return {
        searchDate,
        filteredGroupedGames,
        games,
        groupedGames,
        locations, 
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
  
    .location-title {
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
  
      .location-title{
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