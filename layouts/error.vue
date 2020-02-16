<template>
  <div class="error">
    <div class="container">
      <img src="/images/logo-nav.png" class="k-logo" />
      <br />
      <img src="/images/404.png" class="error-image" />

      <h1 class="error-title">{{error.statusCode}} ERROR</h1>
      <p class="error-subtitle">{{subtitle[error.statusCode]}}</p>
      <nuxt-link to="/" class="btn btn-primary btn-home pl-4 pr-4">Take me back to Homepage</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  data() {
    return {
      subtitle: {
        404: "The page you are looking doesn't exist anymore"
      }
    };
  }
};
</script>

<style lang="scss">
@import "@/styles/layouts/error.scss";
</style>