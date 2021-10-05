import Vue from "vue";
import Vuex from "vuex";
import products from "../../api/products";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products,
    cart: [],
    activeItem: null,
    activeDisplay: null,
  },
  mutations: {
    selectItem(state, payload) {
      console.log(state, "hola estado ");
      Object.assign(state, payload);
    },
    changeDisplay(state, payload) {
      state.activeDisplay = payload;
    },
    addItem(state, getters) {
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
    removeItem(state) {
      const selectedItem = state.cart.find((item) => {
        return item.id === state.activeItem;
      });
      console.log(selectedItem, "item seleccionado");

      const shouldDelete = selectedItem.quantity === 0;
      console.log(shouldDelete, "eliminar");

      if (shouldDelete) {
        const newCart = state.cart.filter((item) => {
          return item.id === state.activeItem;
        });
        state.cart = newCart;
      } else {
        const newCart = state.cart.map((item) =>
          item.id === state.activeItem
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        state.cart = newCart;
        console.log(newCart, "nuevo carrito");
      }
    },
    showCart(state) {
      Object.assign(state, { activeItem: null, activeDisplay: "cart" });
    },
    addToCart(state, payload) {
      state.cart = payload;
    },
  },
  actions: {
    addItem({ commit, getters, dispatch }) {
      commit("addItem", getters);
      dispatch("saveLocal");
    },
    removeItem({ commit, getters, dispatch }) {
      console.log(getters);
      commit("removeItem", getters);
      dispatch("saveLocal");
    },
    saveLocal({ state }) {
      const stateCart = JSON.stringify(state.cart);
      localStorage.setItem("cart", stateCart);
    },
    getLocal({ commit }) {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        commit("addToCart", JSON.parse(localCart));
      }
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
      console.log(findItem, "encontrar item");
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
    price(state) {
      return state.cart.reduce((acc, itemCart) => {
        return itemCart.quantity * itemCart.price + acc;
      }, 0);
    },
  },
  modules: {},
});
