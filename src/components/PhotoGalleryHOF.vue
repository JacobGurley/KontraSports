<template>
    <div class="carousel-container" 
         @mouseenter="pauseAutoSlide" 
         @mouseleave="startAutoSlide"
         @touchstart="handleTouchStart" 
         @touchend="handleTouchEnd">
      <div class="carousel-slide" :style="{transform: `translateX(-${currentSlide * 100}%)`}">
        <div class="carousel-image" v-for="(image, index) in images" :key="index">
          <img :src="image" :alt="'Slide ' + (index + 1)" loading="lazy">
        </div>
      </div>
      <button class="prev" @click="prevSlide">❮</button>
      <button class="next" @click="nextSlide">❯</button>
      <div class="carousel-indicators">
        <span v-for="(image, index) in images" :key="'indicator-' + index" :class="{'active': currentSlide === index}" @click="goToSlide(index)"></span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentSlide: 0,
        images: [
            require("../assets/thursday.jpg"),
            require("../assets/sundaydivA.jpg"),
            require("../assets/sundaydivB.jpg"),
            require("../assets/ThurWinterChamps.jpg"),
            require("../assets/SunAWinterChamps.jpg"),
            require("../assets/SunBWinterChamps.jpg"),
            require("../assets/SunCWinterChamps.jpg"),
            require("../assets/WedSpringChamps.jpg"),
            require("../assets/ThursdayASpringChamps.jpg"),
            require("../assets/SunASpringChamps.jpg"),
            require("../assets/SunBSpringChamps.jpg"),
            require("../assets/SunCSpringChamps.jpg"),
            require("../assets/Sum2023WedA.jpg"),
            require("../assets/Sum2023ThurA.jpg"),
            require("../assets/Sum2023ThurB.jpg"),
            require("../assets/Sum2023SunA.jpg"),
            require("../assets/Sum2023SunB.jpg"),
            require("../assets/Sum2023SunC.jpg"),
            require("../assets/Sum2023SunD.jpg"),
        ],
        autoSlideInterval: null,
        touchStartX: 0,
        touchEndX: 0,
      };
    },
    mounted() {
      this.startAutoSlide();
      window.addEventListener('keyup', this.handleKeyup);
    },
    beforeUnmount() {
      this.stopAutoSlide();
      window.removeEventListener('keyup', this.handleKeyup);
    },
    methods: {
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
      },
      prevSlide() {
        this.currentSlide = (this.currentSlide + this.images.length - 1) % this.images.length;
      },
      goToSlide(index) {
        this.currentSlide = index;
      },
      startAutoSlide() {
        this.autoSlideInterval = setInterval(this.nextSlide, 5000);
      },
      stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
      },
      pauseAutoSlide() {
        this.stopAutoSlide();
      },
      handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
      },
      handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        if (this.touchStartX - this.touchEndX > 75) {
          this.nextSlide();
        } else if (this.touchStartX - this.touchEndX < -75) {
          this.prevSlide();
        }
      },
      handleKeyup(e) {
        if (e.key === 'ArrowLeft') {
          this.prevSlide();
        } else if (e.key === 'ArrowRight') {
          this.nextSlide();
        }
      },
    },
  };
  </script>
  
  
  <style scoped>
  .carousel-container {
    position: relative;
    overflow: hidden;
  }
  
  .carousel-slide {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  .carousel-image {
    min-width: 100%;
    transition: transform 0.5s ease-in-out;
  }
  
  .carousel-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0,0,0,0.5);
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px;
    z-index: 100;
  }
  
  .prev {
    left: 10px;
  }
  
  .next {
    right: 10px;
  }
  
  .carousel-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  }
  
  .carousel-indicators span {
    cursor: pointer;
    height: 10px;
    width: 10px;
    margin: 0 5px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }
  
  .carousel-indicators .active {
    background-color: #717171;
  }
  @media (max-width: 768px) {
  .carousel-image img {
    width: 100%;
    height: 100%;
    object-fit: contain; 
  }

  .carousel-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    padding: 0;
  }

  .carousel-indicators span {
    height: 8px;
    width: 8px;
    margin: 0 2px;
  }

  .prev, .next {
    font-size: 16px;
    padding: 8px;
    opacity: 0.8;
  }
}
</style>

  