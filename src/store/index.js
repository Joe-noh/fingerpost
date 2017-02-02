import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    spec: {}
  },
  actions: {
    FETCH_SPEC: ({commit}, {url}) => {
      return axios.get(url).then(res => {
        commit('SET_SPEC', {spec: res.data});
      });
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
