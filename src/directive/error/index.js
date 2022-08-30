import error from "./error";

const install = function (Vue) {
  Vue.directive("error", error);
};

if (window.Vue) {
  window.$error = error;
  window.Vue.use(install);
}

error.install = install;
export default error;
