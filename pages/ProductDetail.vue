<template>
  <div class="product-detail">
    <ProductDetailIntro />
    <ProductDetailTestimonial />
    <Footer />
  </div>
</template>

<script>
import Footer from "~/components/Footer";
import ProductDetailIntro from "~/components/ProductDetailIntro";
import ProductDetailTestimonial from "~/components/ProductDetailTestimonial";

export default {
  layout: "portfolio",
  components: { ProductDetailIntro, ProductDetailTestimonial, Footer },
  data() {
    return {
      products: {
        science: {
          title: "Karkhana Science",
          grade: "6 to 8",
          type: "Curricular",
          product: "Science Kit Online Support Platform Workbook",
          school_services: "Teacher Training",
          student_services: "Karkhana Teachers"
        },
        computing: {
          title: "Karkhana Computing",
          grade: "3 to 5",
          type: "Curricular",
          product: "Textbook",
          school_services: "Teacher Training",
          student_services: "Karkhana Teachers"
        },
        make: {
          title: "Karkhana Make",
          grade: "3 to 9",
          type: "Co/Extra Curricular",
          product: "Innovation Kit",
          school_services: "N/A",
          student_services: "Karkhana Teachers"
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/product_detail.scss";
</style>
