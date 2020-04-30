<template>
  <div class="products">
    <div class="container mb-4">
      <div class="row">
        <div class="col-md-3 d-none d-md-block">
          <div class="v-spacer"></div>
          <div class="attribute-name">{{productsData.grade_label}}</div>
          <div class="attribute-name">{{productsData.type_label}}</div>
          <div class="attribute-name">{{productsData.product_label}}</div>
          <div class="attribute-name">{{productsData.school_services_label}}</div>
          <div class="attribute-name">{{productsData.students_services_label}}</div>
        </div>
        <div class="col-md-3">
          <ProductsItem
            v-if="productsData.products[0]"
            :product_info="productsData.products[0]"
            :show_key_value="showKeyValue"
            :mobile_display="mobileDisplay"
          />
        </div>
        <div class="col-md-3">
          <ProductsItem
            v-if="productsData.products[1]"
            :product_info="productsData.products[1]"
            :show_key_value="showKeyValue"
            :mobile_display="mobileDisplay"
          />
        </div>
        <div class="col-md-3">
          <ProductsItem
            v-if="productsData.products[2]"
            :product_info="productsData.products[2]"
            :show_key_value="showKeyValue"
            :mobile_display="mobileDisplay"
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import ProductsItem from "@/components/ProductsItem";
import Footer from "~/components/Footer";
import DefaultValue from "~/helpers/default-values";

export default {
  layout: "portfolio",
  auth: false,
  components: { ProductsItem, Footer },

  async asyncData({ $axios, params, error }) {
    try {
      const response = await $axios.get("/pages/products");
      const productsData = response.data.data;

      // set default values if null
      Object.keys(productsData).forEach(key => {
        if (!productsData[key] && DefaultValue.products[key])
          productsData[key] = DefaultValue.products[key];
      });

      return { productsData };
    } catch (e) {
      console.log(e);
      error({ statusCode: 404 });
    }
  },

  data() {
    return {
      // products: {
      //   science: {
      //     category: "science",
      //     title: "Karkhana Science",
      //     grade: "6 to 8",
      //     type: "Curricular",
      //     product: "Science Kit Online Support Platform Workbook",
      //     school_services: "Teacher Training",
      //     student_services: "Karkhana Teachers"
      //   },
      //   computing: {
      //     category: "computing",
      //     title: "Karkhana Computing",
      //     grade: "3 to 5",
      //     type: "Curricular",
      //     product: "Textbook",
      //     school_services: "Teacher Training",
      //     student_services: "Karkhana Teachers"
      //   },
      //   make: {
      //     category: "make",
      //     title: "Karkhana Make",
      //     grade: "3 to 9",
      //     type: "Co/Extra Curricular",
      //     product: "Innovation Kit",
      //     school_services: "N/A",
      //     student_services: "Karkhana Teachers"
      //   }
      // },
      showKeyValue: false,
      mobileDisplay: false
    };
  },

  mounted() {
    if (process.client) {
      // show key value for mobile
      $(window).resize(() => {
        this.adjustResponsive();
      });
      this.adjustResponsive();
    }
  },

  methods: {
    adjustResponsive() {
      this.showKeyValue = $(window).width() < 768;
      this.mobileDisplay = this.showKeyValue;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/products.scss";
</style>
