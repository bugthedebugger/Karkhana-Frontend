<template>
  <div class="product-detail-intro">
    <div class="header-image">
      <div class="overlay"></div>
    </div>

    <div class="container">
      <div class="row">
        <!-- Product Item -->
        <div class="col-md-4">
          <div class="product-info-wrapper">
            <ProductsItem :product_info="product_info" :show_key_value="true" />
          </div>
        </div>

        <!-- Product details -->
        <div class="col-md-8">
          <div class="product-details-text">
            <h1 class="title intro-title">{{product_info.title}}</h1>
            <p class="tagline">{{product_info.tagline}}</p>
            <div class="details">
              <div class="product-details" v-html="product_info.product_details"></div>

              <div v-if="product_info.curriculum_links">
                <h1 class="title mt-4">Curriculum links</h1>
                <div class="curriculum-links" v-html="product_info.curriculum_links"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsItem from "~/components/ProductsItem";

export default {
  name: "ProductDetailIntro",
  props: ["product_info"],
  components: { ProductsItem },
  data() {
    return {};
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_product_detail_intro.scss";
</style>