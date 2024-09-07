<template>
  <div class="container">
    <div class="title">
      <h1>Rosters</h1>
    </div>
    <div class="ChampWrapper">
      <router-link class="division-leaders" to="/divisionLeadersThurB">
        Division Leaders
      </router-link>
    </div>
    <div class="search-wrapper">
      <input
        type="text"
        v-model="searchTeam"
        class="search-input"
        placeholder="Search by Team Name"
      />
    </div>
    <div class="roster-wrapper">
      <div v-for="(teamRoster, team) in filteredRosters" :key="team">
        <h2 class="team-title">{{ team }}</h2>
        <table class="table">
          <thead>
            <tr>
              <th class="centered">Name</th>
              <th class="centered">PPG</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in teamRoster" :key="index">
              <td>{{ player.name }}</td>
              <td>{{ calculatePPG(player.points, player.gamesPlayed) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { ref, computed } from 'vue';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

export default {
setup() {
  const db = getDatabase();
  const rosterRef = dbRef(db, 'rostersThurB');
  const roster = ref([]);
  const searchTeam = ref('');

  // Function to calculate Points Per Game
  const calculatePPG = (points, gamesPlayed) => {
    return gamesPlayed > 0 ? (points / gamesPlayed).toFixed(1) : '0.0';
  };

  // Listen for changes in Firebase and update the roster
  onValue(rosterRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      roster.value = Object.values(data);
    }
  });

  // Computed property for filtered and sorted rosters
  const filteredRosters = computed(() => {
    // Group roster by team name 
    const grouped = {};
    roster.value.forEach(player => {
      if (!grouped[player.team]) {
        grouped[player.team] = [];
      }
      grouped[player.team].push(player);
    });

    // Sort players within each team by PPG in descending order
    for (const team in grouped) {
      grouped[team].sort((a, b) => {
        const aPPG = calculatePPG(a.points, a.gamesPlayed);
        const bPPG = calculatePPG(b.points, b.gamesPlayed);
        return bPPG - aPPG;
      });
    }

    // Sort team names by alphabetical order
    const sortedTeams = Object.keys(grouped).sort();
    const sortedRosters = {};
    sortedTeams.forEach(team => {
      sortedRosters[team] = grouped[team];
    });

    // Filter by team name if search is applied
    if (searchTeam.value) {
      return Object.fromEntries(
        Object.entries(sortedRosters).filter(([teamName]) =>
          teamName.toLowerCase().includes(searchTeam.value.toLowerCase())
        )
      );
    }

    return sortedRosters;
  });

  return {
    searchTeam,
    filteredRosters,
    calculatePPG,
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

  .roster-wrapper {
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

  .roster-wrapper > div {
    width: 100%;
  }

  .team-title {
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
    margin-top: 40px;
  }

  .search-input::placeholder {
    color: #888;
  }

  .search-input:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border-color: #0d2d5a;
  }

  .division-leaders {
    display: block;
    font-size: 1.2rem;
    font-family: 'Segoe UI', Arial, sans-serif;
    font-weight: 500;
    text-decoration: none;
    color: #0d2d5a;
    margin: 10px 0;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
  }

  .division-leaders:hover {
    color: #1a73e8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-3px);
  }
  
  .ChampWrapper{
    border: 5px solid #0d2d5a;
    padding: 1rem;
    margin-bottom: 30px;
    border-radius: 20px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
    min-width: 320px;
    max-width: 960px;
    align-items: center;
    margin: 1px auto;
    background-color: #ffffff;
  }

  @media (max-width: 767px) {
    .roster-wrapper {
      min-width: 100%;
      padding: 0.625rem;
    }

    .title {
      font-size: 1.5rem;
    }

    .team-title {
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
    .division-leaders {
    font-size: 1rem;
    }
    .ChampWrapper {
      padding: 0.625rem;
    }
  }
</style>