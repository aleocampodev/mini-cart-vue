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
      Object.assign(state, payload);
    },
    /*changeDisplay(state, payload) {
      state.activeDisplay = payload;
    }*/
    addItem(state, getters) {
      const item = { ...getters.selectedProduct, quantity: 1 };

      const isDuplicated =
        state.cart.findIndex((item) => {
          return (
            item.id === (getters.selectedProduct && getters.selectedProduct.id)
          );
        }) > -1;
      console.log(isDuplicated, "no se duplique");

      if (isDuplicated) {
        const newCart = state.cart.map((item) =>
          item.id === state.activeItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        state.cart = newCart;
        //console.log(newCart, "ISdUPLICATED");
      } else {
        state.cart.push(item);
      }
    },
    removeItem(state) {
      const selectedItem = state.cart.find((item) => {
        return item.id === state.activeItem;
      });
      //console.log(selectedItem, "item seleccionado");

      const shouldDelete = selectedItem.quantity === 0;
      //console.log(shouldDelete, " deberia eliminar");

      if (shouldDelete) {
        const newCart = state.cart.filter((item) => {
          return item.id === state.activeItem;
        });
        state.cart = newCart;
        //console.log(newCart, "nuevo carro eliminar");
      } else {
        const newCart = state.cart.map((item) =>
          item.id === state.activeItem
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        state.cart = newCart;
        //console.log(newCart, "nuevo carrito");
      }
    },
    showCart(state) {
      Object.assign(state, { activeItem: null, activeDisplay: "cart" });
    },
    /*addToCart(state, payload) {
      state.cart = payload;
    }*/
    removeProduct(state) {
      state.activeDisplay = null;
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
    /*cartValue: (state) => {
      return state.cart.length;
    }*/
    /*display(state) {
      return state.activeItem && state.activeItem.id ? "product" : null;
    }*/
    /*activeQuantity(state) {
      const findItem = state.cart.find(
        (item) => item.id === (state.activeItem && state.activeItem.id)
      );
      return state.cart.length && findItem ? findItem.quantity : 0;
    }*/
    newProducts(state) {
      const combinedProducts = state.products.map((item) => {
        console.log(item, "hola item");
        const findProduct = state.cart.find((cartItem) => {
          console.log(cartItem, "ji");
          return cartItem.id === item.id;
        });
        console.log(findProduct, "encontrar producto");
        return findProduct ? findProduct : item;
      });
      console.log(combinedProducts, "combinar producto");
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
