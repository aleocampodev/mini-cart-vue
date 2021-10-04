<template>
  <div class="product">
    <h3 class="product__paragraph">Product</h3>
    <div class="product__image">
      <p v-if="$store.getters.selectedProduct.quantity">
        {{ $store.getters.selectedProduct.quantity }}
      </p>
      <div class="product-item">
        <img
          :src="$store.getters.selectedProduct.image"
          :alt="$store.getters.selectedProduct.product"
        />
      </div>
    </div>
    <div class="product__card">
      <div class="product__card-box">
        <div class="product__card-text">
          <p>{{ $store.getters.selectedProduct.product }}</p>
          <p>·</p>
          <p>${{ $store.getters.selectedProduct.price }}</p>
        </div>
        <div class="product__card-buttons">
          <button
            @click="
              () => {
                $store.dispatch('removeItem');
              }
            "
          >
            -
          </button>
          <button
            @click="
              () => {
                $store.dispatch('addItem');
              }
            "
          >
            +
          </button>
        </div>
      </div>
      <p class="product__card-description">
        {{ $store.getters.selectedProduct.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
};
</script>

<style></style>
