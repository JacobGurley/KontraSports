<template>
  <Nav />
  <div class="container">
      <div class="title">
          <h1>Rosters</h1>
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
                  <td>{{ (player.points / player.gamesPlayed).toFixed(1) }}</td>
              </tr>
          </tbody>
          </table>
        </div>      
      </div>
  </div>
</template>

<script scoped>
import Nav from "./NavBar.vue";
import { getDatabase, ref as dbRef, set, push, get, onValue } from 'firebase/database';
import{ ref, onMounted, computed } from 'vue';

export default {
  components: {
    Nav,
  },

  setup(){
    const db = getDatabase();
    const rosterRef = dbRef(db, 'rosterSunB');
    const roster = ref({});
    const groupedRosters = ref({});
    const searchTeam = ref('');

       // Create a computed property that filters the rosters based on the search query
       const filteredRosters = computed(() => {
        if (!searchTeam.value) {
          return groupedRosters.value;
        }
        return Object.fromEntries(
          Object.entries(groupedRosters.value).filter(([team]) =>
            team.toLowerCase().includes(searchTeam.value.toLowerCase())
          )
        );
      });

    onMounted(async () => {
      // Check if the games have already been written to the database
      const snapshot = await get(rosterRef);
      if (!snapshot.exists()) {
        // Write the games to the database
        const initialRoster = [
            {team: 'Alcoholics', name: 'Francisco Gonzalez', points: 0, gamesPlayed: 1},
            {team: 'Alcoholics', name: 'Ryan Bell', points: 0, gamesPlayed: 1},
            {team: 'Alcoholics', name: 'Peng Heng', points: 0, gamesPlayed: 1},
            {team: 'Alcoholics', name: 'James Penn', points: 0, gamesPlayed: 1},
            {team: 'Alcoholics', name: 'Brent Virtusio', points: 0, gamesPlayed: 1},
            {team: 'Alcoholics', name: 'Marino Cardenas', points: 0, gamesPlayed: 1},
            {team: 'Alcoholics', name: 'Carlos', points: 0, gamesPlayed: 1},
            {team: 'Alcoholics', name: 'Mike', points: 0, gamesPlayed: 1},
            {team: 'Dawgs', name: 'AJ Williams', points: 0, gamesPlayed: 1},
            {team: 'Dawgs', name: 'Andres Rodriguez', points: 0, gamesPlayed: 1},
            {team: 'Dawgs', name: 'Darius Cheatom', points: 0, gamesPlayed: 1},
            {team: 'Dawgs', name: 'Marcelo Calderon', points: 0, gamesPlayed: 1},
            {team: 'Dawgs', name: 'Montel Taylor', points: 0, gamesPlayed: 1},
            {team: 'Dawgs', name: 'Tirrell Wynn', points: 0, gamesPlayed: 1},
            {team: 'Dawgs', name: 'Adei Morris', points: 0, gamesPlayed: 1},
            {team: 'Dawgs', name: 'Sergio Ponce', points: 0, gamesPlayed: 1},
            {team: 'Dawgs', name: 'Osei Morris', points: 0, gamesPlayed: 1},
            {team: 'Dawgs', name: 'Dionate McIntosh', points: 0, gamesPlayed: 1},
            {team: 'Dawgs', name: 'Edwin Mayo', points: 0, gamesPlayed: 1},
            {team: 'BBQ Chicken', name: 'Kyle', points: 0, gamesPlayed: 1},
            {team: 'BBQ Chicken', name: 'Sherwin', points: 0, gamesPlayed: 1},
            {team: 'BBQ Chicken', name: 'Aaron', points: 0, gamesPlayed: 1},
            {team: 'BBQ Chicken', name: 'Chris', points: 0, gamesPlayed: 1},
            {team: 'BBQ Chicken', name: 'Peter', points: 0, gamesPlayed: 1},
            {team: 'BBQ Chicken', name: 'Matt', points: 0, gamesPlayed: 1},
            {team: 'BBQ Chicken', name: 'Mike', points: 0, gamesPlayed: 1},
            {team: 'BBQ Chicken', name: 'Abel', points: 0, gamesPlayed: 1},
            {team: 'BBQ Chicken', name: 'Jazzy', points: 0, gamesPlayed: 1},
            {team: 'BBQ Chicken', name: 'Ajay', points: 0, gamesPlayed: 1},
            {team: 'Trailblazians', name: 'Sam Shin', points: 0, gamesPlayed: 1},
            {team: 'Trailblazians', name: 'Simeon Lam', points: 0, gamesPlayed: 1},
            {team: 'Trailblazians', name: 'Brandon Hino', points: 0, gamesPlayed: 1},
            {team: 'Trailblazians', name: 'Shawn Deluz', points: 0, gamesPlayed: 1},
            {team: 'Trailblazians', name: 'Kyle Wright', points: 0, gamesPlayed: 1},
            {team: 'Trailblazians', name: 'Anthony En', points: 0, gamesPlayed: 1},
            {team: 'Trailblazians', name: 'Richmond Guerrero', points: 0, gamesPlayed: 1},
            {team: 'Trailblazians', name: 'Fernando Vargas', points: 0, gamesPlayed: 1},
            {team: 'Trailblazians', name: 'Onell Gibson', points: 0, gamesPlayed: 1},
            {team: 'Rudeboyz', name: 'Wilton Sy', points: 0, gamesPlayed: 1},
            {team: 'Rudeboyz', name: 'Tyrone Waiters', points: 0, gamesPlayed: 1},
            {team: 'Rudeboyz', name: 'Anthony Nocon', points: 0, gamesPlayed: 1},
            {team: 'Rudeboyz', name: 'Kevin Avery', points: 0, gamesPlayed: 1},
            {team: 'Rudeboyz', name: 'Keith Lockwood', points: 0, gamesPlayed: 1},
            {team: 'Rudeboyz', name: 'Jesus Wences', points: 0, gamesPlayed: 1},
            {team: 'Rudeboyz', name: 'Paolo Obra', points: 0, gamesPlayed: 1},
            {team: 'Rudeboyz', name: 'Ronnie Ong', points: 0, gamesPlayed: 1},
            {team: 'Rudeboyz', name: 'Brandon Hamilton', points: 0, gamesPlayed: 1},
            {team: 'Rudeboyz', name: 'Garrett Roberts', points: 0, gamesPlayed: 1},
            {team: 'Uncle Drews', name: 'Bernie', points: 0, gamesPlayed: 1},
            {team: 'Uncle Drews', name: 'Chidi', points: 0, gamesPlayed: 1},
            {team: 'Uncle Drews', name: 'Anthony', points: 0, gamesPlayed: 1},
            {team: 'Uncle Drews', name: 'Jesus', points: 0, gamesPlayed: 1},
            {team: 'Uncle Drews', name: 'Joel', points: 0, gamesPlayed: 1},
            {team: 'Uncle Drews', name: 'Drew', points: 0, gamesPlayed: 1},
            {team: 'Uncle Drews', name: 'Rose', points: 0, gamesPlayed: 1},
            {team: 'Uncle Drews', name: 'Hector', points: 0, gamesPlayed: 1},
            {team: 'Uncle Drews', name: 'Ankur Tailor', points: 0, gamesPlayed: 1},
            {team: 'Uncle Drews', name: 'James Mendoza', points: 0, gamesPlayed: 1},
            {team: 'Hooligans', name: 'Jesse Khat', points: 0, gamesPlayed: 1},
            {team: 'Hooligans', name: 'Danny Bonsynat', points: 0, gamesPlayed: 1},
            {team: 'Hooligans', name: 'Keith Lewis', points: 0, gamesPlayed: 1},
            {team: 'Hooligans', name: 'Bobby Yon', points: 0, gamesPlayed: 1},
            {team: 'Hooligans', name: 'Alex Kouch', points: 0, gamesPlayed: 1},
            {team: 'Hooligans', name: 'Ryan Brang', points: 0, gamesPlayed: 1},
            {team: 'Hooligans', name: 'Jonathan Sa', points: 0, gamesPlayed: 1},
            {team: 'Hooligans', name: 'Rocky Avelino', points: 0, gamesPlayed: 1},
            {team: 'Hooligans', name: 'Kenneth Hoang', points: 0, gamesPlayed: 1},
            {team: 'Hooligans', name: 'Jimmy So', points: 0, gamesPlayed: 1},
            {team: '9-5erz', name: 'Donte Colbert', points: 0, gamesPlayed: 1},
            {team: '9-5erz', name: 'Eric Colbert', points: 0, gamesPlayed: 1},
            {team: '9-5erz', name: 'Josh Hadnot', points: 0, gamesPlayed: 1},
            {team: '9-5erz', name: 'Davion Brown', points: 0, gamesPlayed: 1},
            {team: '9-5erz', name: 'Taj Davis', points: 0, gamesPlayed: 1},
            {team: '9-5erz', name: 'Bryan Eme', points: 0, gamesPlayed: 1},
            {team: '9-5erz', name: 'Chris Gipson', points: 0, gamesPlayed: 1},
            {team: 'Living Grace', name: 'Christian Kim', points: 0, gamesPlayed: 1},
            {team: 'Living Grace', name: 'James Hong', points: 0, gamesPlayed: 1},
            {team: 'Living Grace', name: 'Justin Do', points: 0, gamesPlayed: 1},
            {team: 'Living Grace', name: 'Simon Yoo', points: 0, gamesPlayed: 1},
            {team: 'Living Grace', name: 'Isaac Kim', points: 0, gamesPlayed: 1},
            {team: 'Living Grace', name: 'Howard Lee', points: 0, gamesPlayed: 1},
            {team: 'Living Grace', name: 'Justin Do', points: 0, gamesPlayed: 1},
            {team: 'Living Grace', name: 'David Choung', points: 0, gamesPlayed: 1},
        ];
        initialRoster.forEach((player) => {
          const newRosterRef = push(rosterRef);
          set(newRosterRef, player);
        });
      } else {
        // set the roster with the data from the database
        roster.value = Object.values(snapshot.val()).sort((a, b) => b.points / b.gamesPlayed - a.points / a.gamesPlayed);
        updateGroupedRosters();
      }
    });

    //Listen for changes in Firebase and update the roster
    onValue(rosterRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        roster.value = Object.values(data).sort((a, b) => b.points / b.gamesPlayed - a.points / a.gamesPlayed);
        updateGroupedRosters();
      }
    });

    const updateGroupedRosters = () => {
      //Clear the groupRosters object
      Object.keys(groupedRosters.value).forEach(key => {
        delete groupedRosters.value[key];
      });

      //Group roster by team name 
      roster.value.forEach((player) => {
        if (!groupedRosters.value[player.team]) {
          groupedRosters.value[player.team] = [];
        }
        groupedRosters.value[player.team].push(player);
      });

      //Sort team names by alphabetical order
      const sortedTeams = Object.keys(groupedRosters.value).sort();
      const sortedRosters = {};
      sortedTeams.forEach((team) => {
        sortedRosters[team] = groupedRosters.value[team];
      });
      groupedRosters.value = sortedRosters;
    };

    return {
      searchTeam,
      filteredRosters,
      roster,
      groupedRosters,
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

.roster-wrapper {
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
.team-title{
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
    .roster-wrapper {
      min-width: 100%;
      padding: 10px;
    }

    .title {
      font-size: 24px;
    }

    .team-title {
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