<template>
  <article>
          <h1>{{ article.title }}</h1>
    <nuxt-content class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto" :document="article" />
  </article>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const article = await $content('articles', params.slug).fetch()

      return { article }
    }
  }
</script>
