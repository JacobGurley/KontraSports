<template>
  <div class="header-container">
      <div class="color-bar"></div>
      <div class="header-content">
        <img class="header-image" src="../assets/banner.png" />
        <router-link to="/home">
            <img src="../assets/Button_1.png" class="logo">
        </router-link>
      </div>
      <nav class="navbar">
          <ul>
              <li>
                  <router-link to="/home">Home</router-link>
              </li>
              <li>
                  <router-link to="/schedules">Game Schedules</router-link>
              </li>
              <li>
                  <router-link to="/standings">Standings</router-link>
              </li>
              <li>
                  <router-link to="/rosters">Rosters/Stats</router-link>
              </li>
              <li>
                  <router-link to="/rules">Rules</router-link>
              </li>
              <li>
                  <router-link to="/contact">Contact Us</router-link>
              </li>
          </ul>
      </nav>
  </div>
</template>
<style scoped>
html, body {
    padding: 0px;
    margin: 0px;
}
.header-content{
  position: relative;
}
.header-container{
    position: relative;
    margin: auto;
    width: 100%;
    text-align: center;
}
.color-bar {
    background-color: #0d2d5a;
    height: 26px;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
}
.header-image {
    height: 232px;
    background-size: 100% auto;
    background-repeat: no-repeat;
    width: 100%;
    background-position: center center;
}
.logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 250px; 
    transition: transform 0.3s ease;
}
.logo:hover {
    transform: translate(-50%, -50%) scale(1.05);
}
.navbar {
    display: flex;
    justify-content: center;
    margin-top: 0;
    position: sticky;
    top: 0;
    background-color: #0d2d5a;
    z-index: 100;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
.navbar ul {
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  align-items: center;
}
.navbar li {
  margin: 0 20px;
  padding: 10px;
}
.navbar a {
  text-decoration: none;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
  border-radius: 5px;
  padding: 8px 16px;
  transition: all 0.3s ease;
}
.navbar a:hover {
  background-color: #fff;
  color: #0d2d5a;
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
@media (max-width: 768px) {
  .navbar ul {
    flex-direction: column;
    align-items: center;
  }
  .navbar li {
    margin: 10px 0;
    padding: 0;
  }
  .navbar a {
    display: block;
    width: 100%;
    text-align: center;
  }
  .header-image{
    height: 150px;
  }
  .logo{
    height: 150px;
    top: 40%;
  }
}
@media (min-width: 1200px) {
    .header-image {
        height: 300px;
    }
    .logo {
        height: 300px;
        transform: translate(-50%, -50%);
    }
}
</style>