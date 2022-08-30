import Vue from "vue";
import Vuex, { createLogger } from "vuex";
import VuexPersistence from "vuex-persist";
import { KEY_PREFIX } from "@/utils/storage";

import modules from "./modules";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  key: `${KEY_PREFIX}VUEX_LOCAL`,
});

const store = new Vuex.Store({
  modules,
  plugins: [createLogger(), vuexLocal.plugin],
});
store.$initState = JSON.parse(JSON.stringify(store.state));

export default store;
