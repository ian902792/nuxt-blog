<template>
  <div
    v-if="isOpen"
    class="absolute right-0 top-0 w-full h-full md:w-4/5 lg:w-3/5 bg-gray-700 text-gray-200 p-8 flex flex-col shadow-lg"
  >
    <div class="relative mb-8">
      <img
        class="w-6 mr-4 inline-block"
        src="~/assets/img/shopping-cart.svg"
        alt="Carrinho"
      />
      <button class="absolute right-0" @click="closeCart">
        <img class="w-6" src="~/assets/img/close.svg" alt="Fechar" />
      </button>
    </div>
    <div class="flex-1" v-if="productsAdded.length">
      <table class="w-full text-sm md:text-base" cellspacing="0">
        <thead>
          <tr class="h-12 uppercase">
            <th class="hidden md:table-cell"></th>
            <th class="text-left">Product</th>
            <th class="text-right">
              <span class="lg:hidden" title="Quantity">Qty</span>
              <span class="hidden lg:inline">Quantity</span>
            </th>
            <th class="text-right hidden md:table-cell">Price unit</th>
            <th class="text-right">Price total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order" :key="item.product.id" class="h-24">
            <td class="w-24 hidden md:table-cell">
              <img
                :src="`https://via.placeholder.com/50/${item.product.image}`"
                alt="Thumbnail"
              />
            </td>
            <td>
              <p class="mb-2">{{ item.product.title }}</p>
              <button
                class="text-grey-lighter"
                @click="removeItem(item.product.id)"
              >
                <small>(Remover item)</small>
              </button>
            </td>
            <td class="text-right">
              {{ item.quantity }}
            </td>
            <td class="text-right hidden md:table-cell">
              $ {{ formatPrice(item.product.price) }}
            </td>
            <td class="text-right">
              $ {{ formatPrice(item.product.price * item.quantity) }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="h-24">
            <td class="hidden md:table-cell"></td>
            <td class="border-t"></td>
            <td class="border-t hidden md:table-cell"></td>
            <th class="text-right border-t uppercase">Subtotal</th>
            <td class="text-right border-t">$ {{ formatPrice(subtotal) }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="flex justify-center">
        <div>
          <button
            type="button"
            class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
            @click="buy"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
    <p v-else>Your shopping cart is empty.</p>
  </div>
</template>

<script>
import priceMixin from "~/mixins/price";

export default {
  name: "cart",
  mixins: [priceMixin],
  computed: {
    isOpen() {
      return this.$store.state.cartIsOpen;
    },

    productsAdded() {
      return this.$store.state.productsAdded;
    },

    order() {
      return this.$store.getters.order;
    },

    subtotal() {
      return this.$store.getters.subtotal;
    },
  },
  methods: {
    closeCart() {
      this.$store.commit("closeCart");
    },

    removeItem(id) {
      this.$store.commit("removeItem", id);
    },

    buy() {
      this.$store.commit("buyAll");
    },
  },
};
</script>
