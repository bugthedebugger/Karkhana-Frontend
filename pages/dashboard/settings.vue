<template>
  <div class="dashboard-content">
    <div class="toolbar">
      <h1 class="title">Settings</h1>
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
        <li
          v-for="(blogPost, index) in blogPosts"
          :key="blogPost.uuid"
          class="dashboard-list-item d-flex"
        >
          <label class="checkbox title flex-fill">
            <input type="checkbox" />
            {{blogPost.title}}
          </label>
          <label class="author">{{blogPost.author}}</label>
          <label class="created-at">{{ formatCreatedAt(blogPost.created_at) }}</label>
          <label class="views">
            {{blogPost.views || 0}}
            <i class="fal fa-arrow-up"></i>
          </label>
          <div class="controls d-flex">
            <div class="btn-view">
              <i class="fal fa-eye"></i>
            </div>
            <div class="btn-edit">
              <nuxt-link :to="'create-blog?uuid=' + blogPost.uuid">
                <i class="fal fa-edit"></i>
              </nuxt-link>
            </div>
            <div class="btn-delete" @click="deleteBlogPost(blogPost.uuid, index)">
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
  auth: true,
  data() {
    return {
      blogPosts: null,
      filteredBlogPosts: null
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
