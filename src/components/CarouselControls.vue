<template>
  <div>
    <button class="carousel-control left" @click="$emit('prev')">
      <span class="material-icons">chevron_left</span>
    </button>
    <button class="carousel-control right" @click="$emit('next')">
      <span class="material-icons">chevron_right</span>
    </button>
  </div>
</template>

<script>
export default {
  emits: ["prev", "next"],
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
.carousel-control {
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 60px;
  width: 60px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  cursor: pointer;
  border-radius: 30px;
}

.left {
  left: 20px;
}

.right {
  right: 20px;
}

.material-icons {
  font-size: 24px;
}
</style>
