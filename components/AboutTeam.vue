<template>
  <section class="about-team">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="title">Meet our team</h1>
          <p class="subtitle">We are passionate about the pursuit of ideas that people put first.</p>
        </div>
      </div>
    </div>

    <div class="team-image">
      <div class="team-info">
        <h1 class="title">The Team</h1>
        <p class="subtitle">
          We are a team of full-stack programming experts and designers with
          surprisingly deep knowledge of knitting and photography.
        </p>
        <p class="content">
          Some of us are very, very good at chess and we are unanimously bad at yachting.
          We all work together in a fancy office building. If we are not working together
          in a aforementioned building, we are very likely to spend time together somewhere else,
          we are friends after all.
        </p>
      </div>
    </div>

    <p class="team-data">
      <span class="number">50</span>
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