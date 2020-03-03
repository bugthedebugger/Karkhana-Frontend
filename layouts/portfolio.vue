<template>
  <div class="portfolio">
    <!-- <img src="/images/under-construction.svg" class="under-construction" /> -->
    <!-- <div id="debug" ref="debug"></div> -->
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
export default {
  components: { Navbar },
  mounted() {
    if (process.client) {
      // show key value for mobile
      // $(window).resize(() => {
      //   this.$refs.debug.innerHTML = `
      //     Height: ${$(window).height()},
      //     <br>
      //     Width: ${$(window).width()}
      //   `;
      // });
      // this.$refs.debug.innerHTML = `
      //     Height: ${$(window).height()},
      //     <br>
      //     Width: ${$(window).width()}
      //   `;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/layouts/portfolio.scss";
</style>
