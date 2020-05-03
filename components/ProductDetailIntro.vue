<template>
  <div class="product-detail-intro">
    <div
      class="header-image d-none d-md-block"
      :style="'background-image: url(' + product_info.product.featured_image.path + ')'"
    >
      <div class="overlay"></div>
    </div>

    <div class="container">
      <div class="row">
        <!-- Product Item -->
        <div class="col-md-4">
          <div class="product-info-wrapper">
            <ProductsItem :product_info="product_info.product" :show_key_value="true" />
          </div>
        </div>

        <!-- Product details -->
        <div class="col-md-8">
          <div class="product-details-text">
            <h1 class="title intro-title d-none d-md-block">{{product_info.product.name}}</h1>
            <p class="tagline">{{product_info.product.tag}}</p>
            <div class="details">
              <div class="product-details" v-html="product_info.product.description"></div>

              <template v-if="product_info.product.facts && product_info.product.facts.length">
                <div
                  class="product-facts"
                  :style="'background-color:' + product_info.product.color"
                >
                  <div class="container">
                    <h2 class="title">{{product_info.facts_label}}</h2>
                    <div class="row">
                      <div class="col-md-6 col-sm-12 text">
                        {{product_info.product.facts[0]}}
                        <div class="mb-3 d-md-none d-sm-block"></div>
                      </div>
                      <div class="col-md-6 col-sm-12 text">{{product_info.product.facts[1]}}</div>
                    </div>

                    <div class="row mt-4" v-if="product_info.product.facts.length > 2">
                      <div class="col-md-6 col-sm-12 text" v-if="product_info.product.facts[2]">
                        {{product_info.product.facts[2]}}
                        <div class="mb-3 d-md-none d-sm-block"></div>
                      </div>
                      <div
                        class="col-md-6 col-sm-12 text"
                        v-if="product_info.product.facts[3]"
                      >{{product_info.product.facts[3]}}</div>
                    </div>
                  </div>
                </div>
              </template>

              <div
                class="product-kit-details"
                v-if="product_info.product.features && product_info.product.features.length"
              >
                <h2 class="title">{{product_info.feature_label}}</h2>
                <div class="row">
                  <div class="col-6" v-if="product_info.product.features[0]">
                    <div class="kit-feature">
                      <img :src="product_info.product.features[0].logo" />
                      <p class="label">{{product_info.product.features[0].feature}}</p>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="kit-feature" v-if="product_info.product.features[1]">
                      <img :src="product_info.product.features[1].logo" />
                      <p class="label">{{product_info.product.features[1].feature}}</p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="kit-feature" v-if="product_info.product.features[2]">
                      <img :src="product_info.product.features[2].logo" />
                      <p class="label">{{product_info.product.features[2].feature}}</p>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="kit-feature" v-if="product_info.product.features[3]">
                      <img :src="product_info.product.features[3].logo" />
                      <p class="label">{{product_info.product.features[3].feature}}</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <!-- <div class="product-subscribers">
                <h2 class="title">Clients Currently Subscribed to Karkhana {{product_info.category}}</h2>

                <perfect-scrollbar class="clients-list-wrapper">
                  <div class="clients-list d-flex flex-nowrap">
                    <div
                      class="clients-list-item"
                      v-for="(client, index) in product_info.clients"
                      :key="index"
                    >
                      <img :src="client" />
                    </div>
                  </div>
                </perfect-scrollbar>
              </div>-->

              <!-- <div v-if="product_info.curriculum_links">
                <h1 class="title mt-4">Curriculum links</h1>
                <div class="curriculum-links" v-html="product_info.curriculum_links"></div>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsItem from "~/components/ProductsItem";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

export default {
  name: "ProductDetailIntro",
  props: ["product_info"],
  components: { ProductsItem, PerfectScrollbar },
  data() {
    return {};
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_product_detail_intro.scss";
</style>