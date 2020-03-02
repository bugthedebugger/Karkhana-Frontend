<template>
  <div class="blogs">
    <div class="container">
      <div class="blog-tabs d-flex justify-content-center justify-content-md-start">
        <div
          v-for="cat in fetchCategories"
          :key="cat"
          class="tab"
          :class="{'tab-selected': selectedFetchCategory === cat}"
          @click="selectFetchCategory(cat)"
        >{{cat}}</div>
      </div>

      <div
        v-if="blogPosts && blogPosts.length > 0"
        class="blog-posts d-flex flex-wrap justify-content-center justify-content-md-start"
      >
        <div
          class="blog-post-alt"
          v-for="blogPost in blogPosts"
          :key="blogPost.uuid"
          @click="navigateTo(blogPost.slug ? blogPost.slug : blogPost.uuid )"
        >
          <div class="blog-image" :style="setBackgroundImage(blogPost.featured)">
            <div class="overlay"></div>
            <div class="blog-details">
              <div class="author-info-container d-flex">
                <div
                  class="author-image"
                  :style="'background-image: url(' + blogPost.author.avatar + ')'"
                ></div>
                <div class="author-info align-self-end">
                  {{blogPost.author.name}}
                  <br />
                  <span class="date">{{formatCreatedAt(blogPost.created_at)}}</span>
                </div>
              </div>
              <!-- <p class="author-info align-self-center">{{formatCreatedAt(blogPost.created_at)}}</p> -->
              <p class="blog-title">{{utf8Decode(blogPost.title)}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h5>No Blogs Found</h5>
      </div>

      <!-- <div class="row">
        <div class="col">
          <div class="tags-container">
            <p class="title">
              Tags
              <span class="tags-count">({{tags ? tags.length : 0 }})</span>
            </p>

            <div v-for="tag in tags" :key="tag.id" class="tag">{{tag.name}}</div>
          </div>
        </div>
      </div>-->

      <!-- <div class="row mt-4 mb-4">
        <div class="col text-center">
          <button class="btn btn-primary">
            <i class="fal fa-sync"></i>&nbsp;
            Load More
          </button>
        </div>
      </div>-->

      <div class="mb-4"></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "~/components/Footer";
import moment from "moment";

export default {
  layout: "portfolio",
  auth: false,
  components: { Footer },
  data() {
    return {
      fetchCategories: ["Latest"],
      selectedFetchCategory: "Latest",
      blogPosts: null,
      tags: null
    };
  },

  created() {
    // this.fetchTags();
    // console.log(this.blogPosts);
  },

  mounted() {
    this.applyEqualHeightRule();
  },

  async asyncData({ $axios, params }) {
    const response = await $axios.get("/blog?per_page=10");
    return { blogPosts: response.data.data };
  },

  methods: {
    applyEqualHeightRule() {
      let maxHeight = 0;
      $(".blog-post-alt").each(function() {
        if ($(this).height() > maxHeight) maxHeight = $(this).height();
      });
      $(".blog-post-alt").height(maxHeight);
    },

    setBackgroundImage(image_path) {
      let image;
      if (image_path === null || image_path == "null")
        image = "/images/slider-image-5.jpg";
      else image = image_path;
      return `background-image: url(${image})`;
    },

    utf8Decode(base64) {
      try {
        return decodeURIComponent(escape(base64));
      } catch (e) {
        // ("URI error");
        return "";
      }
    },

    selectFetchCategory(cat) {
      this.selectedFetchCategory = cat;
    },

    navigateTo(identifier) {
      this.$router.push({
        path: "/blogs/" + identifier
      });
    },

    fetchTags() {
      this.$axios.get(`/blog/tags?per_page=100`).then(response => {
        if (response.data.message === "success") this.tags = response.data.data;
      });
    },

    fetchBlogs() {
      this.$axios.get("/blog?per_page=10").then(response => {
        // console.log(response);
        // console.log(atob(response.data.data[0]));
        this.blogPosts = response.data.data;
        // this.applyEqualHeightRule();
      });
    },

    formatCreatedAt(date) {
      return moment(date).format("Do MMMM YYYY");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/blogs.scss";
</style>
