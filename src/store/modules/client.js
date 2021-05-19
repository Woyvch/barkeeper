import ClientService from '@/services/clientService.js';

// initial state
// shape: [{ id, name, phone, email, table, datetime }]
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
  SET_CLIENTS(state, clients) {
    state.clients = clients;
  },
};

// actions
const actions = {
  // Een klant toevoegen
  addClient({ commit }, client) {
    ClientService.addClient(client)
    .then(() => {
      commit('ADD_CLIENT', client);
      //console.log(response);
    })
    .catch(error => {
      console.log('There was an error: ', error.response);
      throw error;
    });
  },
  // Alle klanten ophalen
  getClients({ commit }) {
    ClientService.getClients()
      // wait for the request to finisch
      .then(response => {
        commit('SET_CLIENTS', response.data);
        //console.log(response.data);
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
