<template>
  <div class="container">
    <h1>WELCOME TO THE FALL 2024 SEASON!</h1>
    <div class="links">
      <p class="reg">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSflO8-tbC7V5oToxfh8wdxld8jWpPUIsa6pa5Bq8VTH18bnlA/viewform" target="_blank" rel="noopener noreferrer">Click Here for 2024 Fall Registration </a>
      </p>
      <p class="waiver">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdJBicpbOetgqkq3pn8_E8mKaudZTIaLveak6eWJc_Nqru7dg/viewform?pli=1" target="_blank" rel="noopener noreferrer">Click Here for the Waiver Form </a>
      </p>
      <p class="location">
        <a href="https://www.google.com/maps?q=1718+Apollo+Ct,+Seal+Beach,+CA+90740" target="_blank" rel="noopener noreferrer">Click Here for Directions to AIMS Sports Group</a>
      </p>
      <router-link class="court-link" to="/basketballCourt">Click Here for Map of AIMS BIG GYM</router-link>
    </div>
    <section class="champions-section">
      <h2>Congratulations to the Spring 2024 Champions!</h2>
      <ul>
        <li>Wednesday Open Champions: Practice Squad</li>
        <li>Thursday Open Champions: Hoops Legends</li>
        <li>Thursday 6'2 Champions: Alcoholics</li>
        <li>Sunday Open Champions: Outlawz</li>
        <li>Sunday 6'2 Champions: Los Veteranos</li>
        <li>Sunday 6'0 Champions: Menace 2 Society</li>
      </ul>
    </section>
    <div class="ChampWrapper">
      <router-link class="halloffame-link" to="/hallOfFame">Hall of Fame</router-link>
    </div>
    <div class="carousel-wrapper">
    <PhotoGallery />
    </div>
  </div>
</template>

<script scoped>
import PhotoGallery from "./PhotoGallery.vue";
export default {
  components: {
    PhotoGallery,
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  background-color: #fafafa;
}
</style>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 15px;
  text-align: center;
}

@media (max-width: 768px) {
  .container {
    max-width: 90%;
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 1.25rem;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 0.625rem;
  }

  .ChampWrapper {
    padding: 0.625rem;
  }

  .links {
    padding: 0.625rem;
  }

  li, .halloffame-link, .waiver, .location, .reg, .court-link {
    font-size: 1rem;
  }

  .carousel-wrapper {
    width: 100%;
    overflow: hidden;
  }
}

.ChampWrapper{
  border: 5px solid #0d2d5a;
  padding: 1rem;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
}

.links{
  border: 5px solid #0d2d5a;
  padding: 1rem;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
}

.halloffame-link, .waiver, .location, .reg, .court-link{
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
.halloffame-link:hover, .waiver:hover, .location:hover, .reg:hover, .court-link:hover {
  color: #1a73e8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}
h1 {
  font-family: 'Segoe UI', Arial, sans-serif;
  font-weight: bold;
  font-size: 2.5rem;
  margin-top: 5px;
  margin-bottom: 30px;
  color: red;
}

.champions-section {
  border: 5px solid #0d2d5a;
  padding: 1rem;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
}

h2 {
  font-family: 'Segoe UI', Arial, sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-family: 'Segoe UI', Arial, sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
}

.carousel-wrapper {
  border: 5px solid #0d2d5a;
  padding: 5px;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
}
</style>
