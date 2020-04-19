<template>
  <div>
    <HomeSlider :sliderImages="landingData.sliders" />

    <!-- <HomeCorona /> -->

    <HomeAbout
      v-if="landingData.about && landingData.stats"
      :aboutData="landingData.about"
      :stats="landingData.stats"
    />

    <HomeEvents />

    <HomePartners v-if="landingData.partners" :partnersData="landingData.partners" />

    <HomeContact />

    <Footer />
  </div>
</template>

<script>
import HomeSlider from "~/components/HomeSlider";
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
    HomeSlider,
    HomeAbout,
    HomeEvents,
    HomeContact,
    HomePartners,
    Footer
  },

  async asyncData({ $axios, params, error }) {
    try {
      const response = await $axios.get("/pages/landing");
      console.log(response.data.data);
      return { landingData: response.data.data };
    } catch (e) {
      error({ statusCode: 404 });
    }
  },

  data() {
    return {};
  },
  created() {
    this.$store.dispatch("home/fetchData");
  },
  computed: {
    // sliderImages() {
    //   return this.$store.getters["home/data"].sliderImages;
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/index.scss";
</style>
