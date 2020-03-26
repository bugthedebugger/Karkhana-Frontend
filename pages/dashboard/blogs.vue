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
      <div class="menubar d-flex justify-content-end">
        <div class="pagination-controls d-flex mb-4">
          <p
            class="pagination-info align-self-center mr-4 mb-0"
          >{{paginationData.from}} - {{paginationData.to}} of {{paginationData.total}}</p>

          <div class="btn-group mr-2 align-self-center" role="group">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="prevPage()"
              :disabled="paginationData.currentPage === 1"
            >
              <span>&laquo;</span>
            </button>

            <div class="btn-group" role="group">
              <button
                id="pageNoDropdown"
                type="button"
                class="btn btn-outline-secondary btn-sm dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >{{paginationData.currentPage}}</button>
              <div class="dropdown-menu" aria-labelledby="pageNoDropdown">
                <a
                  class="dropdown-item"
                  href="#"
                  v-for="i in paginationData.lastPage"
                  :key="i"
                  @click="gotoPage(i)"
                >{{i}}</a>
              </div>
            </div>

            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="nextPage()"
              :disabled="paginationData.currentPage === paginationData.lastPage"
            >
              <span>&raquo;</span>
            </button>
          </div>
          <select
            class="form-control form-control-sm align-self-center"
            style="width: 75px"
            v-model="paginationData.perPage"
            @change="handlePerPageSelect()"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
      <div v-if="blogPosts">
        <div v-if="blogPosts.length">
          <table class="table table-borderless dashboard-list">
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
        </div>

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
      filteredBlogPosts: null,
      paginationData: {
        total: null,
        from: null,
        to: null,
        currentPage: 1,
        firstPage: 1,
        lastPage: null,
        firstPageUrl: null,
        lastPageUrl: null,
        nextPageUrl: null,
        prevPageUrl: null,
        perPage: 5
      }
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
      this.blogPosts = null;
      this.$axios
        .get(
          `/admin/blog?per_page=${this.paginationData.perPage}&page=${this.paginationData.currentPage}`
        )
        .then(response => {
          this.blogPosts = response.data.data;
          this.filteredBlogPosts = this.blogPosts;

          // assign paginatgion metadata
          // this.paginationData.firstPageUrl = response.data.first_page_url;
          // this.paginationData.lastPageUrl = response.data.last_page_url;

          this.paginationData.firstPage = response.data.from;
          this.paginationData.lastPage = response.data.last_page;
          // this.paginationData.nextPage = response.data.next_page_url;
          // this.paginationData.prevPage = response.data.prev_page_url;
          this.paginationData.from = response.data.from;
          this.paginationData.to = response.data.to;
          this.paginationData.total = response.data.total;
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
    },

    gotoPage(page) {
      if (page === this.paginationData.currentPage) return;
      this.paginationData.currentPage = page;
      this.fetchBlogs();
    },

    nextPage() {
      if (this.paginationData.currentPage < this.paginationData.lastPage)
        this.paginationData.currentPage++;
      this.fetchBlogs();
    },

    prevPage() {
      if (this.paginationData.currentPage > 1)
        this.paginationData.currentPage--;
      this.fetchBlogs();
    },

    handlePerPageSelect() {
      if (
        this.paginationData.perPage > this.paginationData.total ||
        this.paginationData.currentPage * this.paginationData.perPage >
          this.paginationData.total
      )
        this.paginationData.currentPage = 1;
      this.fetchBlogs();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/_dashboard_blogs.scss";
</style>
