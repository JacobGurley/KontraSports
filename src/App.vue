<template>
  <div id="app-content">
    <keep-alive>
      <NavBar />
    </keep-alive>
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
*{
  padding:0;
  margin:0;
  box-sizing: border-box;
}
#app-content {
  padding-bottom: 70px;
}

</style>
