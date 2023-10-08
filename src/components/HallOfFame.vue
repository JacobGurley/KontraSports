<template>
    <Nav />
    <div class="container">
    <div class="title">Past Champions</div>
    <section class="champions-section">
      <h2>Summer 2022 Champions</h2>
      <ul>
        <li>Thursday Night Champs: LFG</li>
        <li>Sunday Night Div A Champs: Practice Squad</li>
        <li>Sunday Night Div B Champs: 9-5ers</li>
      </ul>
      <h2>Winter 2023 Champions</h2>
      <ul>
        <li>Thursday Div A Champs: Beach</li>
        <li>Sunday Div A Champs: Strap City</li>
        <li>Sunday Div B Champs: Trailblazians</li>
        <li>Sunday Div C Champs: Mamba Mentality</li>
      </ul>
      <h2>Spring 2023 Champions</h2>
      <ul>
        <li>Wednesday Div A Champs: Practice Squad</li>
        <li>Thursday Div A Champs: Beach</li>
        <li>Sunday Div A Champs: Strap City</li>
        <li>Sunday Div B Champs: Rudeboyz</li>
        <li>Sunday Div C Champs: Mamba Mentality</li>
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
export default{
    components: {
        Nav,
        Carousel,
    },
    data: () => ({
    slides: [
      require("../assets/thursday.jpg"),
      require("../assets/sundaydivA.jpg"),
      require("../assets/sundaydivB.jpg"),
      require("../assets/ThurWinterChamps.jpg"),
      require("../assets/SunAWinterChamps.jpg"),
      require("../assets/SunBWinterChamps.jpg"),
      require("../assets/SunCWinterChamps.jpg"),
      require("../assets/WedSpringChamps.jpg"),
      require("../assets/ThursdayASpringChamps.jpg"),
      require("../assets/SunASpringChamps.jpg"),
      require("../assets/SunBSpringChamps.jpg"),
      require("../assets/SunCSpringChamps.jpg"),
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
.title {
  font-size: 2.5rem;
  font-family: 'Helvetica', sans-serif;
  color: #0d2d5a;
  margin-bottom: 20px;
  margin-top: 10px;
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
  margin-bottom: 15px;
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
@media (max-width: 768px) {
  .container {
    max-width: 90%;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  li {
    font-size: 1rem;
  }
  
}
</style>