import instance from "../fetch/index";

export default {
  install(Vue) {
    Vue.prototype.$http = instance;
    Vue.http = instance;
  },
  $http: instance,
};

export const $http = instance;
