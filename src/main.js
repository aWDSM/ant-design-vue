import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Plugins from "./plugins";
import directive from "./directive";
import "modern-css-reset";
import "./assets/styles/index.scss";

Vue.use(Plugins);
Vue.use(directive);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
