<template>
<div class="h-full flex p-2 pr-6">
  <div class="flex flex-col justify-center">
    <p>Subtotal: $ {{ formatPrice(subtotal) }}</p>
  </div>
  <div class="relative h-full">
    <button class="w-24 h-full text-gray-200 -mr-6"
      @click="openCart"
    >
      <img class="w-10 ml-5"
        src="~/assets/img/shopping-cart.svg"
        alt="Carrinho"
      >
      <span
        class="inline-block w-6 bg-red-500 absolute right-0 top-0 rounded-full leading-normal"
        v-if="quantity"
      >
        {{ quantity }}
      </span>
    </button>
  </div>
</div>
</template>

<script>
import priceMixin from '~/mixins/price';

export default {
  name: 'cart-indicator',
  mixins: [priceMixin],
  computed: {
    quantity() {
      return this.$store.getters.totalQuantity;
    },

    subtotal() {
      return this.$store.getters.subtotal;
    },
  },
  methods: {
    openCart() {
      window.scrollTo(0, 0);
      this.$store.commit('openCart');
    },
  },
};
</script>
