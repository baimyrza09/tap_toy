import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/main.css";
import VueKonva from "vue-konva";
import io from 'socket.io-client'

const socket = io('https://taptoy-server.herokuapp.com', { transports: ['websocket'] })

Vue.prototype.socket = socket

Vue.use(VueKonva);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

