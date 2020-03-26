<template>
  <section class="about-careers">
    <div class="container" id="career-image-parent">
      <div class="row">
        <div class="d-none d-md-block col-md-2 col-sm-12"></div>
        <div class="col-md-8 col-sm-12">
          <div class="career-image" id="career-image">
            <div class="career-notice">
              <p class="title">CAREERS</p>
              <p class="description">
                Love what we're doing? Join our team to be part of a company
                that's powering the future of education
              </p>
              <nuxt-link to="/careers" class="btn btn-primary">See All Positions</nuxt-link>
            </div>
          </div>
        </div>
        <div class="d-none d-md-block col-md-2 col-sm-12"></div>
      </div>
    </div>
    <div class="map"></div>
  </section>
</template>

<script>
export default {
  name: "AboutCareers",
  mounted() {
    // if (process.client) {
    //   $("#career-image").css(
    //     "margin-left",
    //     "-" +
    //       ($("#career-image-parent").outerWidth() -
    //         $("#career-image-parent").width() + 5) + 'px'
    //   );
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_about_careers.scss";
</style>