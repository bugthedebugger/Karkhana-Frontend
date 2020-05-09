<template>
  <div class="product-detail">
    <ProductDetailIntro :product_info="productData" />
    <!-- <ProductDetailTestimonial :product_info="selectedProduct" /> -->
    <Footer />
  </div>
</template>

<script>
import Footer from "~/components/Footer";
import ProductDetailIntro from "~/components/ProductDetailIntro";
import ProductDetailTestimonial from "~/components/ProductDetailTestimonial";
import DefaultValue from "~/helpers/default-values";

export default {
  layout: "portfolio",
  auth: false,
  components: { ProductDetailIntro, ProductDetailTestimonial, Footer },

  async asyncData({ $axios, query, error }) {
    // if (
    //   !query.type ||
    //   !Object.keys(DefaultValue.productDetails).includes(query.type)
    // ) {
    //   error({ statusCode: 404 });
    // }

    $axios.setHeader("Accept-Language", query.lang);
    try {
      const response = await $axios.get(
        "/pages/product-details?code=" + query.type + "&language=" + query.lang
      );
      const productData = response.data.data;
      return { productData };
    } catch (e) {
      let productData = DefaultValue.productDetails[query.type];
      return { productData };
    }
  },

  watchQuery: ["lang", "type"]
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/product_detail.scss";
</style>
