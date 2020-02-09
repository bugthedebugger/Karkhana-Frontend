<template>
  <div class="dashboard-content">
    <div class="toolbar">
      <h1 class="title">Blog Posts</h1>
      <div class="toolbar-controls">
        <form class="form-inline">
          <div class="input-group mb-2 mr-sm-2 search-field">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fal fa-search"></i>
              </div>
            </div>
            <input type="text" class="form-control search-input" />
          </div>

          <button type="button" class="btn btn-primary mb-2" @click="createBlogPost()">
            <i class="fal fa-plus"></i> &nbsp;
            New Blog Post
          </button>
        </form>
      </div>
    </div>

    <div class="container-card">
      <div class="menubar"></div>
      <ul class="dashboard-list no-bullets" v-if="blogPosts">
        <li v-for="blogPost in blogPosts" :key="blogPost.uuid" class="dashboard-list-item d-flex">
          <label class="checkbox title flex-fill">
            <input type="checkbox" />
            {{blogPost.title}}
          </label>
          <label class="author">{{blogPost.author}}</label>
          <label class="created-at">{{ moment("blogPost.created_at").format("DD/MM/YYYY")}}</label>
          <label class="views">
            {{blogPost.views || 0}}
            <i class="fal fa-arrow-up"></i>
          </label>
          <div class="controls d-flex">
            <div class="btn-view">
              <i class="fal fa-eye"></i>
            </div>
            <div class="btn-edit">
              <i class="fal fa-edit"></i>
            </div>
            <div class="btn-delete">
              <i class="fal fa-trash-alt"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  layout: "dashboard",
  data() {
    return {
      blogPosts: null
    };
  },

  created() {
    this.fetchBlogs();
  },

  methods: {
    createBlogPost() {
      this.$axios.get("/admin/blog/uuid").then(response => {
        let uuid = response.data.data.uuid;
        this.$axios
          .post("/admin/blog/create", {
            title: "New Blog Post",
            uuid: uuid
          })
          .then(response => {
            if (response.data.status === "success") {
              console.log(response);
              this.$router.push({
                path: "/dashboard/create-blog",
                params: { uuid: response.data.data.uuid }
              });
            }
          });
      });
      return;
    },

    fetchBlogs() {
      this.$axios.get("/admin/blog?per_page=100").then(response => {
        this.blogPosts = response.data.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/_dashboard_blogs.scss";
</style>
