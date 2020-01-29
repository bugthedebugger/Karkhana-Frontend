<template>
  <div class="text-center">
    <div class="product-item" :class="'product-item-' + category">
      <div class="product-logo-circle">
        <div class="img-wrapper">
          <img :src="'/images/product-logo-' + category + '-white.svg'" />
        </div>
      </div>
      <p class="title">{{product_info.title}}</p>
      <div class="attribute-value">{{product_info.grade}}</div>
      <div class="attribute-value">{{product_info.type}}</div>
      <div class="attribute-value">{{product_info.product}}</div>
      <div class="attribute-value">{{product_info.school_services}}</div>
      <div class="attribute-value">{{product_info.student_services}}</div>
      <button class="btn-learn-more">Learn More</button>
    </div>
    <a href="#" class="brochure-link" :class="'brochure-link-' + category">
      <i class="fal fa-arrow-to-bottom"></i> Download Brochure
    </a>
  </div>
</template>

<script>
export default {
  name: "ProductsItem",
  props: ["product_info", "category"]
};
</script>

<style lang="scss">
@import "@/styles/components/_products_item.scss";
</style>