<template>
  <div></div>
</template>

<script>
export default {
  layout: "portfolio",
  auth: false,
  head() {
    return {};
  },
  components: {},

  data() {
    return {};
  },

  async asyncData({ $axios, params, error }) {
    try {
      const response = await $axios.get(
        `/register/check/${params.register_token}`
      );
      
    } catch (e) {
      error({ statusCode: 404 });
    }
  },

  async created() {},

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
// @import "@/styles/pages/blog_detail.scss";
</style>
