<template>
  <div class="bg-grey-lighter min-h-screen flex flex-col">
    <div
      class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
    >
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <!-- <h1 class="mb-8 text-3xl text-center">Login</h1> -->
        <input
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="fullname"
          placeholder="Full Name"
          v-model="loginName"
        />

        <input
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="email"
          placeholder="Email"
          v-model="email"
        />

        <button
          type="submit"
          class="w-full text-center py-3 rounded bg-green-500 bg-green text-white hover:bg-green-700 focus:outline-none my-1"
          @click="doLogin"
        >
          Login
        </button>
      </div>

      <div class="text-grey-dark mt-6">
        Don't have an account?
        <NuxtLink
          to="/shoppingcart/signup"
          class="no-underline border-b border-blue text-blue"
        >
          Sign up.
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginName: "",
      email: "",
    };
  },
  mounted() {
    mixpanel.track("Enter loign page");
    mixpanel.track_links(".container a", "Left login page", {
      referrer: document.referrer,
    });
  },
  methods: {
    doLogin() {
      console.log("login");

      if (this.email != "" && this.loginName != "") {
        var self = this;
        mixpanel.alias(self.loginName); // identify anonymous user
        mixpanel.identify(self.loginName);
        mixpanel.people.set({
          $email: self.email, // only reserved properties need the $
          "Sign up date": new Date().toISOString(), // Send dates in ISO timestamp format (e.g. "2020-01-02T21:07:03Z")
          USER_ID: self.loginName, // use human-readable names
          credits: 150, // ...or numbers
        });

        var self = this;

        // identify anonymous user
        mixpanel.alias(self.loginName);

        mixpanel.identify(self.loginName);

        // super properties
        mixpanel.register({
          Name: self.loginName,
        });

        mixpanel.people.set({
          $email: self.email, // only reserved properties need the $
          "Sign up date": new Date().toISOString(), // Send dates in ISO timestamp format (e.g. "2020-01-02T21:07:03Z")
          USER_ID: self.loginName, // use human-readable names
          Credits: 100, // ...or numbers
        });

        this.$store.commit("doLogin", self.loginName);

        // simulate data processed
        setTimeout(() => {
          this.$router.push("/shoppingcart");
        }, 2000);
      }
    },
  },
};
</script>

<style>
</style>
