<template>
  <Nav />
  <div class="width">
    <div class="Winter"></div>
    <div class="ChampWrapper">
      <router-link class="thurs" to="/teamRosterThurA">Thursday Division A Rosters</router-link>
      <router-link class="sunA" to="/teamRosterSunA">Sunday Division A Rosters</router-link>
      <router-link class="sunB" to="/teamRosterSunB">Sunday Division B Rosters</router-link>
      <router-link class="sunC" to="/teamRosterSunC">Sunday Division C Rosters</router-link>
      

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
.width{
  width:100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.Winter{
  text-align: center;
  margin-bottom: 30px;
}

.ChampWrapper{
  border: 5px solid #0d2d5a;
  padding: 5px;
  min-width: 992px;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}
.thurs{
  text-align: center;
  color:blue;
  font:bold;
  display: block;
  font-size: large;
  font-family: Helvetica;
  text-decoration: underline;
  margin-bottom: 15px;
  margin-top: 15px;
}

.sunA{
  text-align: center;
  color:blue;
  font:bold;
  display: block;
  font-size: large;
  font-family: Helvetica;
  text-decoration: underline;
  margin-bottom: 15px;
}

.sunB{
  text-align: center;
  color:blue;
  font:bold;
  display: block;
  font-size: large;
  font-family: Helvetica;
  text-decoration: underline;
  margin-bottom: 15px;
}

.sunC{
  text-align: center;
  color:blue;
  font:bold;
  display: block;
  font-size: large;
  font-family: Helvetica;
  text-decoration: underline;
  margin-bottom: 15px;
}

</style>