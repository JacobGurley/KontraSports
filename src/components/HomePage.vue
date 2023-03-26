<template>
  <Nav />
  <div class="container">
    <h1>Welcome to the Spring 2023 Season!</h1>
    <section class="champions-section">
      <h2>Congratulations to the 2022 Summer Champions!</h2>
      <ul>
        <li>Thursday Night Champs: LFG</li>
        <li>Sunday Night Div A Champs: Practice Squad</li>
        <li>Sunday Night Div B Champs: 9-5ers</li>
      </ul>
    </section>
    <div class="carousel-wrapper">
      <carousel :slides="slides" :interval="3000" controls indicators></carousel>
    </div>
  </div>
</template>

<script scoped>
import Nav from "./NavBar.vue";
import Carousel from "./CarouselFinal.vue";
export default {
  components: {
    Nav,
    Carousel,
  },

  data: () => ({
    slides: [
      require("../assets/thursday.jpg"),
      require("../assets/sundaydivA.jpg"),
      require("../assets/sundaydivB.jpg"),
    ],
  }),
};
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 15px;
  text-align: center;
}

h1 {
  font-family: "Helvetica", sans-serif;
  font-weight: bold;
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.champions-section {
  border: 5px solid #0d2d5a;
  padding: 1rem;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

h2 {
  font-family: "Helvetica", sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-family: "Helvetica", sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
}

.carousel-wrapper {
  border: 5px solid #0d2d5a;
  padding: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
