<template>
  <div class="careers">
    <CareersMain />
    <CareersOpenings />
    <Footer />
  </div>
</template>

<script>
import CareersMain from "~/components/CareersMain";
import CareersOpenings from "~/components/CareersOpenings";
import Footer from "~/components/Footer";

export default {
  layout: "portfolio",
  auth: false,
  components: { CareersMain, CareersOpenings, Footer }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/careers.scss";
</style>
