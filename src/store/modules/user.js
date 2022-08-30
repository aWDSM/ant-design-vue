import router from "@/router";
import storage from "@/utils/storage";
import { CHANGE_USER_INFO } from "../mutations-types";

const state = { nameCn: "", userHeadImg: "" };

const getters = {};

const mutations = {
  [CHANGE_USER_INFO](state, info) {
    Object.keys(info).forEach(
      (key) => Object.prototype.hasOwnProperty.call(state, key) && (state[key] = info[key])
    );
  },
};

const actions = {
  logout() {
    storage.removeAll();
    router.replace("/login");
  },
};

export default { state, mutations, actions, getters, namespaced: true };
