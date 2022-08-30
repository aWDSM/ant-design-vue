import svg from "./svg";
import fetch from "./fetch";
import antd from "./antd";
import storage from "./storage";

export default {
  install(Vue) {
    Vue.use(svg);
    Vue.use(antd);
    Vue.use(fetch);
    Vue.use(storage);
  },
};
