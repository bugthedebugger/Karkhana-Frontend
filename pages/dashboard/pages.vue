<template>
  <div class="dashboard-content">
    <h1 class="title">Pages</h1>
  </div>
</template>
<script>
import moment from "moment";
export default {
  layout: "dashboard",
  auth: true,
  data() {
    return {
      blogPosts: null,
      filteredBlogPosts: null
    };
  },

  created() {
    // this.fetchBlogs();
  },

  methods: {
    createBlogPost() {
      this.$axios.get("/admin/blog/uuid").then(response => {
        let uuid = response.data.data.uuid;
        this.$axios
          .post("/admin/blog/create", {
            title: "New Blog Post",
            language: "en",
            uuid: uuid
          })
          .then(response => {
            if (response.data.status === "success") {
              console.log(response);
              this.$router.push({
                path: "/dashboard/create-blog",
                query: { uuid: response.data.data.uuid }
              });
            }
          });
      });
      return;
    },

    fetchBlogs() {
      this.$axios.get("/admin/blog?per_page=100").then(response => {
        this.blogPosts = response.data.data;
        this.filteredBlogPosts = response.data.data;
      });
    },

    deleteBlogPost(uuid, index) {
      if (confirm("Are you sure you want to delete this post?"))
        this.$axios.delete(`/admin/blog/delete/${uuid}`).then(response => {
          this.blogPosts.splice(index, 1);
        });
    },

    formatCreatedAt(date) {
      return moment(date).format("DD/MM/YYYY");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/_dashboard_blogs.scss";
</style>
