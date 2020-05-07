<template>
  <section class="our-partners">
    <div class="container pt-5 pb-5">
      <div class="row">
        <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12 logos">
          <div class="d-flex justify-content-center">
            <img
              class="m-3 align-self-center"
              :src="image.logo.path"
              width="100"
              height="auto"
              v-for="(image, index) in partnersList"
              :key="index"
            />
          </div>
        </div>
        <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12 content">
          <div class="align-middle">
            <p class="work-with-us">WORK WITH US</p>
            <p class="our-partners">{{partnersData.label}}</p>
            <p class="partners-content">{{partnersData.text}}</p>

            <nuxt-link
              :to="'/partners?lang=' + $route.query.lang || 'en'"
              class="btn btn-primary text-uppercase"
            >{{partnersData.button_label}}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomePartners",
  props: ["partnersData", "partnersList"]
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_home_partners.scss";
</style>