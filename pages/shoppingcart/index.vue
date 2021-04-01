<template>
  <div id="app" class="text-grey-darkest relative">
    <header
      class="w-full h-16 bg-indigo-500 text-gray-100 flex justify-between fixed pin-t"
    >
      <div class="pl-4 flex items-center uppercase">Shopping Cart</div>
      <cart-indicator v-if="hasLogin"></cart-indicator>
      <div v-if="!hasLogin" class="flex items-center">
        <NuxtLink to="/shoppingcart/login"> Login </NuxtLink>
      </div>
      <div v-if="!hasLogin" class="flex items-center pr-4">
        <NuxtLink to="/shoppingcart/signup"> Sign up </NuxtLink>
      </div>
    </header>

    <main class="container mx-auto px-4 pt-20">
      <div
        v-if="hasAdvertisement"
        @click="clickAdvert"
        class="w-12/12 pt-6 pb-6 bg-red-400 flex justify-center"
      >
        <div class="text-gray-100">Advertisement</div>
      </div>
      <product-list></product-list>
      <cart></cart>
    </main>

    <footer class="w-full p-8 leading-loose">
      <div
        v-if="hasLogin"
        class="md:text-center text-sm mb-4 flex justify-center"
      >
        <button
          type="button"
          class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-300 hover:bg-blue-500 hover:shadow-lg"
          @click="doLogout"
        >
          Logout
        </button>
      </div>
      <div class="flex justify-center">
        <div class="md:text-center text-sm mb-4">Made by Ian Test</div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasAdvertisement: new Date().getMilliseconds() % 2,
    };
  },
  mounted() {
    console.log("hasAdvertisement:", this.hasAdvertisement);

    mixpanel.track("Enter homepage", {
      hasAdvertisement: this.hasAdvertisement,
    });
    mixpanel.track_links("a", "Left homepage", {
      referrer: document.referrer,
    });
  },
  computed: {
    hasLogin() {
      return this.$store.state.hasLogin;
    },
  },
  methods: {
    doLogout() {
      console.log("logout");
      this.$store.commit("doLogout");
    },
    clickAdvert() {
      console.log("clickAdvert");
      mixpanel.track("Click Advertisement");
    },
  },
};
</script>

<style>
</style>
