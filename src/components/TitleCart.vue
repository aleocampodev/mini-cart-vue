<template>
  <div>
    <p v-if="$store.state.activeDisplay === 'product'">Mini Market - Product</p>
    <p v-else-if="$store.state.activeDisplay === 'cart'">Mini Market - Cart</p>
    <p v-else>Mini Market - Home</p>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
