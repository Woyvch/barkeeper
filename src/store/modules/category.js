import CategoriesService from '@/services/categoriesService.js';

//export const namespaced = true; // module namespacing

const state = {
  categories: [],
  catNames: [],
};

const getters = {
  getNameById: state => id => {
    return state.categories.find(category => category.id === id);
  }
};

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  ADD_CATEGORY(state, category) {
    // add the category lo the local repository
    state.categories.push(category);
  },
  SET_CAT_NAMES(state, catnames) {
    catnames.forEach(catname => {
      state.catNames.push(catname.name);
    });
  },
  EDIT_CATEGORY(state, category) {
    let pos = state.categories.indexOf(category.id);
    state.categories[pos] = category;
  },
  DELETE_CATEGORY(state, categoryId) {
    state.categories.splice(categoryId, 1);
  },
};

const actions = {
  // Alle categorieën ophalen
  getCategories({ commit }) {
    CategoriesService.getCategories()
      // wait for the request to finisch
      .then(response => {
        commit('SET_CATEGORIES', response.data);
      })
      .catch(error => {
        console.log('There was an error: ', error.response);
      });
  },
  // Enkel de categorienamen ophalen
  getCatNames({ commit }) {
    CategoriesService.getCatNames()
      // wait for the request to finisch
      .then(response => {
        commit('SET_CAT_NAMES', response.data);
      })
      .catch(error => {
        console.log('There was an error: ', error.response);
      });
  },
  // Categorie toevoegen
  addCategory({ commit }, category) {
    CategoriesService.postCategory(category)
      .then(response => {
        commit('ADD_CATEGORY', response.data);
        console.log('succes: ', response);
      })
      .catch(error => {
        console.log('There was an error: ', error.response);
        throw error;
      });
  },
  // Categorie wijzigen
  editCategory({ commit }, category) {
    CategoriesService.putCategory(category)
      .then(response => {
        commit('EDIT_CATEGORY', response.data);
        console.log('succes: ', response.data);
      })
      .catch(error => {
        console.log('There was an error: ', error.response);
        throw error;
      });
  },
  // Categorie verwijderen
  deleteCategory({ commit }, category) {
    CategoriesService.deleteCategory(category)
      .then(response => {
        commit('DELETE_CATEGORY', category);
        console.log('succes: ', response);
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
