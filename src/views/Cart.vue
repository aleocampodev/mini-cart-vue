<template>
  <div class="about">
    <TitleCart />
    <Box />
  </div>
</template>

<script>
import TitleCart from "../components/TitleCart.vue";
import Box from "../components/Box.vue";

export default {
  name: "Cart",
  components: {
    TitleCart,
    Box,
  },
};
</script>
