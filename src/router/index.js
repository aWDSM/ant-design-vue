import Vue from "vue";
import VueRouter from "vue-router";
import storage from "@/utils/storage";
import { Modal } from "ant-design-vue";
import { ACCESS_IS_LOGIN } from "@/common/constant";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  base: process.env.VUE_APP_ROUTE_BASE_URL,
  mode: "hash",
  routes,
});

router.beforeEach((to, _, next) => {
  Modal.destroyAll();
  to.path !== "/login" && storage.get(ACCESS_IS_LOGIN) === "1" ? next("/login") : next();
});

export default router;
