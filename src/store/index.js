import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    orders: [],
  },
  getters: {
    cartItems(state) {
      return state.cart.length;
    },
    cartValue(state) {
      let result = 0;
      for (let index = 0; index < state.cart.length; index++) {
        result += state.cart[index].price;
      }
      return result;
    },
  },
  mutations: {
    ADD_ITEM(state, item) {
      state.cart.push(item);
    },

    REMOVE_ITEM(state, index) {
      state.cart.splice(index, 1);
    },
    ADD_CART_ITEM(state, order) {
      state.orders.push(order);
      console.log(order);
    },
  },
  actions: {
    addItem(context, item) {
      context.commit('ADD_ITEM', item);
    },

    removeItem(context, index) {
      context.commit('REMOVE_ITEM', index);
    },
    checkout(context) {
      context.commit('ADD_CART_ITEM', this.state.cart);
      // Wanneer geslaagd de cart leeg maken
    },
  },
  modules: {},
});
