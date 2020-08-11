import Vue from "vue";
import App from "./index.vue";
// import router from "./router.js";
// import store from "./store";

Vue.config.productionTip = false;
document.title = '页面A'

new Vue({
  // router,
  // store,
  render: h => h(App)
}).$mount("#app");
