<template>
  <div class="blogs">
    <div class="container">
      <div class="blog-tabs d-flex">
        <div
          v-for="cat in fetchCategories"
          :key="cat"
          class="tab"
          :class="{'tab-selected': selectedFetchCategory === cat}"
          @click="selectFetchCategory(cat)"
        >{{cat}}</div>
      </div>

      <!-- <div class="blog-posts">
        <div class="d-flex">
          <div class="col-md-6 pl-0 pr-0">
            <div
              class="blog-post"
              :style="'background-image: url(' + 'https://source.unsplash.com/random' + ')'"
              @click="navigateTo('uuid')"
            >
              <div class="overlay"></div>
              <div class="blog-details">
                <div class="author-info-container d-flex">
                  <div
                    class="author-image"
                    :style="'background-image: url(' + 'https://worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg' + ')'"
                  ></div>
                  <div class="author-info align-self-center">
                    Bibhuti Poudyal
                    <br />18th Jan 2020, 15 min read
                  </div>
                </div>
                <p class="blog-title">This is the title of the blog</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 pl-0 pr-0">
            <div class="d-flex">
              <div>
                <div class="blog-post-alt">
                  <div
                    @click="navigateTo('uuid')"
                    class="blog-image"
                    :style="'background-image: url(' + 'https://source.unsplash.com/random' + ')'"
                  >
                    <div class="overlay"></div>
                    <div class="author-info-container d-flex">
                      <div
                        class="author-image"
                        :style="'background-image: url(' + 'https://worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg' + ')'"
                      ></div>
                      <div class="author-info align-self-center">
                        Bibhuti Poudyal
                        <br />18th Jan 2020, 15 min read
                      </div>
                    </div>
                  </div>

                  <div class="blog-details">
                    <p class="blog-title">This is the title of the post</p>
                    <p class="blog-brief">
                      In our work we try to go past what we already know and break new ground.
                      We have a commitment to relentlessly looking for the real edge of ...
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div class="blog-post-alt">
                  <div
                    @click="navigateTo('uuid')"
                    class="blog-image"
                    :style="'background-image: url(' + 'https://source.unsplash.com/random' + ')'"
                  >
                    <div class="overlay"></div>
                    <div class="author-info-container d-flex">
                      <div
                        class="author-image"
                        :style="'background-image: url(' + 'https://worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg' + ')'"
                      ></div>
                      <div class="author-info align-self-center">
                        Bibhuti Poudyal
                        <br />18th Jan 2020, 15 min read
                      </div>
                    </div>
                  </div>

                  <div class="blog-details">
                    <p class="blog-title">This is the title of the post</p>
                    <p class="blog-brief">
                      In our work we try to go past what we already know and break new ground.
                      We have a commitment to relentlessly looking for the real edge of ...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>-->

      <div class="blog-posts d-flex flex-wrap justify-content-between">
        <div
          class="blog-post-alt"
          v-for="blogPost in blogPosts"
          :key="blogPost.uuid"
          @click="navigateTo(blogPost.uuid)"
        >
          <div class="blog-image" :style="setBackgroundImage(blogPost.featured)">
            <div class="overlay"></div>
            <div class="author-info-container d-flex">
              <!-- <div
                class="author-image"
                :style="'background-image: url(' + 'https://worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg' + ')'"
              ></div>-->
              <div class="author-info align-self-center">
                <!-- {{blogPost.author}} -->
                <!-- <br /> -->
                {{formatCreatedAt(blogPost.created_at)}}
                <!-- , {{parseInt(blogPost.read_time) || 0}} min read -->
              </div>
            </div>
          </div>

          <div class="blog-details">
            <p class="blog-title">{{utf8Decode(blogPost.title)}}</p>
            <!-- <p
              class="blog-brief"
            >{{utf8Decode(blogPost.summary).length > 1 ? utf8Decode(blogPost.summary) + "..." : ""}}</p>-->
          </div>
        </div>
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
      blogPosts: [],
      tags: null
    };
  },

  created() {
    this.fetchTags();
    this.fetchBlogs();
  },

  methods: {
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
        console.log("URI error");
        return "";
      }
    },

    selectFetchCategory(cat) {
      this.selectedFetchCategory = cat;
    },

    navigateTo(uuid) {
      this.$router.push({
        path: "/blogs/" + uuid
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
