import ClientService from '@/services/clientService.js';

// initial state
// shape: [{ item, quantity, value }, table]
const state = {
  clients: [],
};

// getters
const getters = {
  //
};

// mutations
const mutations = {
  ADD_CLIENT(state, client) {
    state.clients.push(client);
  },
};

// actions
const actions = {
  // Een bestelling toevoegen
  addClient({ commit }, client) {
    ClientService.addClient(client)
    .then((response) => {
      commit('ADD_CLIENT', client);
      console.log(response);
    })
    .catch(error => {
      console.log('There was an error: ', error.response);
      throw error;
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
