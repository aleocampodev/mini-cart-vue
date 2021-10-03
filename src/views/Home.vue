<template>
  <div class="home">
    <TitleHome msg="Bienvenido a Mini cart" />
    <div id="nav">
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TitleHome from "@/components/TitleHome.vue";

export default {
  name: "Home",
  components: {
    TitleHome,
  },
};
</script>

<style lang="scss" src="../scss/main.scss"></style>
