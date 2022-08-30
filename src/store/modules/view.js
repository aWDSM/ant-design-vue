import { CHANGE_LOADING_STATUS } from "../mutations-types";

const state = { loading: false };

const getters = {};

const mutations = {
  [CHANGE_LOADING_STATUS](state, flag) {
    state.loading = flag;
  },
};

const actions = {};

export default { state, mutations, actions, getters, namespaced: true };
