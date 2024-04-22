<template>
    <Nav />
    <div class="container">
        <div class="content">
            <div class="title">1709 Apollo Ct BIG GYM</div>
            <div class="carousel-wrapper">
                <img src="@/assets/courts.jpg" alt="Basketball Courts" class="courts-image" />
            </div>
        </div>
    </div>
</template>

<script scoped>
import Nav from "./NavBar.vue";

export default{
    components: {
        Nav,
    },
};
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  padding: 15px;
  text-align: center;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 15px;
}
.title {
  font-size: 2.5rem;
  font-family: 'Segoe UI', Arial, sans-serif;
  font-weight: bold;
  color: #0d2d5a;
  margin-bottom: 20px;
  margin-top: 10px;
}
.courts-image {
  width: 100%;
  max-width: 600px;
  height: auto; 
}
.carousel-wrapper {
  border: 5px solid #0d2d5a;
  padding: 5px;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
}
@media (max-width: 768px) {
  .container {
    max-width: 90%;
  } 
}
</style>