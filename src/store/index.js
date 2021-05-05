import Vue from 'vue';
import Vuex from 'vuex';
//Modules
import * as category from '@/store/modules/category.js';
import * as drink from '@/store/modules/drink.js';
import cart from '@/store/modules/cart.js';
import order from '@/store/modules/order.js';
import client from '@/store/modules/client.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    table: '', // het nummer van de tafel
  },
  // Getters
  getters: {
    tableNr(state) {
      return state.table;
    },
  },
  // Mutations
  mutations: {
    SET_TABLE(state, table) {
      state.table = table;
      sessionStorage.setItem('table', table);
    },
  },
  // Actions
  actions: {
    setTable({ commit }, table) {
      commit('SET_TABLE', table);
    },
  },
  // Modules
  modules: {
    category,
    drink,
    cart,
    order,
    client,
  },

});
