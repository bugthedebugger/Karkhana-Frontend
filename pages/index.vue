<template>
  <div>
    <HomeSlider />

    <HomeAbout />

    <HomeEvents />

    <HomePartners />

    <HomeContact />

    <HomeFooter />
  </div>
</template>

<script>
import axios from "axios";
import HomeSlider from "~/components/HomeSlider";
import HomeAbout from "~/components/HomeAbout";
import HomeEvents from "~/components/HomeEvents";
import HomeContact from "~/components/HomeContact";
import HomePartners from "~/components/HomePartners";
import HomeFooter from "~/components/HomeFooter";

export default {
  layout: "portfolio",
  components: {
    HomeSlider,
    HomeAbout,
    HomeEvents,
    HomeContact,
    HomePartners,
    HomeFooter
  },
  data() {
    return {
      slickOptions: {
        slidesToShow: 3
        // Any other options that can be got from plugin documentation
      }
    };
  },
  created() {
    // console.log(axios);
  }
};
</script>

<style lang="scss">
@import "@/styles/pages/index.scss";
</style>
