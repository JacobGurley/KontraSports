<template>
    <Nav />
    
    <div class="width">
      <div class="Winter"></div>
      <div class="ChampWrapper">
      <div class="icon-text-container">
        <font-awesome-icon class="user" icon="fa-solid fa-user"></font-awesome-icon>
        <span class="text">Alec Feliciano</span>
        <font-awesome-icon class="phone" icon="fa-solid fa-phone"></font-awesome-icon>
        <span class="text">(562) 852-0551</span>
        <font-awesome-icon class="email" icon="fa-solid fa-envelope"></font-awesome-icon>
        <a class="text" href="mailto:kontrasports360@gmail.com" target="_blank">kontrasports360@gmail.com</a>
        <font-awesome-icon class="insta" icon="fa-brands fa-square-instagram"></font-awesome-icon>
        <a class="text" href="https://www.instagram.com/kontra_sports" target="_blank">kontra_sports</a>
      </div>
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


.text{
  
  color:black;
  font:bold;
  display: block;
  font-size: large;
  font-family: Helvetica;
  margin-bottom: 5px;
  
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
.user, .phone, .email, .insta{
  font-size:2em;
  display: inline-block;
}
.icon-text-container{
  
  display: block;
}
  </style>