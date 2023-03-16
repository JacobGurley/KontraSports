<template>
    <Nav />
    <iframe
    :src="docUrl"
    width="100%"
    height="600"
    frameborder="0"
    scrolling="no"

    ></iframe>
    
  </template>
  
  <script scoped>
  import Nav from "./NavBar.vue";
  export default {
    components: {
    Nav,
  
  },
    data(){
      return{
        docUrl: "https://docs.google.com/document/d/1wX9DrKIUB0wVJP_rDcB53rAAjH4G5iWZfoQwH4KymIM/embed"
      };
    }
  
  };
  
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  
  
  
  
  
  </style>