<template>
  <section class="partners-main">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <h1 class="title">Partner with Karkhana</h1>
          <p class="description">
            We here at Karkhana are constantly looking to partner up with energetic
            and passionate organizations like ours in order to reach more students and parents.
            Partnering with us helps our impact expand further and helps the partner
            is tremendous ways possible.
          </p>

          <button
            class="btn btn-primary btn-cta mt-4 mb-4 mb-md-0 btn-partner-with-us"
          >Partner with Us</button>
        </div>
        <div class="col-md-6 col-sm-12">
          <img src="/images/partners.png" class="img-fluid d-none d-md-block" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PartnersMain"
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_partners_main.scss";
</style>