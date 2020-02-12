<template>
  <div>
    <AboutMain />
    <!-- <AboutHistory /> -->
    <AboutTeam />
    <!-- <AboutEmployees /> -->
    <!-- <AboutStats /> -->
    <!-- <AboutCareers /> -->
    <Footer />
  </div>
</template>

<script>
import AboutMain from "~/components/AboutMain";
// import AboutHistory from "~/components/AboutHistory";
import AboutTeam from "~/components/AboutTeam";
// import AboutEmployees from "~/components/AboutEmployees";
// import AboutStats from "~/components/AboutStats";
// import AboutCareers from "~/components/AboutCareers";
import Footer from "~/components/Footer";
export default {
  layout: "portfolio",
  auth: false,
  components: {
    // AboutHistory,
    AboutMain,
    AboutTeam,
    // AboutEmployees,
    // AboutStats,
    // AboutCareers,
    Footer
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/about.scss";
</style>
