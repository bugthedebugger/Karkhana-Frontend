<template>
  <div class="product-detail">
    <ProductDetailIntro :product_info="selectedProduct" />
    <!-- <ProductDetailTestimonial :product_info="selectedProduct" /> -->
    <Footer />
  </div>
</template>

<script>
import Footer from "~/components/Footer";
import ProductDetailIntro from "~/components/ProductDetailIntro";
import ProductDetailTestimonial from "~/components/ProductDetailTestimonial";

export default {
  layout: "portfolio",
  auth: false,
  components: { ProductDetailIntro, ProductDetailTestimonial, Footer },

  async asyncData({ $axios, query, error }) {
    try {
      const response = await $axios.get(
        "/pages/product-details?code=" + query.type
      );
      const productData = response.data.data;

      // // set default values if null
      // Object.keys(productsData).forEach(key => {
      //   if (!productsData[key] && DefaultValue.home[key])
      //     productsData[key] = DefaultValue.home[key];
      // });

      // console.log(productsData);

      // return { productsData };

      console.log(productData);
    } catch (e) {
      console.log(e);
      error({ statusCode: 404 });
    }
  },

  data() {
    return {
      selectedProduct: null,
      products: {
        science: {
          category: "science",
          title: "Karkhana Science",
          tagline: "Turn your classroom into a lab of discovery",
          grade: "6 to 8",
          type: "Curricular",
          product: "Science Kit Online Support Platform Workbook",
          school_services: "Teacher Training",
          student_services: "Karkhana Teachers",
          product_details: {
            summary: `
              Hands-on interactive science is fun. But it is also more than just fun. 
              Research from around the world demonstrates that students learn better, 
              remember more and do better on exams when taught in hands-on practical ways. 
              Karkhana's research revealed that there are two roadblocks to institutionalizing 
              practical education in South Asia: materials cost too much and teachers are 
              uncomfortable teaching with the material that is available.
            `,

            facts: [
              "Interactive learning is more fun for students. Enjoying learning leads to better grades.",
              "Practical Science lessons improve student's understanding of theory."
            ]
          },
          kit_info: [
            {
              icon: "/images/product-details/kit-science-item-1.svg",
              label:
                "A Science Kit with one practical for each chapter aligning with the national curriculum."
            },
            {
              icon: "/images/product-details/kit-science-item-2.svg",
              label:
                "Workbook and Materials that students can use in class and at home."
            },
            {
              icon: "/images/product-details/kit-science-item-3.svg",
              label: "Learning material that can be used all the way to SEE"
            },
            {
              icon: "/images/product-details/kit-science-item-4.svg",
              label: "Affordable Refills every year."
            }
          ],

          clients: [
            "/images/product-details/science-subscriber-1.png",
            "/images/product-details/science-subscriber-2.png",
            "/images/product-details/science-subscriber-3.png",
            "/images/product-details/science-subscriber-4.png",
            "/images/product-details/science-subscriber-5.png",
            "/images/product-details/science-subscriber-6.png"
          ]
        },

        computing: {
          category: "computing",
          title: "Karkhana Computing",
          tagline: "Technology education for the 21st century child",
          grade: "3 to 5",
          type: "Curricular",
          product: "Textbook",
          school_services: "Teacher Training",
          student_services: "Karkhana Teachers",
          product_details: {
            summary: `
              The digital world is increasingly shaping our everyday life. Today’s
              children will grow up in a world where computing devices, screens and 
              online communities with be both normal and widespread. In their future, 
              the impact of digital technologies on society, work and government is 
              going to be significant. Yet, computing curriculums are lagging 
              behind this fast moving field.
            `,

            facts: [
              "Computers will be essential to every job and every sector in our children’s time.",
              "Computing education in Nepal is 20 years behind the times and needs to be updated."
            ]
          },
          kit_info: [
            {
              icon: "/images/product-details/kit-computing-item-1.svg",
              label:
                "International standard books that captures all the latest and most important ideas in computer education."
            },
            {
              icon: "/images/product-details/kit-computing-item-2.svg",
              label:
                "Expert training by Karkhana trainers for your school's teachers."
            },
            {
              icon: "/images/product-details/kit-computing-item-3.svg",
              label:
                "Books and Videos that help both parents and students understand how to stay safe online and in social media"
            }
          ],

          clients: [
            "/images/product-details/science-subscriber-1.png",
            "/images/product-details/science-subscriber-2.png",
            "/images/product-details/science-subscriber-3.png",
            "/images/product-details/science-subscriber-4.png",
            "/images/product-details/science-subscriber-5.png",
            "/images/product-details/science-subscriber-6.png"
          ]
        },

        make: {
          category: "make",
          title: "Karkhana Make",
          tagline: "Make your own future",
          grade: "3 to 9",
          type: "Co/Extra Curricular",
          product: "Innovation Kit",
          school_services: "N/A",
          student_services: "Karkhana Teachers",
          product_details: {
            summary: `
            To be relevant in the 21st century, children need to expand their knowledge beyond 
            the textbook. They need to know how to communicate their ideas confidently, 
            how to work in a team and how to build smart  solutions for real world problems. 
            Yet, as parents will testify, it’s becoming increasingly hard to tear kids away 
            from their phones and gadgets. How do we provide soft skills in a way that engages 
            these modern, tech-savvy children ? 
          `,
            facts: [
              "21st century children need to know more than just what is in the textbook.",
              "Making skills lead children from being consumer to producer of technology.",
              "Creative use of technology - robotics, game design, electronics - is important for future success."
            ]
          },
          kit_info: [
            {
              icon: "/images/product-details/kit-make-item-1.svg",
              label:
                "An inventor's kit that can be used to make over 80 projects."
            },
            {
              icon: "/images/product-details/kit-make-item-2.svg",
              label:
                "Reusable material that can also be used for science fairs and learning at home."
            },
            {
              icon: "/images/product-details/kit-make-item-3.svg",
              label:
                "Karkhana teachers to guide each student's journey as innovators."
            },
            {
              icon: "/images/product-details/kit-make-item-4.svg",
              label:
                "Karkhana teachers to guide each student's journey as innovators."
            }
          ],

          clients: [
            "/images/product-details/science-subscriber-1.png",
            "/images/product-details/science-subscriber-2.png",
            "/images/product-details/science-subscriber-3.png",
            "/images/product-details/science-subscriber-4.png",
            "/images/product-details/science-subscriber-5.png",
            "/images/product-details/science-subscriber-6.png"
          ]
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
