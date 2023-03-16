import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser,faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons'
import { initializeApp } from "firebase/app";
import "./assets/tailwind.css"

const firebaseConfig = {
    apiKey: "AIzaSyBlr1oT42dCsUOH13fFp0ujGgvWpM-1szY",
    authDomain: "kontra-sports-d44fb.firebaseapp.com",
    projectId: "kontra-sports-d44fb",
    storageBucket: "kontra-sports-d44fb.appspot.com",
    messagingSenderId: "713919786025",
    appId: "1:713919786025:web:1b23037934eeaaabae8038",
    measurementId: "G-K0CLPSNXT9"
  };
initializeApp(firebaseConfig);

library.add(faUser,faPhone,faEnvelope,faSquareInstagram);

const app = createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
