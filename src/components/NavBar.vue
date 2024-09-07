<template>
  <div class="header-container">
      <div class="color-bar"></div>
      <div class="header-content" ref="headerContent">
        <img class="header-image" src="../assets/banner.png" />
        <router-link to="/home">
            <img src="../assets/Button_1.png" class="logo">
        </router-link>
      </div>
      <nav class="navbar" :class="{ 'fixed-navbar': isNavbarFixed }">
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

<script>
export default {
  data() {
    return {
      isNavbarFixed: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      document.body.classList.add('no-hover');
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const headerContentHeight = this.$refs.headerContent.clientHeight;
      this.isNavbarFixed = window.scrollY > headerContentHeight;
    }
  }
}
</script>

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
body:not(.no-hover) .logo:hover {
    transform: translate(-50%, -50%) scale(1.05);
}
.navbar {
    display: flex;
    justify-content: center;
    margin-top: 0;
    background-color: #0d2d5a;
    z-index: 100;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
.fixed-navbar {
    position: fixed;
    top: 0;
    width: 100%;
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
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .navbar li {
    margin: 0.3125rem;
    padding: 0.3125rem;
  }

  .navbar a {
    font-size: 0.75rem;
    padding: 0.5rem 0.625rem;
  }

  .header-container {
    width: 100%;
    overflow: visible;
  }

  .color-bar {
    width: 100%;
    height: 0.9375rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .header-content {
    position: relative;
    width: 100%;
    overflow: visible;
    padding-top: 0.9375rem;
  }

  .header-image {
    height: 6.25rem;
    width: 100%;
    background-size: cover;
    background-position: center center;
  }

  .logo {
    height: 7.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .navbar, .fixed-navbar {
    position: static;
    margin-top: 0;
  }
}

@media (min-width: 1200px) {
  .header-image {
    height: 300px;
    background-size: cover;
  }
  .logo {
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>