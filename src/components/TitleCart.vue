<template>
  <div class="title-cart">
    <h2 v-if="$store.state.activeDisplay === 'product'">
      Mini Market · Product
    </h2>
    <h2 v-else-if="$store.state.activeDisplay === 'cart'">
      Mini Market · Cart
    </h2>
    <h2 v-else>Mini Market · Home</h2>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
