<template>
  <div class="products">
    <div class="container mb-4">
      <div class="row">
        <div class="col-md-3 d-none d-md-block">
          <div class="v-spacer"></div>
          <div class="attribute-name">Grade</div>
          <div class="attribute-name">Type</div>
          <div class="attribute-name">Product</div>
          <div class="attribute-name">School Services</div>
          <div class="attribute-name">Student Services</div>
        </div>
        <div class="col-md-3">
          <ProductsItem :product_info="products.science" :show_key_value="showKeyValue" />
        </div>
        <div class="col-md-3">
          <ProductsItem :product_info="products.computing" :show_key_value="showKeyValue" />
        </div>
        <div class="col-md-3">
          <ProductsItem :product_info="products.make" :show_key_value="showKeyValue" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import ProductsItem from "@/components/ProductsItem";
import Footer from "~/components/Footer";

export default {
  layout: "portfolio",
  auth: false,
  components: { ProductsItem, Footer },
  data() {
    return {
      products: {
        science: {
          category: "science",
          title: "Karkhana Science",
          grade: "6 to 8",
          type: "Curricular",
          product: "Science Kit Online Support Platform Workbook",
          school_services: "Teacher Training",
          student_services: "Karkhana Teachers"
        },
        computing: {
          category: "computing",
          title: "Karkhana Computing",
          grade: "3 to 5",
          type: "Curricular",
          product: "Textbook",
          school_services: "Teacher Training",
          student_services: "Karkhana Teachers"
        },
        make: {
          category: "make",
          title: "Karkhana Make",
          grade: "3 to 9",
          type: "Co/Extra Curricular",
          product: "Innovation Kit",
          school_services: "N/A",
          student_services: "Karkhana Teachers"
        }
      },
      showKeyValue: false
    };
  },
  
  mounted() {
    if (process.client) {
      // show key value for mobile
      this.showKeyValue = $(window).height() < 768;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/products.scss";
</style>
