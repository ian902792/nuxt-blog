<template>
  <button class="bg-indigo-500 hover:bg-indigo-800 text-gray-100 font-bold rounded"
    @click="emitClickEvent"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    emitClickEvent(e) {
      this.$emit('click', e);
    },
  },
};
</script>
