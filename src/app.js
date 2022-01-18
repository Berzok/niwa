/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
// import './styles/app.css';

// start the Stimulus application
//import './bootstrap';

import App from './App.vue';
import {createApp} from 'vue';
import configureHTTPInterceptor from './config/configureHTTPInterceptor';
import router from './router';


import Toast from 'vue-toastification';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

//Bootstrap and bootswatch
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/darkly/bootstrap.min.css';

//Import fontawesome for the icons
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import the notification CSS or use your own!
import 'vue-toastification/dist/index.css';

//All from primevue
import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css';
import 'primevue/resources/primevue.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/md-dark-deeppurple/theme.css';
// import 'primevue/resources/themes/arya-green/theme.css';

//Import tsParticles
import Particles from "particles.vue3";

//PDF.js



//Custom css
import './styles/app.css';


const toastOptions = {
    // You can set your default options here
    // see : https://www.npmjs.com/package/vue3-toast-single
};

configureHTTPInterceptor();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


createApp(App)
    .use(Toast, toastOptions)
    .use(router)
    .use(PrimeVue)
    .use(Particles)
    .use(pinia)
    .mount('#app');
