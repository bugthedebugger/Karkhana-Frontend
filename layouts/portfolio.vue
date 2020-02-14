<template>
  <div>
    <img src="/images/under-construction.svg" class="under-construction" />
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
export default {
  components: { Navbar }
};
</script>

<style lang="scss">
@import "@/styles/layouts/portfolio.scss";
</style>
