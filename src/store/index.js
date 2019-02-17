import Vue from 'vue';
import Vuex from 'vuex';

import flights from '@/store/modules/flights';
import aircrafts from '@/store/modules/aircrafts';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    flights,
    aircrafts,
  },
});
