import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Plugins from "./plugins";
import "modern-css-reset";
import "./assets/styles/index.scss";

Vue.config.productionTip = false;
Vue.use(Plugins);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
