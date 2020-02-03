<template>
  <section class="about-team">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="title">Meet Our Team</h1>
        </div>
      </div>
    </div>

    <div class="team-image">
      <div class="team-info">
        <h1 class="title">Meet The Karkhanaughts</h1>
        <p class="subtitle">The best part of this crazy journey is the people we work with.</p>
        <p class="content">
          We are a diverse team of engineers, designers, social workers, programmers and
          educators that are bound together by one vision: empower people with the skills
          &amp; attitudes that will help them build their future and the future of their community.
        </p>
      </div>
    </div>

    <p class="team-data">
      <span class="number">52+</span>
      <br />Employees
    </p>
  </section>
</template>

<script>
export default {
  name: "AboutTeam",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_about_team.scss";
</style>