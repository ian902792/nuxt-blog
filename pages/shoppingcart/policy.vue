<template>
  <div class="bg-grey-lighter min-h-screen flex flex-col">
    <div
      class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
    >
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Policy</h1>
      </div>

      <div class="text-grey-dark mt-6">
        Previous Page
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
  mounted() {
    mixpanel.track("Enter policy page");
    mixpanel.track_links(".container a", "Left policy page", {
      referrer: document.referrer,
    });
  },
};
</script>

<style>
</style>
