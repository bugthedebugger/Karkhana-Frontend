<template>
  <div>
    <AboutMain />
    <AboutHistory />
    <AboutTeam />
    <AboutEmployees />
  </div>
</template>

<script>
import AboutMain from "~/components/AboutMain";
import AboutHistory from "~/components/AboutHistory";
import AboutTeam from "~/components/AboutTeam";
import AboutEmployees from "~/components/AboutEmployees";
export default {
  layout: "portfolio",
  components: {
    AboutHistory,
    AboutMain,
    AboutTeam,
    AboutEmployees
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/about.scss";
</style>
