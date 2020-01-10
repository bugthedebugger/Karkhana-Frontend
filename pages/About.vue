<template>
  <div>
    <AboutMain />
    <AboutHistory />
  </div>
</template>

<script>
import AboutMain from "~/components/AboutMain";
import AboutHistory from "~/components/AboutHistory";
export default {
  layout: "portfolio",
  components: {
    AboutHistory,
    AboutMain
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/about.scss";
</style>
