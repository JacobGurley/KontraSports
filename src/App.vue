<template>
  <div id="app-content">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
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
