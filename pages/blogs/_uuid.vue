<template>
  <div class="blog-detail">
    <div
      class="blog-header"
      :style="'background-image: url(' + 'https://source.unsplash.com/random' + ')'"
    >
      <div class="overlay"></div>
      <div class="header-info">
        <div class="author-info-container d-flex">
          <div
            class="author-image"
            :style="'background-image: url(' + 'https://worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg' + ')'"
          ></div>
          <div class="author-info align-self-center">
            Bibhuti Poudyal
            <br />18th Jan 2020, 15 min read
          </div>
        </div>
        <h1 class="blog-title">Title of the blog is here</h1>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "~/components/Footer";
export default {
  layout: "portfolio",
  // auth: false,
  components: { Footer },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/blog_detail.scss";
</style>
