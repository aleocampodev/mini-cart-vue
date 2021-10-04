<template>
  <div class="shopping-cart">
    <h3 class="shopping-cart__paragraph">Shopping Cart</h3>
    <div
      class="shopping-cart__image"
      v-for="item in $store.state.cart"
      :key="item.id"
    >
      <p>{{ item.quantity }}</p>
      <img :src="item.image" />
    </div>
    <div class="shopping-cart__price">
      <p>Total:</p>
      <p>${{ Math.round($store.getters.price) }}</p>
    </div>
    <div id="button"></div>
  </div>
</template>

<script>
import postscribe from "postscribe";

export default {
  data() {
    return {};
  },
  mounted() {
    postscribe("#button", this.script);
  },
  computed: {
    script() {
      return `<form>
      <script
        src="https://checkout.wompi.co/widget.js"
        data-render="button"
        data-public-key="pub_test_R1VZFXUauA9n7oMEsisu4h1pbVYXkDWB"
        data-currency="COP"
        data-amount-in-cents="${Math.round(this.$store.getters.price)}"
        data-reference="4XMPGKWWPKWQ"
      ><\/script>
    <\/form>`;
    },
  },
};
</script>

<style></style>
