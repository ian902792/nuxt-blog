<template>
	<div>
        {{ title }}
    </div>
</template>

<script>
export default {
    /* Both */
    data() {
        return { title: 'footer' };
    },
    /* Client, Vue Hooks */
    mounted() {
        console.info(this.title, this);
    },
}
</script>
