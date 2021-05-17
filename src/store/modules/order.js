import OrderService from '@/services/orderService.js';

// initial state
// shape: [{ item, quantity, value }, table]
const state = {
  orders: [],
  orderings: [],
  orderId: 0,
  orderData: null,
};

// getters
const getters = {};

// mutations
const mutations = {
  ADD_ORDER_ITEM(state, order) {
    // de bestelling wordt toegevoegd
    state.orders.push({
      order,
    });
  },
  SET_ORDERS(state, orders) {
    state.orders = orders;
  },
  SET_ORDER_ID(state, id) {
    state.orderId = id;
  },
  SET_ORDERDATA(state, order) {
    state.orderData = order;
  },
  SET_ORDERINGS(state, orderings) {
    state.orderings = orderings;
  },
};

// actions
const actions = {
  // Een bestelling toevoegen
  addOrder({ commit, dispatch }, order) {
    OrderService.addOrder(order)
    .then((response) => {
      commit('ADD_ORDER_ITEM', order);
      commit('SET_ORDERDATA', order.order);
      commit('SET_ORDER_ID', response.data.id);
      // Nu ieder item toevoegen met de id van het order
      dispatch('addOrdering');
    })
    .catch(error => {
      console.log('There was an error: ', error.response);
      throw error;
    });
  },

  addOrdering() {
    for (let index = 0; index < state.orderData.length; index++) {
      const order = state.orderData[index];
      OrderService.addOrdering(state.orderId, order)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log('There was an error: ', error.response);
          throw error;
        });
    }
  },

  // Alle orders ophalen
  getOrders({ commit }) {
    OrderService.getOrders()
      // wait for the request to finisch
      .then(response => {
        commit('SET_ORDERS', response.data);
      })
      .catch(error => {
        console.log('There was an error: ', error.response);
      });
  },
  
  getOrderings({ commit }) {
    OrderService.getOrderings()
      // wait for the request to finisch
      .then(response => {
        commit('SET_ORDERINGS', response.data);
      })
      .catch(error => {
        console.log('There was an error: ', error.response);
      });
  },
};

export default {
  namespaced: true, // module namespacing
  state,
  getters,
  mutations,
  actions,
};
