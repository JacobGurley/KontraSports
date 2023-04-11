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
    const rosterRef = dbRef(db, 'rosterSunC');
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
            {team: 'Joakim Around', name: 'Mo Lim', points: 0, gamesPlayed: 1},
            {team: 'Joakim Around', name: 'James Park', points: 0, gamesPlayed: 1},
            {team: 'Joakim Around', name: 'Andrew Lopez', points: 0, gamesPlayed: 1},
            {team: 'Joakim Around', name: 'Mark Lopez', points: 0, gamesPlayed: 1},
            {team: 'Joakim Around', name: 'Armando Padilla', points: 0, gamesPlayed: 1},
            {team: 'Joakim Around', name: 'Emmanuel Gutierrez', points: 0, gamesPlayed: 1},
            {team: 'Joakim Around', name: 'Fernando Sales', points: 0, gamesPlayed: 1},
            {team: 'Joakim Around', name: 'Chris Espana', points: 0, gamesPlayed: 1},
            {team: 'Shrimp Gang', name: 'Chris Bunger', points: 0, gamesPlayed: 1},
            {team: 'Shrimp Gang', name: 'Michael Kimura', points: 0, gamesPlayed: 1},
            {team: 'Shrimp Gang', name: 'Josh Smeenge', points: 0, gamesPlayed: 1},
            {team: 'Shrimp Gang', name: 'Anton Sather', points: 0, gamesPlayed: 1},
            {team: 'Shrimp Gang', name: 'Christian Saw', points: 0, gamesPlayed: 1},
            {team: 'Shrimp Gang', name: 'Chirag Patel', points: 0, gamesPlayed: 1},
            {team: 'Shrimp Gang', name: 'Orlando Lopes', points: 0, gamesPlayed: 1},
            {team: 'Shrimp Gang', name: 'Jason Tong', points: 0, gamesPlayed: 1},
            {team: 'Kool Aid Jammers', name: 'Kyle Robinson', points: 0, gamesPlayed: 1},
            {team: 'Kool Aid Jammers', name: 'Josh Campos', points: 0, gamesPlayed: 1},
            {team: 'Kool Aid Jammers', name: 'Tristan Frembling', points: 0, gamesPlayed: 1},
            {team: 'Kool Aid Jammers', name: 'Hayden Moy', points: 0, gamesPlayed: 1},
            {team: 'Kool Aid Jammers', name: 'Wallace B', points: 0, gamesPlayed: 1},
            {team: 'Kool Aid Jammers', name: 'Clay Clark', points: 0, gamesPlayed: 1},
            {team: 'Kool Aid Jammers', name: 'Andrew Hufana', points: 0, gamesPlayed: 1},
            {team: 'Kool Aid Jammers', name: 'Kevin Isa', points: 0, gamesPlayed: 1},
            {team: 'Kool Aid Jammers', name: 'Jacob Campos', points: 0, gamesPlayed: 1},
            {team: 'Volume 0', name: 'Jesmiel Kumar', points: 0, gamesPlayed: 1},
            {team: 'Volume 0', name: 'Soheil Behzadmanesh', points: 0, gamesPlayed: 1},
            {team: 'Volume 0', name: 'Matthew Thomas', points: 0, gamesPlayed: 1},
            {team: 'Volume 0', name: 'Edward Castillo', points: 0, gamesPlayed: 1},
            {team: 'Volume 0', name: 'Caleb Kulwitzky', points: 0, gamesPlayed: 1},
            {team: 'Volume 0', name: 'Kade West', points: 0, gamesPlayed: 1},
            {team: 'Volume 0', name: 'Beto Martinez', points: 0, gamesPlayed: 1},
            {team: 'Mamba Mentality', name: 'Diego Carrillo', points: 0, gamesPlayed: 1},
            {team: 'Mamba Mentality', name: 'Hansel Portillo', points: 0, gamesPlayed: 1},
            {team: 'Mamba Mentality', name: 'Ivan Ramon', points: 0, gamesPlayed: 1},
            {team: 'Mamba Mentality', name: 'Nestor Carrillo', points: 0, gamesPlayed: 1},
            {team: 'Mamba Mentality', name: 'Zach Bustos', points: 0, gamesPlayed: 1},
            {team: 'Mamba Mentality', name: 'Mike de Jesus', points: 0, gamesPlayed: 1},
            {team: 'Mamba Mentality', name: 'Carlos Alonso', points: 0, gamesPlayed: 1},
            {team: 'Mamba Mentality', name: 'Josh Ebalo', points: 0, gamesPlayed: 1},
            {team: '60pointgame', name: 'Jesse', points: 0, gamesPlayed: 1},
            {team: '60pointgame', name: 'Jason', points: 0, gamesPlayed: 1},
            {team: '60pointgame', name: 'Jackie', points: 0, gamesPlayed: 1},
            {team: '60pointgame', name: 'Jimmy', points: 0, gamesPlayed: 1},
            {team: '60pointgame', name: 'Kam', points: 0, gamesPlayed: 1},
            {team: '60pointgame', name: 'Cory', points: 0, gamesPlayed: 1},
            {team: '60pointgame', name: 'Jarrod', points: 0, gamesPlayed: 1},
            {team: '60pointgame', name: 'Sokem', points: 0, gamesPlayed: 1},
            {team: '60pointgame', name: 'Kevin', points: 0, gamesPlayed: 1},
            {team: 'Bad Boy Mafia', name: 'David Cornel', points: 0, gamesPlayed: 1},
            {team: 'Bad Boy Mafia', name: 'Nino Magsino', points: 0, gamesPlayed: 1},
            {team: 'Bad Boy Mafia', name: 'Dylan Valdez', points: 0, gamesPlayed: 1},
            {team: 'Bad Boy Mafia', name: 'Angel Diaz', points: 0, gamesPlayed: 1},
            {team: 'Bad Boy Mafia', name: 'Jairo Balesteros', points: 0, gamesPlayed: 1},
            {team: 'Bad Boy Mafia', name: 'Chris Solano', points: 0, gamesPlayed: 1},
            {team: 'Bad Boy Mafia', name: 'Darrell Potts', points: 0, gamesPlayed: 1},
            {team: 'Bad Boy Mafia', name: 'Darren Potts', points: 0, gamesPlayed: 1},
            {team: 'Bad Boy Mafia', name: 'Estevan Villa', points: 0, gamesPlayed: 1},
            {team: 'Shot Crew', name: 'Mike Apohen', points: 0, gamesPlayed: 1},
            {team: 'Shot Crew', name: 'Alphonso Buzzio', points: 0, gamesPlayed: 1},
            {team: 'Shot Crew', name: 'Brandon Del Fuente', points: 0, gamesPlayed: 1},
            {team: 'Shot Crew', name: 'Felipe Arceo', points: 0, gamesPlayed: 1},
            {team: 'Shot Crew', name: 'Mike Fassam', points: 0, gamesPlayed: 1},
            {team: 'Shot Crew', name: 'Jay Tagumasi', points: 0, gamesPlayed: 1},
            {team: 'Shot Crew', name: 'Will Brewer', points: 0, gamesPlayed: 1},
            {team: 'Gold Hillz Ballers', name: 'Patrick Mueca', points: 0, gamesPlayed: 1},
            {team: 'Gold Hillz Ballers', name: 'Alex Castrejon', points: 0, gamesPlayed: 1},
            {team: 'Gold Hillz Ballers', name: 'Mike Hongkham', points: 0, gamesPlayed: 1},
            {team: 'Gold Hillz Ballers', name: 'Tristan Vu', points: 0, gamesPlayed: 1},
            {team: 'Gold Hillz Ballers', name: 'Alex Fuji', points: 0, gamesPlayed: 1},
            {team: 'Gold Hillz Ballers', name: 'Jermaine Vivar', points: 0, gamesPlayed: 1},
            {team: 'True Grit', name: 'Christopher Eguilos', points: 0, gamesPlayed: 1},
            {team: 'True Grit', name: 'David Khim', points: 0, gamesPlayed: 1},
            {team: 'True Grit', name: 'Dee Pagdilao', points: 0, gamesPlayed: 1},
            {team: 'True Grit', name: 'Danny Bonsynat', points: 0, gamesPlayed: 1},
            {team: 'True Grit', name: 'Johnathan Sa', points: 0, gamesPlayed: 1},
            {team: 'True Grit', name: 'De Juan Blackburn Jr', points: 0, gamesPlayed: 1},
            {team: 'True Grit', name: 'Nikki Bonsynat', points: 0, gamesPlayed: 1},
            {team: 'Moons Goons', name: 'Kevin Kwon', points: 0, gamesPlayed: 1},
            {team: 'Moons Goons', name: 'Eddie Moon', points: 0, gamesPlayed: 1},
            {team: 'Moons Goons', name: 'Jason Han', points: 0, gamesPlayed: 1},
            {team: 'Moons Goons', name: 'Eric Park', points: 0, gamesPlayed: 1},
            {team: 'Moons Goons', name: 'Jon Hoffman', points: 0, gamesPlayed: 1},
            {team: 'Moons Goons', name: 'David Hong', points: 0, gamesPlayed: 1},
            {team: 'Moons Goons', name: 'David Lee', points: 0, gamesPlayed: 1},
            {team: 'Moons Goons', name: 'Paul', points: 0, gamesPlayed: 1},
            {team: 'Moons Goons', name: 'Tom', points: 0, gamesPlayed: 1},
            {team: 'Primeflight', name: 'Nicolas B', points: 0, gamesPlayed: 1},
            {team: 'Primeflight', name: 'Allan S', points: 0, gamesPlayed: 1},
            {team: 'Primeflight', name: 'Ethan S', points: 0, gamesPlayed: 1},
            {team: 'Primeflight', name: 'Jay E', points: 0, gamesPlayed: 1},
            {team: 'Primeflight', name: 'Allan B', points: 0, gamesPlayed: 1},
            {team: 'Primeflight', name: 'Izell S', points: 0, gamesPlayed: 1},
            {team: 'Primeflight', name: 'Gavin', points: 0, gamesPlayed: 1},
            {team: 'Primeflight', name: 'Mike', points: 0, gamesPlayed: 1},
            {team: 'Primeflight', name: 'Edrick', points: 0, gamesPlayed: 1},
            {team: 'LBSU Rec', name: 'Carl Rivera', points: 0, gamesPlayed: 1},
            {team: 'LBSU Rec', name: 'John Nguyen', points: 0, gamesPlayed: 1},
            {team: 'LBSU Rec', name: 'Alisen Montanaga', points: 0, gamesPlayed: 1},
            {team: 'LBSU Rec', name: 'Matt Tuano', points: 0, gamesPlayed: 1},
            {team: 'LBSU Rec', name: 'Chris Bautista', points: 0, gamesPlayed: 1},
            {team: 'LBSU Rec', name: 'Vivian Tanudjaja', points: 0, gamesPlayed: 1},
            {team: 'LBSU Rec', name: 'Sean Tuano', points: 0, gamesPlayed: 1},


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