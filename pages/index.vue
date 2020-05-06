<template>
  <div>
    <HomeSlider :sliderImages="landingData.sliders" />

    <!-- <HomeCorona /> -->

    <HomeAbout :aboutData="landingData.about" :stats="landingData.stats" />

    <HomeEvents />

    <HomePartners :partnersData="landingData.partners" />

    <HomeContact :phone="landingData.phone" :mobile="landingData.mobile" />

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
import DefaultValue from "~/helpers/default-values";

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

  async asyncData({ $axios, query, error, redirect, route }) {
    if (!query.lang) redirect({ path: "/", query: { lang: "en" } });
    try {
      $axios.setHeader("Accept-Language", query.lang);
      const response = await $axios.get("/pages/landing");
      const landingData = response.data.data;

      // fetch partners

      // set default values if null
      Object.keys(landingData).forEach(key => {
        if (!landingData[key] && DefaultValue.home[key])
          landingData[key] = DefaultValue.home[key];
      });

      return { landingData };
    } catch (e) {
      console.log(e);
      error({ statusCode: 404 });
    }
  },

  watchQuery: ["lang"],

  data() {
    return {};
  },
  created() {
    // this.$store.dispatch("home/fetchData");
  },

  methods: {
    getDefaultSliderImages() {
      return [
        {
          quote: "Makers Today, Shapers of Tomorrow.",
          path: "/images/slider-image-1.jpg",
          button: {
            label: "Discover classes",
            action: ""
          }
        },

        {
          quote: "The hands are the gateway to the mind.",
          path: "/images/slider-image-2.jpg",
          button: {
            label: "Find More",
            action: ""
          }
        },

        {
          quote: "The world is malleable. We give you the tools to reshape it.",
          path: "/images/slider-image-3.jpg",
          button: {
            label: "Get Started",
            action: ""
          }
        },

        {
          quote: "We design learning experiences.",
          path: "/images/slider-image-4.jpg",
          button: {
            label: "Find More",
            action: ""
          }
        }
      ];
    }
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
