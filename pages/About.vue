<template>
  <div>
    <AboutMain
      :head_section="aboutData.head_section"
      :mission_vision="aboutData.mission_vision"
      :values="aboutData.values"
      :karkhana_building="aboutData.karkhana_building"
    />
    <!-- <AboutHistory /> -->
    <AboutTeam :team="aboutData.team" />
    <AboutEmployees :employees="aboutData.employees" />
    <!-- <AboutStats /> -->
    <AboutCareers />
    <Footer />
  </div>
</template>

<script>
import AboutMain from "~/components/AboutMain";
// import AboutHistory from "~/components/AboutHistory";
import AboutTeam from "~/components/AboutTeam";
import AboutEmployees from "~/components/AboutEmployees";
// import AboutStats from "~/components/AboutStats";
import AboutCareers from "~/components/AboutCareers";
import Footer from "~/components/Footer";
import DefaultValue from "~/helpers/default-values";

export default {
  layout: "portfolio",
  auth: false,
  components: {
    // AboutHistory,
    AboutMain,
    AboutTeam,
    AboutEmployees,
    // AboutStats,
    AboutCareers,
    Footer
  },

  async asyncData({ $axios, params, error }) {
    try {
      const response = await $axios.get("/pages/about");
      const aboutData = response.data.data;

      aboutData.employees = (await $axios.get("/team")).data.data;

      // set default values if null
      Object.keys(aboutData).forEach(key => {
        if (!aboutData[key] && DefaultValue.home[key])
          aboutData[key] = DefaultValue.home[key];
      });

      return { aboutData };
    } catch (e) {
      console.log(e);
      error({ statusCode: 404 });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/about.scss";
</style>
