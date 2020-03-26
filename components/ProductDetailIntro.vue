<template>
  <div class="product-detail-intro">
    <div class="header-image d-none d-md-block">
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
            <h1 class="title intro-title d-none d-md-block">{{product_info.title}}</h1>
            <p class="tagline">{{product_info.tagline}}</p>
            <div class="details">
              <div class="product-details" v-html="product_info.product_details.summary"></div>

              <div class="product-facts" :class="'--' + product_info.category">
                <div class="container">
                  <h2 class="title">Facts</h2>
                  <div class="row">
                    <div class="col-md-6 col-sm-12 text">
                      {{product_info.product_details.facts[0]}}
                      <div class="mb-3 d-md-none d-sm-block"></div>
                    </div>
                    <div class="col-md-6 col-sm-12 text">{{product_info.product_details.facts[1]}}</div>
                  </div>

                  <div class="row mt-4" v-if="product_info.product_details.facts.length > 2">
                    <div
                      class="col-md-6 col-sm-12 text"
                      v-if="product_info.product_details.facts[2]"
                    >
                      {{product_info.product_details.facts[2]}}
                      <div class="mb-3 d-md-none d-sm-block"></div>
                    </div>
                    <div
                      class="col-md-6 col-sm-12 text"
                      v-if="product_info.product_details.facts[3]"
                    >{{product_info.product_details.facts[3]}}</div>
                  </div>
                </div>
              </div>

              <div class="product-kit-details">
                <h2 class="title">What do you get in Karkhana {{product_info.category}} Kit ?</h2>
                <div class="row">
                  <div class="col-6">
                    <div class="kit-feature">
                      <img :src="product_info.kit_info[0].icon" />
                      <p class="label">{{product_info.kit_info[0].label}}</p>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="kit-feature">
                      <img :src="product_info.kit_info[1].icon" />
                      <p class="label">{{product_info.kit_info[1].label}}</p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="kit-feature">
                      <img :src="product_info.kit_info[2].icon" />
                      <p class="label">{{product_info.kit_info[2].label}}</p>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="kit-feature" v-if="product_info.kit_info[3]">
                      <img :src="product_info.kit_info[3].icon" />
                      <p class="label">{{product_info.kit_info[3].label}}</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div class="product-subscribers">
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
              </div>

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