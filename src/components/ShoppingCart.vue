<template>
  <div class="shopping-cart">
    <h1>{{ $store.state.cart.length }}</h1>
    <p class="shopping-cart__paragraph">Shopping Cart</p>
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
      <p>$25.50</p>
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
        data-public-key="pub_test_X0zDA9xoKdePzhd8a0x9HAez7HgGO2fH"
        data-currency="COP"
        data-amount-in-cents="${Math.ceil(this.$store.getters.price)}"
        data-reference="4XMPGKWWPKWQ"
      ><\/script>
    <\/form>`;
    },
  },
};
</script>

<style></style>
