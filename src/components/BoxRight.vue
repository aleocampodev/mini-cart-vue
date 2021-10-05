<template>
  <div class="box-right">
    <div class="box-right__icon-cart">
      <button
        @click="
          () => {
            $store.commit('showCart');
          }
        "
        :class="
          $store.state.activeDisplay === 'cart'
            ? 'button-cart'
            : 'box-right__button-cart'
        "
      >
        <span class="material-icons">shopping_cart</span>
        <span>${{ $store.getters.price }}</span>
      </button>
      <button
        class="box-right__button-remove"
        v-if="$store.state.activeDisplay === 'cart'"
        @click="
          () => {
            $store.dispatch('removeItem');
          }
        "
      >
        x
      </button>
    </div>
    <div
      class="box-right__paragraph"
      v-if="$store.state.activeDisplay === null"
    >
      <p>Please choose a product on the left</p>
    </div>
    <Product v-if="$store.state.activeDisplay === 'product'" />
    <ShoppingCart v-if="$store.state.activeDisplay === 'cart'" />
  </div>
</template>

<script>
import Product from "../components/Product.vue";
import ShoppingCart from "../components/ShoppingCart.vue";

export default {
  components: { ShoppingCart, Product },
  name: "BoxRight",
};
</script>

<style lang="scss" src="../scss/main.scss"></style>
