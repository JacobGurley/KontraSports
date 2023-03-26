<template>
  <Nav />
  <div class="container">
    <div class="title">Rosters</div>
    <div class="ChampWrapper">
      <router-link class="schedule-link thurs" to="/teamRosterThurA">Thursday Division A Rosters</router-link>
      <router-link class="schedule-link sunA" to="/teamRosterSunA">Sunday Division A Rosters</router-link>
      <router-link class="schedule-link sunB" to="/teamRosterSunB">Sunday Division B Rosters</router-link>
      <router-link class="schedule-link sunC" to="/teamRosterSunC">Sunday Division C Rosters</router-link>
    </div>
  </div>
</template>

<script scoped>
import Nav from "./NavBar.vue";
export default {
  components: {
  Nav,
},

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 1200px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  font-family: 'Helvetica', sans-serif;
  color: #0d2d5a;
  margin-bottom: 20px;
  margin-top: 10px;
}

.ChampWrapper {
  background-color: #f5f5f5;
  border: 5px solid #0d2d5a;
  border-radius: 10px;
  padding: 20px;
  display: inline-block;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.schedule-link {
  display: block;
  font-size: 1.2rem;
  font-family: 'Helvetica', sans-serif;
  text-decoration: none;
  color: #0d2d5a;
  margin: 10px 0;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.schedule-link:hover {
  color: #1a73e8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}

@media (max-width: 767px) {
  .container {
    padding: 10px;
  }

  .ChampWrapper {
    padding: 10px;
  }

  .schedule-link {
    font-size: 1rem;
  }
}

</style>