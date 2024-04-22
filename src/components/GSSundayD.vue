<template>
  <Nav />
  <div class="container">
    <div class="title">GAME SCHEDULE</div>
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
import { getDatabase, ref as dbRef, onValue, get } from 'firebase/database';

export default {
components: {
  Nav,
},
setup() {
  const db = getDatabase();
  const gamesRef = dbRef(db, 'gamesSunD');
  const locationsRef = dbRef(db, 'locationsSunD');
  const games = ref([]);
  const groupedGames = ref({});
  const searchDate = ref("");
  const locations = ref({});

  // Utility function for sorting games by time
  const sortGamesByTime = (gamesArray) => {
    return gamesArray.sort((a, b) => {
      const timeA = new Date('1970/01/01 ' + a.time);
      const timeB = new Date('1970/01/01 ' + b.time);
      return timeA - timeB;
    });
  };

  // Utility function to convert a date string to a Date object
  const convertDateString = (dateString) => {
    const [month, day] = dateString.split('-').map(Number);
    return new Date(new Date().getFullYear(), month - 1, day);
  };
  
  // Computed property to filter and sort the games based on the search input
  const filteredGroupedGames = computed(() => {
    let sortedGroupedGames = {};

    // Group games by date
    games.value.forEach(game => {
      if (!sortedGroupedGames[game.date]) {
        sortedGroupedGames[game.date] = [];
      }
      sortedGroupedGames[game.date].push(game);
    });

    // Sort each group of games by time
    for (let date in sortedGroupedGames) {
      sortedGroupedGames[date] = sortGamesByTime(sortedGroupedGames[date]);
    }

    // Sort the dates
    sortedGroupedGames = Object.entries(sortedGroupedGames)
      .sort(([date1], [date2]) => convertDateString(date1) - convertDateString(date2))
      .reduce((acc, [date, games]) => {
        acc[date] = games;
        return acc;
      }, {});

    // Filter based on search input
    if (searchDate.value !== "") {
      sortedGroupedGames = Object.fromEntries(
        Object.entries(sortedGroupedGames).filter(([date]) => date.includes(searchDate.value))
      );
    }

    return sortedGroupedGames;
  });
  
  onMounted(() => {
    // Fetch locations data from Firebase
    get(locationsRef).then((snapshot) => {
      if (snapshot.exists()) {
        locations.value = snapshot.val();
      }
    });
  });
  
  // Listen for changes in games data
  onValue(gamesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      games.value = Object.values(data);
      updateGroupedGames();
    }
  });
  
  // Listen for changes in locations data
  onValue(locationsRef, (snapshot) => {
    if (snapshot.exists()) {
      locations.value = snapshot.val();
    }
  });
  
  // Update groupedGames whenever games data changes
  const updateGroupedGames = () => {
    groupedGames.value = {};
    games.value.forEach(game => {
      if (!groupedGames.value[game.date]) {
        groupedGames.value[game.date] = [];
      }
      groupedGames.value[game.date].push(game);
    });

    Object.keys(groupedGames.value).forEach(date => {
      groupedGames.value[date] = sortGamesByTime(groupedGames.value[date]);
    });
  };
  
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

<style scoped>
.container {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Segoe UI', Arial, sans-serif;
}

.title {
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

.ChampWrapper > div {
  width: 100%;
}

.date-title {
  font-size: 30px;
  color: #0d2d5a;
  margin-bottom: 10px;
  font-weight: bold;
}

.location-title {
  font-size: 30px;
  color: #0d2d5a;
  margin-bottom: 15px;
  font-weight: bold;
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

tr:nth-child(even) {
  background-color: #f9f9f9;
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
    padding: 0.625rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .date-title {
    font-size: 1.25rem;
  }

  .location-title {
    font-size: 1.25rem; 
  }

  .table, th, td {
    font-size: 0.75rem;
  }

  th, td {
    padding: 0.5rem;
  }

  .search-input {
    width: 90%;
    font-size: 0.9rem;
  }
}
</style>
