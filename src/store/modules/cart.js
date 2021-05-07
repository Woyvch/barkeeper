// initial state
// shape: [{ item, quantity, value }]
const state = {
  items: [],
};

// getters
const getters = {
  cartItems(state) {
    let quantity = 0;
    if(state.items.length > 0){
      state.items.forEach(item => {
        quantity += item.quantity;
      });
    }
    return quantity;
  },
  
  cartValue(state) {
    let value = 0;
    for (let index = 0; index < state.items.length; index++) {
      value = value + state.items[index].item.price * state.items[index].quantity;
    }
    return value.toFixed(2);
  },
};

// mutations
const mutations = {
  ADD_ITEM_TO_CART(state, item) {
    state.items.push({
      item,
      quantity: 1,
      value: item.price,
    });
  },

  INCREMENT_ITEM_QUANTITY(state, index) {
    //console.log(index);
    const cartItem = state.items[index];
    //console.log(cartItem);
    cartItem.quantity++;
    // floating point is niet altijd 100% juist, daarom vermenigvuldigen en delen
    cartItem.value = (cartItem.value * 10 + cartItem.item.price * 10) / 10;
  },

  DECREMENT_ITEM_QUANTITY(state, index) {
    const cartItem = state.items[index];
    cartItem.quantity--;
    cartItem.value = (cartItem.value * 10 - cartItem.item.price * 10) / 10;
  },

  REMOVE_ITEM_FROM_CART(state, index) {
    state.items.splice(index, 1);
  },

  CLEAR_CART_ITEMS(state) {
    state.items = [];
  },
};

// actions
const actions = {
  addItem({ commit }, product) {
    let cartItem;
    let cartIndex;
    // Controleer of er al een zo een item in de cart zit
    for (let index = 0; index < state.items.length; index++) {
      if(state.items[index].item.id === product.id) {
        cartItem = state.items[index].item;
        cartIndex = index;
      }
    }
    if (!cartItem) {
      // Zo niet, voeg het item toe aan de cart
      commit('ADD_ITEM_TO_CART', product);
    } else {
      // Indien al aanwezig, verhoog het aantal met 1
      commit('INCREMENT_ITEM_QUANTITY', cartIndex);
    }
  },

  incrementItemQuantity({ commit }, index) {
    commit('INCREMENT_ITEM_QUANTITY', index);
  },

  decrementItemQuantity({ commit }, index) {
    commit('DECREMENT_ITEM_QUANTITY', index);
  },

  removeItem(context, index) {
    context.commit('REMOVE_ITEM_FROM_CART', index);
  },

  clearCartItems({ commit }) {
    commit('CLEAR_CART_ITEMS');
  },
};

export default {
  namespaced: true, // module namespacing
  state,
  getters,
  mutations,
  actions,
};
