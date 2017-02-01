import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    spec: {}
  },
  actions: {
    FETCH_SPEC: (store, {url}) => {
      return store.commit('SET_SPEC', {spec: {v: 2}});
    }
  },
  mutations: {
    SET_SPEC: (state, {spec}) => {
      state.spec = spec;
    }
  },
  getters: {}
});

export default store;
