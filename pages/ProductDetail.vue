<template>
  <div class="product-detail">
    <ProductDetailIntro :product_info="selectedProduct" />
    <ProductDetailTestimonial :product_info="selectedProduct" />
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
          product_details: `
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
          `,
          curriculum_links: `
            <ul>
              <li> <a  href="#">MYP Curriculum 2020</a></li>
              <li> <a  href="#">IPC Curriculum 2020</a></li>
              <li> <a  href="#">CBC Curriculum 2020 - Government of India</a></li>
              <li> <a  href="#">ICSE Curriculum 2020 [Updated]</a></li>
              <li> <a  href="#">ICSE Curriculum 2020 [Updated]</a></li>
              <li> <a  href="#">Government of Bangladesh - Some Curriculum Link</a></li>
            </ul>
          `
        },
        computing: {
          category: "computing",
          title: "Karkhana Computing",
          grade: "3 to 5",
          type: "Curricular",
          product: "Textbook",
          school_services: "Teacher Training",
          student_services: "Karkhana Teachers",
          product_details: `
            <p>
              The digital world is increasingly shaping our everyday life. Today’s
              children will grow up in a world where computing devices, screens and 
              online communities with be both normal and widespread. In their future, 
              the impact of digital technologies on society, work and government is 
              going to be significant. Yet, computing curriculums are lagging 
              behind this fast moving field.
              <br/> 
              Being able to navigate the increasingly digital world will be necessary 
              in all walks of life. So we have built a curriculum and learning resources 
              that reflect our vision for a 21st century computing education. This vision 
              includes nurturing visual communicators through the Design and Communication 
              series, programmers through the Computational Thinking series and informed 
              citizens through the Digital Citizenship series.  
              <br />
              Each series consists of books, videos and teachers-guides that schools can use. 
              Because it takes more than schools to produce good citizens the same material can 
              also be used by parents.  
            </p>
          `,
          curriculum_links: `
            The computing series is based on Karkhana’s own primary school computing curriculum. 
            As most South Asian countries do not have a primary school computing curriculum, 
            this fills a useful void that many schools encounter.  The computing series 
            can also be aligned to PYP, IPC, UK (Key Stage 1 and 2). Currently the series 
            is designed for grades 1 through 5. 
          `
        },
        make: {
          category: "make",
          title: "Karkhana Make",
          grade: "3 to 9",
          type: "Co/Extra Curricular",
          product: "Innovation Kit",
          school_services: "N/A",
          student_services: "Karkhana Teachers",
          product_details: `
            To be relevant in the 21st century, children need to expand their knowledge beyond 
            the textbook. They need to know how to communicate their ideas confidently, 
            how to work in a team and how to build smart  solutions for real world problems. 
            Yet, as parents will testify, it’s becoming increasingly hard to tear kids away 
            from their phones and gadgets. How do we provide soft skills in a way that engages 
            these modern, tech-savvy children? 
            <br />
            The Make program is built around topics that children find exciting - technology, gaming, 
            robotics, animation, crafts - as a medium to teach soft skills and critical thinking. 
            <br/>
            Karkhana’s Make kits are a series of fun and exciting projects that use technology as a 
            medium for children to learn creativity, self expression and critical thinking. 
            The Make kits come with recipes that can be used to make 80+ projects. 
            With the kit in hand, students can also build hundreds of other projects they find online.
            <br/>
            The Make program is very flexible. Some schools use it as a compulsory enrichment class, 
            others use it as an ECA or an after-school program that students choose. 
          `
        }
      }
    };
  },

  created() {
    this.selectedProduct = this.products[this.$route.query.type];
  },

  watch: {
    $route(to, from) {
      this.selectedProduct = this.products[to.query.type];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/product_detail.scss";
</style>
