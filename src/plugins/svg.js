import SvgIcon from "@/components/svg/index.vue";

export default {
  install(Vue) {
    const req = require.context("@/assets/icons/", false, /\.svg$/);
    Vue.component("SvgIcon", SvgIcon);
    req.keys().forEach(req);
  },
};
