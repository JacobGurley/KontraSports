<template>
    <div class="container">
    <div class="title">HALL OF FAME</div>
    <section class="champions-section">
      <h2>Summer 2022 Champions</h2>
      <ul>
        <li>Thursday: LFG</li>
        <li>Sunday A: Practice Squad</li>
        <li>Sunday B: 9-5ers</li>
      </ul>
      <h2>Winter 2023 Champions</h2>
      <ul>
        <li>Thursday: Beach</li>
        <li>Sunday A: Strap City</li>
        <li>Sunday B: Trailblazians</li>
        <li>Sunday C: Mamba Mentality</li>
      </ul>
      <h2>Spring 2023 Champions</h2>
      <ul>
        <li>Wednesday: Practice Squad</li>
        <li>Thursday: Beach</li>
        <li>Sunday A: Strap City</li>
        <li>Sunday B: Rudeboyz</li>
        <li>Sunday C: Mamba Mentality</li>
      </ul>
      <h2>Summer 2023 Champions</h2>
      <ul>
        <li>Wednesday 6'2: Practice Squad</li>
        <li>Thursday 6'3: The Crew</li>
        <li>Thursday 6'1: Day Ones</li>
        <li>Sunday A: FBG</li>
        <li>Sunday B: Rudeboyz</li>
        <li>Sunday C: Shot Crew</li>
        <li>Sunday D: Adobros</li>
      </ul>
      <h2>Fall 2023 Champions</h2>
      <ul>
        <li>Wednesday 6'2: Practice Squad</li>
        <li>Thursday 6'3: White Owls</li>
        <li>Thursday 6'1: Hands Down Man Down</li>
        <li>Sunday A: FBG</li>
        <li>Sunday B: Ball Don't Lie</li>
        <li>Sunday C: True Grit</li>
        <li>Sunday D: Living Grace</li>
      </ul>
      <h2>Winter 2024 Champions</h2>
      <ul>
        <li>Wednesday 6'2: Practice Squad</li>
        <li>Thursday 6'3: White Owls</li>
        <li>Thursday 6'1: Young Bucs</li>
        <li>Sunday A: Daddy Chill</li>
        <li>Sunday B: The Redeem Team</li>
        <li>Sunday C: Purple Cobras</li>
        <li>Sunday D: Menace 2 Society</li>
      </ul>
      <h2>Spring 2024 Champions</h2>
      <ul>
        <li>Wednesday Open: Practice Squad</li>
        <li>Thursday Open: Hoops Legends</li>
        <li>Thursday 6'2: Alcoholics</li>
        <li>Sunday Open: Outlawz</li>
        <li>Sunday 6'2: Los Veteranos</li>
        <li>Sunday 6'0: Menace 2 Society</li>
      </ul>
      <h2>Fall 2024 Champions</h2>
      <ul>
        <li>Thursday Open: White Owls</li>
        <li>Thursday 6'2: Jersey Shore</li>
        <li>Sunday Open: Outlawz</li>
        <li>Sunday 6'2: Dunkin Donuts</li>
        <li>Sunday 6'0: All Money In</li>
      </ul>
    </section>
    <div class="carousel-wrapper">
      <PhotoGalleryHOF />
    </div>
  </div>
</template>

<script scoped>
import PhotoGalleryHOF from "./PhotoGalleryHOF.vue";
export default{
    components: {
        PhotoGalleryHOF,
    },
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
  font-family: 'Segoe UI', Arial, sans-serif;
  color: #0d2d5a;
  margin-bottom: 20px;
  margin-top: 10px;
  font-weight: bold;
}
.champions-section {
  border: 5px solid #0d2d5a;
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 30px;
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
  margin-bottom: 15px;
}

li {
  font-family: 'Segoe UI', Arial, sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
}

.carousel-wrapper {
  border: 5px solid #0d2d5a;
  padding: 5px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  background-color: #ffffff;
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
  .carousel-wrapper{
    width: 100%;
    overflow: hidden;
  } 
}
</style>