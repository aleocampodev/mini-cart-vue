<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getLocal");
  },
};
</script>
<style lang="scss" src="./scss/main.scss"></style>
