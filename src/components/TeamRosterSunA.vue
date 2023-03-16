<template>
    <Nav />
    <div class = "width">
        <div class = "Winter"></div>
        <div class = "ChampWrapper">
            
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
  <style>
  
  .width{
  width:100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}



.ChampWrapper{  
  border: 5px solid #0d2d5a;
  padding: 5px;
  min-width: 992px;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}

.Winter{
  text-align: center;
  
  margin-bottom: 30px;
}


  </style>