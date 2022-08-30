import storage from "../utils/storage";

export default {
  install(Vue) {
    Vue.prototype.$storage = storage;
    Vue.storage = storage;
  },
  $storage: storage,
};

export const $storage = storage;
