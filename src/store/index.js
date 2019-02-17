import Vue from 'vue';
import Vuex from 'vuex';

import flights from '@/store/modules/flights';
import aircrafts from '@/store/modules/aircrafts';

Vue.use(Vuex);

export const options = {
  state: {
    activeAircraft: {},
  },
  getters: {
    activeAircraft: state => state.activeAircraft,
  },
  mutations: {
    setActiveAircraft(state, aircraft) {
      state.activeAircraft = aircraft;
    },
  },
  actions: {
    setActiveAircraft({ commit }, aircraft) {
      commit('setActiveAircraft', aircraft);
    },
  },
  modules: {
    flights,
    aircrafts,
  },
};

export default new Vuex.Store(options);
