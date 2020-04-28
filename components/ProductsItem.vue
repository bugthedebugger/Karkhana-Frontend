<template>
  <div class="text-center">
    <div class="product-item" :class="'product-item-' + product_info.code">
      <div class="product-logo-circle">
        <div class="img-wrapper">
          <img :src="product_info.logo" />
        </div>
      </div>
      <p class="title">{{product_info.title}}</p>
      <p class="tagline" v-if="show_key_value">{{product_info.tagline}}</p>
      <div v-if="show_key_value">
        <table border="0">
          <tbody>
            <tr>
              <td>
                <div class="attribute-name">Grade</div>
              </td>
              <td>
                <div class="attribute-value">{{product_info.grade}}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="attribute-name">Type</div>
              </td>
              <td>
                <div class="attribute-value">{{product_info.type}}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="attribute-name">Product</div>
              </td>
              <td>
                <div class="attribute-value">{{product_info.product}}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="attribute-name">School Services</div>
              </td>
              <td>
                <div class="attribute-value">{{product_info.school_services}}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="attribute-name">Student Services</div>
              </td>
              <td>
                <div class="attribute-value">{{product_info.student_services}}</div>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <a
                  v-if="mobile_display"
                  target="_black"
                  download
                  :href="product_info.brocure"
                  class="brochure-link"
                  :class="'brochure-link-' + product_info.code"
                >
                  <i class="fal fa-arrow-to-bottom"></i> Download Brochure
                </a>
                <div class="mb-2"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <div class="attribute-value">{{product_info.grade}}</div>
        <div class="attribute-value">{{product_info.type}}</div>
        <div class="attribute-value">{{product_info.product}}</div>
        <div class="attribute-value">{{product_info.school_services}}</div>
        <div class="attribute-value">{{product_info.student_services}}</div>
      </div>

      <a
        v-if="show_key_value  && !mobile_display"
        target="_black"
        download
        :href="product_info.brochure"
        class="btn-learn-more"
      >
        <i class="fal fa-arrow-to-bottom"></i> Download Brochure
      </a>

      <nuxt-link
        v-else
        class="btn-learn-more"
        :to="'/productDetail?type=' + product_info.code"
      >Learn More</nuxt-link>
    </div>

    <a
      v-if="!show_key_value"
      target="_black"
      download
      :href="product_info.brochure"
      class="brochure-link"
      :class="'brochure-link-' + product_info.code"
    >
      <i class="fal fa-arrow-to-bottom"></i> Download Brochure
    </a>
  </div>
</template>

<script>
export default {
  name: "ProductsItem",
  props: ["product_info", "show_key_value", "mobile_display"]
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_products_item.scss";
</style>