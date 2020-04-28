<template>
  <section class="about-team">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="title d-none d-md-block">{{team.title}}</h1>
        </div>
      </div>
    </div>

    <div class="team-image">
      <div class="team-info">
        <h1 class="title">{{team.sub_title}}</h1>
        <p class="subtitle d-none d-md-block">{{team.sub_text}}</p>
        <p class="content">{{team.text}}</p>
      </div>
    </div>

    <div class="team-data">
      <p class="number mb-0">{{team.employees.count}}</p>
      <p class="mt-0">{{team.employees.label}}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutTeam",
  data() {
    return {};
  },
  props: ["team"]
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_about_team.scss";
</style>