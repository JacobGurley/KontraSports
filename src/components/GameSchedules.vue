<template>
  <div class="container">
    <div class="title">Game Schedules</div>
    <div class="ChampWrapper">
      <router-link class="schedule-link thurs" to="/thursdayAGameSchedule">Thursday Open Height Schedule</router-link>
      <router-link class="schedule-link sunB" to="/sundayBGameSchedule">Sunday 6'2 Division Schedule</router-link>
      <router-link class="schedule-link sunC" to="/sundayCGameSchedule">Sunday 6'0 Division Schedule</router-link>
    </div>
  </div>
</template>

<script scoped>
export default {
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
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

.ChampWrapper {
  border: 5px solid #0d2d5a;
  border-radius: 20px;
  padding: 20px;
  display: inline-block;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
}

.schedule-link {
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

.schedule-link:hover {
  color: #1a73e8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}

@media (max-width: 767px) {
  .container {
    padding: 10px;
    padding-bottom: 70px;
  }

  .ChampWrapper {
    padding: 10px;
  }

  .schedule-link {
    font-size: 1rem;
  }
}

</style>