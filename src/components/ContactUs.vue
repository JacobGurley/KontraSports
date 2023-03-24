<template>
  <Nav />
  <div class="container">
    <div class="content">
      <div class="icon-text-container">
        <div class="contact-item">
          <font-awesome-icon class="user" icon="fa-solid fa-user"></font-awesome-icon>
          <span class="text">Alec Feliciano</span>
        </div>
        <div class="contact-item">
          <font-awesome-icon class="phone" icon="fa-solid fa-phone"></font-awesome-icon>
          <span class="text">(562) 852-0551</span>
        </div>
        <div class="contact-item">
          <a href="mailto:kontrasports360@gmail.com" target="_blank" class="contact-item-link">
            <font-awesome-icon class="email" icon="fa-solid fa-envelope"></font-awesome-icon>
            <span class="text">kontrasports360@gmail.com</span>
          </a>
        </div>
        <div class="contact-item">
          <a href="https://www.instagram.com/kontra_sports" target="_blank" class="contact-item-link">
            <font-awesome-icon class="insta" icon="fa-brands fa-square-instagram"></font-awesome-icon>
            <span class="text">kontra_sports</span>
          </a>
        </div>
      </div>
      <div class="contact-form-container">
        <h2>Send us a message</h2>
        <form class="contact-form" @submit.prevent="submitForm">
          <input ref="nameInput" type="text" placeholder="Your Name" required />
          <input ref="emailInput" type="email" placeholder="Your Email" required />
          <textarea ref="messageInput" placeholder="Your Message" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script scoped>
import Nav from "./NavBar.vue";
import axios from "axios"; 

export default {
  components: {
    Nav,
  },
  methods: {
    async submitForm() {
      const nameInput = this.$refs.nameInput.value;
      const emailInput = this.$refs.emailInput.value;
      const messageInput = this.$refs.messageInput.value;

      try {
        await axios.post("http://localhost:3000/send", {
          name: nameInput,
          email: emailInput,
          message: messageInput,
        });
        alert("Email sent successfully!");
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Error sending email. Please try again later.");
      }
    },
  },
};
</script>

<style scoped>
:root {
  --primary-color: #0d2d5a;
  --secondary-color: #f8f9fa;
  --accent-color: #ff9800;
  --font-family: 'Roboto', sans-serif;
}

.container {
  font-family: var(--font-family);
  background-color: var(--secondary-color);
  padding: 0 1rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 15px;
}

.icon-text-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.contact-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}
.contact-item-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
}
.contact-item:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.user,
.phone,
.email,
.insta {
  font-size: 2em;
  margin-bottom: 5px;
}

.text {
  color: black;
  font-weight: bold;
  font-size: 1.1em;
}

.contact-form-container {
  width: 100%;
  max-width: 600px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 10px;
  font-family: var(--font-family);
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.contact-form textarea {
  resize: none;
  height: 150px;
}

.contact-form button {
  font-family: var(--font-family);
  font-weight: bold;
  font-size: 1em;
  padding: 10px;
  background-color: #4a4a4a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-bottom: 30px;
}

.contact-form button:hover {
  background-color: #0d2d5a;
}

/* Media query for mobile responsiveness */
@media screen and (max-width: 768px) {
  .icon-text-container {
    flex-direction: column;
  }
}
</style>