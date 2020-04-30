<template>
  <section class="about-team">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="title d-none d-md-block">{{vod(team.title, dv.title)}}</h1>
        </div>
      </div>
    </div>

    <div
      class="team-image"
      :style="'background-image: url(' + vod(team.team_photo.path, dv.team_photo.path) + ')'"
    >
      <div class="team-info">
        <h1 class="title">{{vod(team.sub_title, dv.sub_title)}}</h1>
        <p class="subtitle d-none d-md-block">{{vod(team.sub_text, dv.sub_text)}}</p>
        <p class="content">{{vod(team.text, dv.text)}}</p>
      </div>
    </div>

    <div class="team-data">
      <p class="number mb-0">{{vod(team.employees.count, dv.employees.count)}}</p>
      <p class="mt-0">{{vod(team.employees.label, dv.employees.label)}}</p>
    </div>
  </section>
</template>

<script>
import DefaultValue from "~/helpers/default-values";

export default {
  name: "AboutTeam",
  data() {
    return {};
  },
  props: ["team"],

  methods: {
    // value or default
    vod(val, def) {
      return val ? val : def;
    }
  },

  computed: {
    dv() {
      return DefaultValue.about.team;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_about_team.scss";
</style>