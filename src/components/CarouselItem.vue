<template>
  <transition :name="transitionEffect">
    <div
      class="carousel-item"
      v-if="currentSlide === index"
      @mouseenter="$emit('mouseenter')"
      @mouseout="$emit('mouseout')"
    >
      <img :src="slide" class="carousel-image" alt="Slide image"/>
    </div>
  </transition>
</template>
<script>
export default {
  emits: ["mouseenter", "mouseout"],
  props: ["slide", "currentSlide", "index", "direction"],
  computed: {
    transitionEffect() {
      return "fade";
    },
  },
};
</script>
<style scoped>
.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
