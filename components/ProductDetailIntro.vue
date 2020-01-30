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
            <ProductsItem :product_info="selectedProduct" :show_key_value="true" />
          </div>
        </div>

        <!-- Product details -->
        <div class="col-md-8">
          <div class="product-details-text">
            <h1 class="title intro-title">Introduction</h1>
            <div class="details">
              <p>
                Hands-on interactive science is fun. But it is also more than just fun. Research
                from around the world demonstrates that students learn better, remember more and
                do better on exams when taught in hands-on practical ways. Karkhana's research
                revealed that there are two roadblocks to institutionalizing practical education
                in South Asia: materials cost too much and teachers are uncomfortable teaching
                with the material that is available.
                <br />
                <br />Our science kits offer simple affordable
                practical science lessons that are designed explicitly for the South
                Asian context. Thus:
              </p>

              <ul>
                <li>Our kits are affordable and do not require a specialist lab. They turn each classroom into a lab of discovery.</li>
                <li>The kits provide one practical activity for each topic in the curriculum, thus allowing teachers to do practical science education while covering the course material.</li>
                <li>Having one-kit-per-student reduces teacher discomfort and increases the chances of continued use by both teachers and students.</li>
                <li>Online digital platform has teacher training videos reducing the need for excessive and expensive teacher training.</li>
              </ul>

              <h1 class="title mt-4">Curriculum links</h1>
              <ul class="curriculum-links no-bullets">
                <li v-for="link in products.science.curriculum_links" :key="link.url">
                  <a :href="link.url">{{link.title}}</a>
                </li>
              </ul>
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
    return {
      selectedProduct: null,
      products: {
        science: {
          category: "science",
          title: "Karkhana Science",
          grade: "6 to 8",
          type: "Curricular",
          product: "Science Kit Online Support Platform Workbook",
          school_services: "Teacher Training",
          student_services: "Karkhana Teachers",
          curriculum_links: [
            {
              title: "MYP Curriculum 2020",
              url: "1"
            },
            {
              title: "IPC Curriculum 2020",
              url: "2"
            },
            {
              title: "CBC Curriculum 2020 - Government of India",
              url: "3"
            },
            {
              title: "ICSE Curriculum 2020 [Updated]",
              url: "4"
            },
            {
              title: "ICSE Curriculum 2020 [Updated]",
              url: "5"
            },
            {
              title: "Government of Bangladesh - Some Curriculum Link",
              url: "6"
            }
          ]
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
      }
    };
  },
  created(){
    this.selectedProduct = this.products[this.$route.query.type];
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_product_detail_intro.scss";
</style>