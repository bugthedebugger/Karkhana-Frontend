<template>
  <section class="our-partners">
    <div class="container pt-5 pb-5">
      <div class="row">
        <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12 logos">
          <img src="/images/partners.png" class="img-fluid" />
        </div>
        <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12 content">
          <div class="align-middle">
            <p class="work-with-us">WORK WITH US</p>
            <p class="our-partners">Our Partners</p>
            <p class="partners-content">
              In our efforts to empower people to build a better future Karkhana partners with
              universities, nonprofits and governments from around the world. Learn more about our
              partnerships by clicking on the logos.
            </p>

            <nuxt-link to="/partners" class="btn btn-primary">Learn More</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomePartners"
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_home_partners.scss";
</style>