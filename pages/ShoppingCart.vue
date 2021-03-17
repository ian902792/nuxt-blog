<template>
  <div id="app" class="text-grey-darkest relative">
  <header class="w-full h-16 bg-indigo-500 text-gray-100 flex justify-between fixed pin-t">
    <div class="pl-4 flex items-center uppercase">Shopping Cart</div>
    <div v-if="hasLogin" class="flex items-center" >
      Hello~ {{loginName}}
    </div>
    <div v-else class="flex items-center" >
      <!-- Need Login -->
      <span class="mr-2">Login Name: </span>
      <input type="text" name="loginName" v-model="loginName" class="text-gray-400"/>
      <span class="ml-2 mr-2">Email: </span>
      <input type="text" name="email" v-model="email" class="text-gray-400" />
      <button class="bg-yellow-600 ml-2 rounded-md pl-2 pr-2" @click="doLogin">Login</button>
    </div>
    <cart-indicator></cart-indicator>
  </header>
  <main class="container mx-auto px-4 pt-20">
    <product-list></product-list>
    <cart></cart>
  </main>
  <footer class="w-full p-8 leading-loose">
    <div class="md:text-center text-sm mb-8">
      Made by Ian Test
    </div>
  </footer>
</div>
</template>

<script>
export default {
  data() {
    return {
      hasLogin: false,
      loginName: '',
      email:'',
    };
  },
  methods: {
    doLogin() {
      console.log("login");
      if(this.email != '' && this.loginName != ''){
        var self = this;
        mixpanel.identify(self.loginName);
        mixpanel.people.set({
          "$email": self.email,    // only reserved properties need the $
          "Sign up date": (new Date()).toISOString(),    // Send dates in ISO timestamp format (e.g. "2020-01-02T21:07:03Z")
          "USER_ID": self.loginName,    // use human-readable names
          "credits": 150    // ...or numbers
        });

        this.hasLogin = true;
      }

    }
  }
}
</script>

<style>
</style>
