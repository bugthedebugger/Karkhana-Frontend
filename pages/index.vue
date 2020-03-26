<template>
  <div>
    <!-- <HomeSlider :sliderImages="sliderImages" /> -->

    <HomeCorona />

    <HomeAbout />

    <HomeEvents />

    <HomePartners />

    <HomeContact />

    <Footer />
  </div>
</template>

<script>
// import HomeSlider from "~/components/HomeSlider";
import HomeCorona from "~/components/HomeCorona";
import HomeAbout from "~/components/HomeAbout";
import HomeEvents from "~/components/HomeEvents";
import HomeContact from "~/components/HomeContact";
import HomePartners from "~/components/HomePartners";
import Footer from "~/components/Footer";

export default {
  layout: "portfolio",
  auth: false,
  components: {
    HomeCorona,
    // HomeSlider,
    HomeAbout,
    HomeEvents,
    HomeContact,
    HomePartners,
    Footer
  },
  data() {
    return {
      // slides: []
    };
  },
  created() {
    this.$store.dispatch("home/fetchData");
  },
  computed: {
    sliderImages() {
      return this.$store.getters["home/data"].sliderImages;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/index.scss";
</style>
