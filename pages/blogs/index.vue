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

      <div class="blog-posts">
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
      </div>

      <div class="row">
        <div class="col">
          <div class="tags-container">
            <p class="title">
              Tags
              <span class="tags-count">({{tags.length}})</span>
            </p>

            <div v-for="tag in tags" :key="tag.id" class="tag">{{tag.title}}</div>
          </div>
        </div>
      </div>

      <div class="row mt-4 mb-4">
        <div class="col text-center">
          <button class="btn btn-primary">
            <i class="fal fa-sync"></i>&nbsp;
            Load More
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "~/components/Footer";
export default {
  layout: "portfolio",
  // auth: false,
  components: { Footer },
  data() {
    return {
      fetchCategories: ["Recommended", "Latest"],
      selectedFetchCategory: "Recommended",
      blogPosts: [
        {
          uuid: "asdsd",
          title: "This is the title of the blog post",
          author: "Bibhuti Poudyal",
          author_image_url:
            "https://worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg",
          created_at: "Jan 20, 2020",
          read_time: "15 min",
          brief: ""
        }
      ],
      tags: [
        { id: 1, title: "karkhana" },
        { id: 2, title: "Computing" },
        { id: 3, title: "make" },
        { id: 4, title: "science" },
        { id: 5, title: "Nepal" }
      ]
    };
  },

  methods: {
    selectFetchCategory(cat) {
      this.selectedFetchCategory = cat;
    },

    navigateTo(uuid) {
      this.$router.push({
        path: "/blogs/asdasd"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/blogs.scss";
</style>
