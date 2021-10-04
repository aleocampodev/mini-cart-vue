import Vue from "vue";
import Vuex from "vuex";
import products from "../../api/products";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products,
    rightPanelState: {
      status: null,
      payload: null,
    },
    cart: [],
    paymentStatus: null,
    activeItem: null,
    activeDisplay: null,
  },
  mutations: {
    selectItem(state, payload) {
      Object.assign(state, payload);
    },
    changeDisplay(state, payload) {
      state.activeDisplay = payload;
    },
    addItem(state, getters) {
      console.log(getters, "estudio");
      const item = { ...getters.selectedProduct, quantity: 1 };
      const isDuplicated =
        state.cart.findIndex((item) => {
          return (
            item.id === (getters.selectedProduct && getters.selectedProduct.id)
          );
        }) > -1;
      if (isDuplicated) {
        const newCart = state.cart.map((item) =>
          item.id === state.activeItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        state.cart = newCart;
      } else {
        state.cart.push(item);
      }
    },
    //changeItemQuantity(state, payload) {},
    deleteItem(state, payload) {
      const newCart = state.cart.filter((item) => {
        item.id !== payload;
      });
      state.cart = newCart;
    },
    showCart(state) {
      Object.assign(state, { activeItem: null, activeDisplay: "cart" });
    },
  },
  actions: {
    addItem({ commit, getters }) {
      console.log(getters, "osa");
      commit("addItem", getters);
    },
  },
  getters: {
    cartValue: (state) => {
      return state.cart.length;
    },
    display(state) {
      return state.activeItem && state.activeItem.id ? "product" : null;
    },
    activeQuantity(state) {
      const findItem = state.cart.find(
        (item) => item.id === (state.activeItem && state.activeItem.id)
      );
      return state.cart.length && findItem ? findItem.quantity : 0;
    },
    newProducts(state) {
      const combinedProducts = state.products.map((item) => {
        const findProduct = state.cart.find(
          (cartItem) => cartItem.id === item.id
        );
        return findProduct ? findProduct : item;
      });
      return combinedProducts;
    },
    selectedProduct(state, getters) {
      return getters.newProducts.find((item) => item.id === state.activeItem);
    },
  },
  modules: {},
});
