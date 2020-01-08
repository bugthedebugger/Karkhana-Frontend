<template>
  <div>
    <section class="home-slider">
      <HomeSlider />
    </section>

    <section class="events">
      <div class="container">
        <h1 class="calendar-title">Event Calendar</h1>
        <EventCalendar />
      </div>
    </section>

    <HomePartners />

    <HomeContact />

    <HomeFooter />
  </div>
</template>

<script>
import axios from "axios";
import EventCalendar from "~/components/EventCalendar";
import HomeSlider from "~/components/HomeSlider";
import HomeContact from "~/components/HomeContact";
import HomePartners from "~/components/HomePartners";
import HomeFooter from "~/components/HomeFooter";

export default {
  layout: "portfolio",
  components: {
    EventCalendar,
    HomeSlider,
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
