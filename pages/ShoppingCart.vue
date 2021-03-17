<template>
  <div id="app" class="text-grey-darkest relative">
  <header class="w-full h-16 bg-indigo-500 text-gray-100 flex justify-between fixed pin-t">
    <div class="pl-4 flex items-center uppercase">Shopping Cart</div>
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
export default {}
</script>

<style>
</style>
