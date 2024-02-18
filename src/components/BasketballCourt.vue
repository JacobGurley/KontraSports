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
  max-width: 960px;
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
  font-family: 'Helvetica', sans-serif;
  color: #0d2d5a;
  margin-bottom: 20px;
  margin-top: 10px;
}
.courts-image {
  width: 100%;
  max-width: 600px; /* Limit the maximum width of the image */
  height: auto; /* Maintain the aspect ratio */ 
}
.carousel-wrapper {
  border: 5px solid #0d2d5a;
  padding: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
@media (max-width: 768px) {
  .container {
    max-width: 90%;
  } 
}
</style>