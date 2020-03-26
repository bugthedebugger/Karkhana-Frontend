<template>
  <div class="blogs">
    <div class="row">
      <div class="col-12">
        <div :class="{'container': !isMobile, 'container-fluid': isMobile}">
          <div class="blog-tabs d-flex justify-content-center justify-content-md-start">
            <div
              v-for="cat in fetchCategories"
              :key="cat"
              class="tab"
              :class="{'tab-selected': selectedFetchCategory === cat}"
              @click="selectFetchCategory(cat)"
            >{{cat}}</div>
          </div>

          <div v-if="blogPosts && blogPosts.length > 0">
            <div class="blog-posts d-flex flex-wrap justify-content-center">
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
            <div class="mt-4 mb-4 text-center d-flex justify-content-center" v-if="loadingMoreBlog">
              <Spinner :dark="true" />Loading more...
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
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "~/components/Footer";
import moment from "moment";
import Spinner from "~/components/Spinner";

export default {
  layout: "portfolio",
  auth: false,
  components: { Footer, Spinner },
  data() {
    return {
      fetchCategories: ["Latest"],
      selectedFetchCategory: "Latest",
      blogPosts: null,
      tags: null,
      isMobile: false,
      loadingMoreBlog: false
    };
  },

  created() {
    // this.fetchTags();
    // console.log(this.blogPosts);
  },

  mounted() {
    this.applyEqualHeightRule();
    if (process.client) {
      $(window).resize(() => {
        this.checkIfMobile();
      });
      this.checkIfMobile();

      $(window).scroll(() => {
        this.loadMoreBlogs();
      });
      this.loadMoreBlogs();
    }
  },

  async asyncData({ $axios, params }) {
    const response = await $axios.get(`/blog?per_page=10&page=1`);
    return {
      blogPosts: response.data.data,
      paginationData: {
        perPage: 10,
        currentPage: 1,
        firstPage: response.data.from,
        lastPage: response.data.last_page,
        from: response.data.from,
        to: response.data.to,
        total: response.data.total
      }
    };
  },

  methods: {
    checkIfMobile() {
      this.isMobile = $(window).width() < 768;
    },

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

    fetchBlogs(concat) {
      this.loadingMoreBlog = true;
      this.$axios
        .get(
          `/blog?per_page=${this.paginationData.perPage}&page=${this.paginationData.currentPage}`
        )
        .then(response => {
          if (concat)
            this.blogPosts = this.blogPosts.concat(response.data.data);
          else this.blogPosts = response.data.data;

          // Pagination Data
          this.paginationData.firstPage = response.data.from;
          this.paginationData.lastPage = response.data.last_page;
          this.paginationData.from = response.data.from;
          this.paginationData.to = response.data.to;
          this.paginationData.total = response.data.total;

          this.loadingMoreBlog = false;
        });
    },

    formatCreatedAt(date) {
      return moment(date).format("Do MMMM YYYY");
    },

    loadMoreBlogs() {
      if (
        
        ($(window).scrollTop() + $(window).height() >=
          $(document).height() - $("#footer").height() &&
          !this.loadingMoreBlog)
      )
        this.nextPage();
    },

    nextPage() {
      if (this.paginationData.currentPage < this.paginationData.lastPage) {
        this.paginationData.currentPage++;
        this.fetchBlogs(true);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/blogs.scss";
</style>
