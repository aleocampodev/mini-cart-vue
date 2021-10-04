<template>
  <div class="box">
    <BoxLeft />
    <BoxRight />
  </div>
</template>

<script>
import BoxLeft from "./BoxLeft.vue";
import BoxRight from "./BoxRight.vue";

export default {
  name: "Box",
  components: {
    BoxLeft,
    BoxRight,
  },
};
</script>

<style lang="scss" src="../scss/main.scss"></style>
