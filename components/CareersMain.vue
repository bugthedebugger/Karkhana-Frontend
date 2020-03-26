<template>
  <section class="careers-main">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <h1 class="title">Careers at Karkhana</h1>
          <p class="description">
            We are building a dream team of teachers, makers, creators, coders,
            designers and artists to join our awesome team to impact the education of the nation.
          </p>

          <button
            class="btn btn-primary btn-cta mt-4 btn-see-all-openings"
            @click="seeAllOpenings()"
          >See All Openings</button>
        </div>
        <div class="col-md-6 col-sm-12"></div>
      </div>
    </div>
    <img src="/images/career-details.png" class="careers-img img-fluid d-none d-md-block" />
  </section>
</template>

<script>
export default {
  name: "CareersMain",
  methods: {
    seeAllOpenings() {
      window.scrollBy(0, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_careers_main.scss";
</style>