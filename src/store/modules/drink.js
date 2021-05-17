import DrinksService from '@/services/drinksService.js';

const state = {
  drinks: [],
  categoryDrinks: [], //obselete?
};

const getters = {
  drinksCount(state) {
    return state.drinks.length;
  },
};

const mutations = {
  SET_DRINKS(state, drinks) {
    state.drinks = drinks;
  },
  ADD_DRINK(state, drink) {
    // add to the local repository
    state.drinks.push(drink);
  },
  DELETE_DRINK(state, drinkId) {
    state.drinks.splice(drinkId, 1);
  },
  PUT_DRINK(state, drink) {
    let pos = state.drinks.indexOf(drink.id);
    state.drinks[pos] = drink;
  },
  SET_CATEGORY_DRINKS(state, category) {
    state.categoryDrinks = category;
  }
};

const actions = {
  getDrinks({ commit }) {
    DrinksService.getDrinks()
      // wait for the request to finisch
      .then(response => {
        commit('SET_DRINKS', response.data);
      })
      .catch(error => {
        console.log('There was an error: ', error.response);
      });
  },
  addDrink({ commit }, drink) {
    DrinksService.postDrink(drink)
      .then(response => {
        commit('ADD_DRINK', response.data);
        //console.log('succes: ', response.data);
      })
      .catch(error => {
        console.log('There was an error: ', error.response);
        throw error;
      });
  },
  deleteDrink({ commit }, drink) {
    DrinksService.deleteDrink(drink)
      .then(() => {
        commit('DELETE_DRINK', drink);
        //console.log('succes: ', response);
      })
      .catch(error => {
        console.log('There was an error: ', error.response);
        throw error;
      });
  },
  editDrink({ commit }, drink) {
    DrinksService.putDrink(drink)
    .then(response => {
      commit('PUT_DRINK', response.data);
      //console.log('succes: ', response.data);
    })
    .catch(error => {
      console.log('There was an error: ', error.response);
      throw error;
    });
  },
  getCategoryDrinks({ commit }, category) {
    DrinksService.getCategoryDrinks(category)
    .then(response => {
      commit('SET_CATEGORY_DRINKS', response.data);
      //console.log('succes: ', response.data);
    })
    .catch(error => {
      console.log('There was an error: ', error.response);
      throw error;
    });
  }
};

export default {
  namespaced: true, // module namespacing
  state,
  getters,
  mutations,
  actions,
};
