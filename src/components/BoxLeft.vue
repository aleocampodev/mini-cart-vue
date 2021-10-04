<template>
  <div class="box-left">
    <div class="box-left__icon">
      <span class="material-icons">shopping_bag</span>
    </div>
    <div class="box-left__store">
      <h3 class="box-left__store-paragraph">Store</h3>
      <div class="box-left__store-wrapper">
        <div
          class="card"
          :class="
            product.id ===
            ($store.state.activeItem && $store.state.activeItem.id)
              ? 'card--active'
              : ''
          "
          v-for="product in $store.getters.newProducts"
          :key="product.id"
        >
          <div class="box-number" v-if="product.quantity">
            {{ product.quantity }}
          </div>
          <img :src="product.image" alt="chocolisto" />
          <button
            @click="
              () => {
                $store.commit('selectItem', {
                  activeItem: product.id,
                  activeDisplay: 'product',
                });
              }
            "
          >
            {{ product.price }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoxLeft",
  computed: {},
};
</script>

<style lang="scss"></style>
