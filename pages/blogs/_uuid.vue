<template>
  <div class="blog-detail">
    <div class="blog-header" :style="setBackgroundImage(blog.featured)">
      <div class="overlay"></div>
      <div class="header-info">
        <h1 class="blog-title">{{blog.title}}</h1>
        <div class="author-info-container d-flex">
          <div class="author-image" :style="'background-image: url(' + blog.author.avatar + ')'"></div>
          <div class="author-info align-self-center">
            {{blog.author.name}}
            <br />
            {{formatCreatedAt(blog.created_at)}}
            <!-- , {{parseInt(blog.read_time) || 0}} min read -->
          </div>
        </div>
      </div>
    </div>

    <div class="blog-wrapper">
      <div class="blog-body" v-html="blog.body"></div>

      <hr />
      <div class="blog-footer mb-4">
        <div v-if="blog.tags" class="tags-container">
          <div class="tag" v-for="tag in blog.tags" :key="tag.id">{{tag.name}}</div>
        </div>
        <div class="social-handlers">
          <label>Share</label>
          <a :href="getFbShareLink()" target="_blank">
            <i class="fab fa-facebook"></i>
          </a>
          <a :href="getTwitterShareLink()" target="_blank">
            <i class="fab fa-twitter"></i>
          </a>

          <!-- <i class="fal fa-bookmark"></i> -->
        </div>
      </div>

      <div class="author-intro">
        <div class="author-image" :style="'background-image: url(' + blog.author.avatar + ')'"></div>
        <div class="author-info">
          <span class="author-name">{{blog.author.name}}</span>
          <!-- <br />
          <span class="author-designation">Not specified</span>-->
          <!-- <br /> -->
          <br />
          <span class="author-bio">{{blog.author.bio}}</span>
          <p class="social-handlers">
            <a v-if="blog.author.facebook && blog.author.facebook !== 'null'" :href="blog.author.facebook">
              <i class="fab fa-facebook"></i>
            </a>
            <a v-if="blog.author.facebook && blog.author.twitter !== 'null'" :href="blog.author.twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a v-if="blog.author.facebook && blog.author.linkedin !== 'null'" :href="blog.author.linkedin">
              <i class="fab fa-linkedin"></i>
            </a>
            <a v-if="blog.author.facebook && blog.author.instagram !== 'null'" :href="blog.author.instagram">
              <i class="fab fa-instagram"></i>
            </a>
          </p>
        </div>
      </div>

      <!-- <div class="pagination-posts">
        <div class="row">
          <div class="col-6">
            <div class="pagination-post">
              <div class="overlay"></div>
              <div class="content">
                <div class="title">
                  <span>Previous post title</span>
                  <i class="fal fa-bookmark"></i>
                </div>

                <nuxt-link to="/blogs" class="pagination-link">
                  <i class="fal fa-arrow-left"></i>
                  Previous Post
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="pagination-post">
              <div class="overlay"></div>
              <div class="content">
                <div class="title">
                  <span>Next post title</span>
                  <i class="fal fa-bookmark"></i>
                </div>

                <nuxt-link to="/blogs" class="pagination-link">
                  <i class="fal fa-arrow-right"></i>
                  Next Post
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>-->
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
  head() {
    return {
      title: this.blog.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.blog.title
        },
        {
          hid: "description",
          name: "tags",
          content: this.blog.tags
            ? this.blog.tags.map(t => t.name)
            : "Karkhana Blog"
        },
        {
          property: "og:url",
          content: process.env.MY_URL + "/blogs/" + this.$route.params.uuid
        },
        {
          property: "og:type",
          content: "Website"
        },
        {
          property: "og:title",
          content: this.blog.title
        },
        {
          property: "og:description",
          content: this.blog.title
        },

        {
          property: "og:image",
          content: this.blog.featured
            ? this.blog.featured
            : process.env.MY_URL + "/images/slider-image-5.jpg"
        },

        {
          property: "twitter:card",
          content: "summary"
        }
      ]
    };
  },

  components: { Footer },

  data() {
    return {
      uuid: this.$route.params.uuid
      // blog: null
    };
  },

  async asyncData({ $axios, params, error }) {
    try {
      const response = await $axios.get(`/blog/${params.uuid}`);
      return { blog: response.data.data };
    } catch (e) {
      error({ statusCode: 404 });
    }
  },

  async created() {
    console.log(this.blog);
  },

  methods: {
    getFbShareLink() {
      return `https://www.facebook.com/sharer/sharer.php?u=${process.env.MY_URL}/blogs/${this.uuid}`;
    },

    getTwitterShareLink() {
      return (
        "http://twitter.com/share?url=" +
        encodeURIComponent(`${process.env.MY_URL}/blogs/${this.uuid}`)
      );
    },

    setBackgroundImage(image_path) {
      let image;
      if (image_path === null || image_path == "null")
        image = "/images/slider-image-5.jpg";
      else image = image_path;
      return `background-image: url(${image})`;
    },

    async fetchBlogDetails() {
      const response = await this.$axios.get(`/blog/${this.uuid}`);
      this.blog = response.data.data;
    },

    formatCreatedAt(date) {
      return moment(date).format("Do MMMM YYYY");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/blog_detail.scss";
</style>
