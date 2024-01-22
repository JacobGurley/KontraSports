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
import { getDatabase, ref as dbRef, onValue, get } from 'firebase/database';

export default {
components: {
  Nav,
},
setup() {
  const db = getDatabase();
  const gamesRef = dbRef(db, 'gamesSunB');
  const locationsRef = dbRef(db, 'locationsSunB');
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

  .location-title {
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
