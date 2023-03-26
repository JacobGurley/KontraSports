<template>
  <div class="header-container">
      <div class="color-bar"></div>
      <img class="header-image" src="../assets/banner.png" />
      <router-link to="home">
          <img src="../assets/Button_1.png" class="logo">
      </router-link>
      <nav class="navbar">
          <ul>
              <li>
                  <router-link to="home">Home</router-link>
              </li>
              <li>
                  <router-link to="schedules">Game Schedules</router-link>
              </li>
              <li>
                  <router-link to="standings">Standings</router-link>
              </li>
              <li>
                  <router-link to="rosters">Rosters</router-link>
              </li>
              <li>
                  <router-link to="rules">Rules</router-link>
              </li>
              <li>
                  <router-link to="contact">Contact Us</router-link>
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
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
}

.logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 250px;
    transition: transform 0.3s ease;
}

.logo:hover {
    transform: translate(-50%, -55%);
}

.navbar {
    display: flex;
    justify-content: center;
    margin-top: 0;
    position: sticky;
    top: 0;
    background-color: #0d2d5a;
    z-index: 100;
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
  margin: 0 10px;
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
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.navbar a:hover {
  background-color: #fff;
  color: #0d2d5a;
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
}

</style>