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
      <div v-if="blogPosts">
        <table v-if="blogPosts.length" class="table table-borderless dashboard-list">
          <tr
            v-for="(blogPost, index) in blogPosts"
            :key="blogPost.uuid"
            class="dashboard-list-item"
          >
            <td>
              <label class="checkbox title flex-fill">
                <input type="checkbox" />
                {{ utf8Decode(blogPost.title) }}
              </label>
            </td>
            <td>
              <label class="author">{{blogPost.author.name}}</label>
            </td>
            <td>
              <label class="created-at">{{ formatCreatedAt(blogPost.created_at) }}</label>
            </td>
            <td>
              <label class="views">{{blogPost.published ? 'Published' : 'Un-published'}}</label>
            </td>
            <td>
              <div class="controls d-flex">
                <div class="btn-view">
                  <nuxt-link :to="'/blogs/' + blogPost.uuid" target="_blank">
                    <i class="fal fa-eye"></i>
                  </nuxt-link>
                </div>
                <div class="btn-edit">
                  <nuxt-link :to="'create-blog?uuid=' + blogPost.uuid">
                    <i class="fal fa-edit"></i>
                  </nuxt-link>
                </div>
                <div class="btn-delete" @click="deleteBlogPost(blogPost.uuid, index)">
                  <a href="#">
                    <i class="fal fa-trash-alt"></i>
                  </a>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <div v-else>No Blogs found</div>
      </div>
      <div v-else>
        <Loading />
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import Loading from "~/components/Loading";

export default {
  layout: "dashboard",
  auth: true,
  components: { Loading },
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
    utf8Decode(base64) {
      try {
        return decodeURIComponent(escape(base64));
      } catch (e) {
        console.log("URI error");
      }
    },

    createBlogPost() {
      this.$router.push({
        path: "/dashboard/create-blog",
        query: { uuid: "new-blog-post" }
      });
    },

    fetchBlogs() {
      this.$axios.get("/admin/blog?per_page=100").then(response => {
        this.blogPosts = response.data.data;
        this.filteredBlogPosts = this.blogPosts;
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
