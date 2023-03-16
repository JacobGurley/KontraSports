<template>
  <Nav />
  <div class="width">
    <div class="Winter">Welcome to the Winter 2023 Season!</div>
    <div class="ChampWrapper">
    <div class="Champions">Congratulations to the 2022 Summer Champions!</div>
    <div class="Thur">Thursday Night Champs: LFG</div>
    <div class="DivA">Sunday Night Div A Champs: Practice Squad</div>
    <div class="DivB">Sunday Night Div B Champs: 9-5ers</div>
    </div>
    <div class="carousel-wrapper">
      <carousel :slides="slides" :interval="3000" controls indicators></carousel>
    

  </div>
</div>
  
</template>

<script scoped>
import Nav from "./NavBar.vue";
import Carousel from "./CarouselFinal.vue"
export default {
  components: {
  Nav,
  Carousel,
  

},

data: () => ({
  slides: [
    require('../assets/thursday.jpg'),
    require('../assets/sundaydivA.jpg'),
    require('../assets/sundaydivB.jpg'),
  ],
}),

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
  color:black;
  font:bold;
  display: block;
  font-size: xx-large;
  font-family: Helvetica;
  margin-bottom: 30px;
}
.Champions{
  text-align: center;
  color:black;
  font:bold;
  display: block;
  font-size: large;
  font-family: Helvetica;
  margin-bottom: 10px;

}

.Thur{
  text-align: center;
  color:black;
  font:bold;
  display: block;
  font-size: large;
  font-family: Helvetica;

}

.DivA{
  text-align: center;
  color:black;
  font:bold;
  display: block;
  font-size: large;
  font-family: Helvetica;

}

.DivB{
  text-align: center;
  color:black;
  font:bold;
  display: block;
  font-size: large;
  font-family: Helvetica;

}
.carousel-wrapper{
  border: 5px solid #0d2d5a;
  padding: 5px;
  min-width: 992px;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto; 
}

.ChampWrapper{
  border: 5px solid #0d2d5a;
  padding: 5px;
  min-width: 992px;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}
</style>
