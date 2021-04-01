<template>
  <div class="bg-grey-lighter min-h-screen flex flex-col">
    <div
      class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
    >
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up</h1>
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

        <input
          type="number"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="age"
          placeholder="Age"
          v-model="age"
        />

        <button
          type="submit"
          class="w-full text-center py-3 rounded bg-green-500 bg-green text-white hover:bg-green-700 focus:outline-none my-1"
          @click="signUp"
        >
          Create Account
        </button>

        <div class="text-center text-sm text-grey-dark mt-4">
          By signing up, you agree to the
          <NuxtLink
            to="/shoppingcart/policy"
            class="no-underline border-b border-grey-dark text-grey-dark"
          >
            Terms of Service
          </NuxtLink>
          and
          <NuxtLink
            to="/shoppingcart/policy"
            class="no-underline border-b border-grey-dark text-grey-dark"
          >
            Privacy Policy
          </NuxtLink>
        </div>
      </div>

      <div class="text-grey-dark mt-6">
        Already have an account?
        <NuxtLink
          to="/shoppingcart/login"
          class="no-underline border-b border-blue text-blue"
        >
          Log in.
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
      age: null,
    };
  },
  mounted() {
    mixpanel.track("Enter Sign up page");
    mixpanel.track_links(".container a", "click link", {
      referrer: document.referrer,
    });
  },
  methods: {
    signUp() {
      console.log("signup");

      if (this.email != "" && this.loginName != "" && this.age != null) {
        var self = this;
        mixpanel.track("Registered", { Name: self.loginName, Age: this.age });

        // identify anonymous user
        mixpanel.alias(self.loginName);

        mixpanel.identify(self.loginName);

        // super properties
        mixpanel.register({
          Name: self.loginName,
          Age: self.age,
        });

        mixpanel.people.set({
          $email: self.email, // only reserved properties need the $
          "Sign up date": new Date().toISOString(), // Send dates in ISO timestamp format (e.g. "2020-01-02T21:07:03Z")
          USER_ID: self.loginName, // use human-readable names
          Credits: 100, // ...or numbers
          Age: self.age,
        });

        this.$store.commit("doLogin", self.loginName);
        this.$router.push("/shoppingcart");
      }
    },
  },
};
</script>

<style>
</style>
