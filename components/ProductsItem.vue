<template>
  <div class="text-center">
    <div class="product-item" :style="'background-color:' + product_info.secondary_color">
      <div class="product-logo-circle" :style="'background-color:' + product_info.color">
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
                <div class="attribute-name">{{vod(allData.grade_label, dv.grade_label)}}</div>
              </td>
              <td>
                <div class="attribute-value">{{product_info.grade}}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="attribute-name">{{vod(allData.type_label, dv.type_label)}}</div>
              </td>
              <td>
                <div class="attribute-value">{{product_info.type}}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="attribute-name">{{vod(allData.product_label, dv.product_label)}}</div>
              </td>
              <td>
                <div class="attribute-value">{{product_info.product}}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  class="attribute-name"
                >{{vod(allData.school_services_label, dv.school_services_label)}}</div>
              </td>
              <td>
                <div class="attribute-value">{{product_info.school_services}}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  class="attribute-name"
                >{{vod(allData.students_services_label, dv.students_services_label)}}</div>
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
                  :href="product_info.brochure"
                  class="brochure-link"
                  :class="'brochure-link-' + product_info.code"
                >
                  <i class="fal fa-arrow-to-bottom"></i>
                  {{vod(allData.download_label, dv.download_label)}}
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
        :style="'background-color:' + product_info.color"
      >
        <i class="fal fa-arrow-to-bottom"></i>
        {{vod(allData.download_label, dv.download_label)}}
      </a>

      <nuxt-link
        v-else
        class="btn-learn-more"
        :to="'/productDetail?type=' + product_info.code + '&lang=' + $route.query.lang"
        :style="'background-color:' + product_info.color"
      >{{vod(allData.learn_more_label, dv.learn_more_label)}}</nuxt-link>
    </div>

    <a
      v-if="!show_key_value"
      target="_black"
      download
      :href="product_info.brochure"
      class="brochure-link"
      :class="'brochure-link-' + product_info.code"
      :style="'color:' + product_info.color"
    >
      <i class="fal fa-arrow-to-bottom"></i>
      {{vod(allData.download_label, dv.download_label)}}
    </a>
  </div>
</template>

<script>
import DefaultValue from "~/helpers/default-values";

export default {
  name: "ProductsItem",
  props: ["product_info", "show_key_value", "mobile_display", "allData"],

  created() {
    console.log(this.allData);
  },

  methods: {
    vod(val, def) {
      return val ? val : def;
    }
  },

  computed: {
    dv() {
      return DefaultValue.products;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_products_item.scss";
</style>