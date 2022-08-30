import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  base: process.env.VUE_APP_ROUTE_BASE_URL,
  mode: "hash",
  routes,
});

export default router;
