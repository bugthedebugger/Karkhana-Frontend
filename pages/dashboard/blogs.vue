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
        <ul class="dashboard-list no-bullets" v-if="blogPosts.length">
          <li
            v-for="(blogPost, index) in blogPosts"
            :key="blogPost.uuid"
            class="dashboard-list-item d-flex"
          >
            <label class="checkbox title flex-fill">
              <input type="checkbox" />
              {{ utf8Decode(blogPost.title) }}
            </label>
            <label class="author">{{blogPost.author}}</label>
            <label class="created-at">{{ formatCreatedAt(blogPost.created_at) }}</label>
            <label class="views">{{blogPost.published ? 'Published' : 'Un-published'}}</label>
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
                <i class="fal fa-trash-alt"></i>
              </div>
            </div>
          </li>
        </ul>
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
        // let base64 = response.data.data;

        // this.blogPosts = base64
        //   .filter(b => b.length > 0)
        //   .map(b => JSON.parse(atob(b)));
        // this.filteredBlogPosts = this.blogPosts;

        // this.blogPosts = base64
        //   .map(b => {
        //     return{
        //       uuid: b.uuid,
        //       featured: b.featured,
        //       author: b.author,
        //       title: atob(b.title),
        //       summary: atob(b.summary),
        //       read_time: b.read_time
        //       created_at: b.published
        //     }
        //   });
        this.filteredBlogPosts = this.blogPosts;

        console.log(this.blogPosts);
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
