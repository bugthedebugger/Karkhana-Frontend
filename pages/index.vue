<template>
  <div>
    <section class="home-slider">
      <HomeSlider />
    </section>

    <section class="events">
      <div class="container">
        <EventCalendar />
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import EventCalendar from "~/components/EventCalendar";
import HomeSlider from "~/components/HomeSlider";
export default {
  layout: "portfolio",
  components: { EventCalendar, HomeSlider },
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
