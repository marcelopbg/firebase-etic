import Vue from 'vue'
import firebase from 'firebase';
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import Feed from './components/Feed'
import CreateTopic from './components/CreateTopic'
import Topic from './components/Topic'
import Login from './components/Login'
import Register from './components/Register'

Vue.config.productionTip = false
Vue.use(VueRouter);

// Setup Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArBTeTmrm2PCKVnav7YzmdGF6f2U6GuR0",
  authDomain: "e-tic-app.firebaseapp.com",
  databaseURL: "https://e-tic-app.firebaseio.com",
  projectId: "e-tic-app",
  storageBucket: "gs://e-tic-app.appspot.com",
  messagingSenderId: "1945285727",
  appId: "1:1945285727:web:4dccf77d83aae0c08a57ea"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const routes = [
  {path: '/', component: Feed, props: true, name: 'feed' },
  {path: '/topic/create', component: CreateTopic},
  {path: '/topic/:id', props:true, component: Topic, name: 'Topic'},
  {path: '/login', component: Login, name: 'Login' },
  {path: '/register', component: Register, name: 'Register' },

]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

new Vue({
  vuetify,
  router,
  db,
  render: h => h(App)
}).$mount('#app')

// INSTALAR VUE CLI
// CRIAR PROJETO VUE VUE CREATE-MY-APP
// VUE ADD VUETIFY
//npm install vue-router
//configura vue-router
// npm install firebase
