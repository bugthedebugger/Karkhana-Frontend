<template>
  <div class="create-blog dashboard-content d-flex">
    <div v-if="!blogLoading" class="post-contents flex-fill">
      <div class="toolbar">
        <h1 class="title">Write Blog Post</h1>
        <div class="toolbar-controls">
          <template v-if="!newBlogPost">
            <button
              v-if="published"
              type="button"
              class="btn btn-warning mb-2 btn-sm"
              @click="unPublishPost()"
              :disabled="publishLoading"
            >
              <Spinner v-if="publishLoading" />Unpublish
            </button>

            <button
              v-else
              type="button"
              class="btn btn-primary mb-2 btn-sm"
              @click="publishPost()"
              :disabled="publishLoading"
            >
              <Spinner v-if="publishLoading" />Publish
            </button>

            <nuxt-link
              :to="'/blogs/' + (slug ? slug : uuid)"
              class="btn btn-link mb-2 btn-sm"
              target="_blank"
            >Preview</nuxt-link>
            <nuxt-link to="/dashboard/blogs" class="btn btn-link mb-2 btn-sm">Close</nuxt-link>
          </template>

          <button
            type="button"
            class="btn btn-primary mb-2 mr-2 btn-sm"
            :class="{'btn-save' : !newBlogPost}"
            @click="newBlogPost ? createPost() : updatePost(true)"
            :disabled="saveLoading || !saveValid"
          >
            <Spinner v-if="saveLoading" />

            <template v-if="autosaveStatus">Saving in {{autosaveCounter}} Secs / Save Now</template>

            <template v-else>Save</template>
          </button>
        </div>
      </div>

      <form class="post-form pr-4">
        <div class="form-group mb-4">
          <label for="post-title">Post Title</label>
          <input type="text" class="form-control" id="post-title" v-model="title" />
        </div>

        <div class="form-group mb-4">
          <label for="post-slug">Post Slug</label>
          <input type="text" class="form-control" id="post-slug" v-model="slug" />
        </div>

        <div class="form-group mb-4">
          <label for="post-title">Post Language</label>
          <select class="form-control" v-model="language" v-if="languages && languages.length">
            <option v-for="lang in languages" :value="lang.code" :key="lang.code">{{lang.name}}</option>
          </select>
        </div>

        <div v-if="!newBlogPost">
          <div class="form-group mb-4">
            <label for="post-featured-image">Featured Image</label>
            <br />
            <img
              v-if="featured"
              :src="featuredForShow"
              class="gallery-image gallery-image-featured"
              data-toggle="modal"
              data-target="#galleryModal"
            />
            <br />
            <button
              type="button"
              class="btn btn-success btn-sm"
              data-toggle="modal"
              data-target="#galleryModal"
            >
              <span v-if="featured">Change featured image</span>
              <span v-else>Select featured image</span>
            </button>
          </div>

          <div class="form-group mb-4">
            <label for="post-tags">Tags</label>
            <div class="post-tags d-flex flex-wrap">
              <div class="selected-tag d-flex align-self-center" v-for="tag in tags" :key="tag.id">
                {{tag.name}}
                <i class="fal fa-times" @click="removeTag(tag)"></i>
              </div>

              <input
                type="text"
                class="flex-fill"
                v-model="inputTag"
                @keyup.enter="createTag()"
                placeholder="Add tag"
              />
            </div>
            <div class="tags-container d-flex flex-wrap">
              <div
                class="tag"
                v-for="tag in defaultTags"
                :key="tag.id"
                @click="addTag(tag)"
              >{{tag.name}}</div>
            </div>
          </div>

          <div class="form-group mb-4">
            <label for="post-text">Post Text</label>
            <editor v-model="body" api-key="process.env.TINY_MCE_API_KEY" :init="tinyMceConfig" />
          </div>
        </div>
      </form>
    </div>
    <div v-else>
      <Loading />
    </div>

    <div v-if="!galleryLoading" class="post-settings">
      <h1 class="title">Gallery Images</h1>

      <div v-if="!newBlogPost">
        <label>Select Gallery images</label>
        <FileUpload :uuid="uuid" :filename="featured" @fileUploaded="handleFileUploaded" />
        <hr />
        <div class="d-flex flex-wrap">
          <img
            v-for="(image, index) in gallery"
            :src="image.url"
            :key="index"
            class="gallery-image"
            @click="copyGalleryPath(image.url)"
          />
        </div>
      </div>
    </div>

    <div v-else>
      <Loading />
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="galleryModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="galleryModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Select Featured Image</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex flex-wrap">
              <img
                v-for="(image, index) in gallery"
                :src="image.url"
                :key="index"
                class="gallery-image"
                :class="{'gallery-image-featured': image.url === featuredForShow}"
                @click="selectFeaturedImage(image)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Editor from "@tinymce/tinymce-vue";
import FileUpload from "~/components/FileUpload";
import clipboard from "clipboard-polyfill";
import Spinner from "~/components/Spinner";
import Loading from "~/components/Loading";

export default {
  layout: "dashboard",
  auth: true,
  components: { Editor, FileUpload, Spinner, Loading },
  data() {
    return {
      newBlogPost: false,
      uuid: null,
      title: null,
      slug: null,
      language: "en",
      body: null,
      published: null,
      featured: null,
      gallery: [],
      tags: [],
      defaultTags: [],
      inputTag: null,
      tinyMceConfig: {
        height: 800,
        menubar: true,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount"
        ],
        toolbar:
          "blockquote | formatselect | bold italic backcolor | \
           fontselect | alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | image",
        font_formats:
          "Ananda=ananda; Museo=museo; Poppins=Poppins, sans-serif; Raleway=Raleway, sans-serif; Lato=Lato, sans-serif",
        image_class_list: [
          { title: "None", value: "img-fluid" },
          { title: "Responsive", value: "img-fluid" }
        ]
      },

      autosaveStatus: true,
      autosaveTimer: null,
      autosaveCounter: null,
      autosaveCounterTimer: null,
      autosaveInterval: 30,
      languages: null,
      featuredChanged: false,
      featuredForShow: null,
      saveLoading: false,
      publishLoading: false,
      blogLoading: false,
      galleryLoading: false
    };
  },

  created() {
    this.uuid = this.$route.query.uuid;

    if (this.uuid === "new-blog-post") {
      // values are default and only changed if new-blog-post
      this.newBlogPost = true;
      this.autosaveStatus = false;
    } else {
      this.fetchBlog(() => {
        this.fetchTags();
      });

      // this.resetSaveTimer();
      this.autosaveStatus = false;
    }

    this.fetchLanguages();
    this.fetchGallery();
  },

  destroyed() {
    clearInterval(this.autosaveTimer);
  },

  methods: {
    resetSaveTimer() {
      // autosave timer
      clearInterval(this.autosaveTimer);
      this.autosaveTimer = setInterval(
        () => this.autosave(),
        this.autosaveInterval * 1000
      );

      // autosave counter timer
      clearInterval(this.autosaveCounterTimer);
      this.autosaveCounter = this.autosaveInterval;
      this.autosaveCounterTimer = setInterval(
        () => (this.autosaveCounter = Math.max(--this.autosaveCounter, 0)),
        1000
      );
    },

    copyGalleryPath(path) {
      clipboard.writeText(path);
      this.$toast.show("Image copied to clipboard");
    },

    autosave() {
      this.updatePost();
    },

    save() {
      axios.post("/");
    },

    createPost() {
      this.saveLoading = true;
      this.$axios.get("/admin/blog/uuid").then(response => {
        this.uuid = response.data.data.uuid;
        let createBody = {
          uuid: this.uuid,
          title: this.title,
          language: "en"
        };
        if (this.slug) createBody.slug = this.slug;

        this.$axios
          .post("/admin/blog/create", createBody)
          .then(response => {
            if (response.data.status === "success") {
              this.$toast.show("Blog created");
              this.autosaveStatus = true;
              this.newBlogPost = false;
              this.fetchBlog(() => {
                this.fetchTags();
              });
              this.resetSaveTimer();
              this.saveLoading = false;
            }
          })
          .catch(error => {
            this.displayError(error);
            this.saveLoading = false;
          });
      });
    },

    updatePost(showToast) {
      if (this.saveLoading) return;
      let updateBody = {
        uuid: this.uuid,
        title: this.title,
        slug: this.slug,
        language: "en",
        body: this.body,
        tags:
          this.tags && this.tags.length ? this.tags.map(tag => tag.id) : null
      };
      if (this.featuredChanged) updateBody.featured = this.featured;
      this.saveLoading = true;
      this.$axios
        .post(`/admin/blog/create`, updateBody)
        .then(response => {
          if (response.data.status === "success") {
            this.resetSaveTimer();
            if (showToast) this.$toast.show("Saved successfully");
            // track featured image changes
            this.featuredChanged = false;
          }
          this.saveLoading = false;
        })
        .catch(e => {
          if (showToast) this.displayError(e);
          this.saveLoading = false;
        });
    },

    createTag() {
      //check if already exists
      let existingTag = this.defaultTags.find(t => t.name === this.inputTag);
      if (existingTag) {
        this.addTag(existingTag);
        this.inputTag = null;
        return;
      }

      this.$axios
        .post("/admin/tags/store", {
          tag: this.inputTag,
          language: "en"
        })
        .then(response => {
          if (response.data.status === "success") {
            this.addTag({ id: Math.random(), name: this.inputTag }, false);
            this.inputTag = null;
          }
        })
        .catch(error => {
          this.displayError(error);
        });
    },

    deleteBlog() {
      if (confirm("Are you sure you want to delete this post?"))
        this.$axios
          .delete(`/admin/blog/delete/${this.uuid}`)
          .then(response => {
            this.$router.push({
              path: "/dashboard/blogs"
            });
          })
          .catch(error => {
            this.displayError(error);
          });
    },

    handleFileUploaded() {
      this.fetchGallery();
    },

    selectFeaturedImage(image) {
      this.featured = image.path;
      this.featuredChanged = true;
      this.featuredForShow = image.url;
      $("#galleryModal").modal("hide");
    },

    fetchGallery() {
      this.galleryLoading = true;
      this.$axios.get(`/admin/blog/gallery/${this.uuid}`).then(response => {
        this.gallery = response.data.data;
        this.galleryLoading = false;
      });
    },

    publishPost() {
      this.publishLoading = true;
      this.$axios
        .post(`/admin/blog/publish/${this.uuid}`)
        .then(response => {
          this.published = true;
          this.$toast.show("Published");
          this.publishLoading = false;
        })
        .catch(error => {
          this.displayError(error);
          this.publishLoading = false;
        });
    },

    unPublishPost() {
      this.publishLoading = true;
      this.$axios
        .post(`/admin/blog/unpublish/${this.uuid}`)
        .then(response => {
          this.published = false;
          this.$toast.show("Un-published");
          this.publishLoading = false;
        })
        .catch(error => {
          this.displayError(error);
          this.publishLoading = false;
        });
    },

    addTag(tag, removeFromDefault = true) {
      this.tags.push(tag);
      if (removeFromDefault)
        this.defaultTags.splice(this.defaultTags.indexOf(tag), 1);
    },

    removeTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.defaultTags.push(tag);
    },

    fetchBlog(callback) {
      this.blogLoading = true;
      this.$axios.get(`/admin/blog/${this.uuid}`).then(response => {
        let data = response.data.data;
        this.title = data.title;
        this.slug = data.slug;
        this.body = data.body;
        this.tags = data.tags || [];
        this.published = data.published;
        this.featured = data.featured;
        this.featuredForShow = data.featured;
        this.blogLoading = false;
        callback();
      });
    },

    fetchLanguages(callback) {
      this.$axios.get("/languages").then(response => {
        this.languages = response.data.data;
      });
    },

    fetchTags() {
      this.$axios.get(`/admin/tags?per_page=100`).then(response => {
        if (response.data.message === "success") {
          this.defaultTags = [];
          let tags = response.data.data;
          tags.forEach(tag => {
            if (!this.tags.find(t => t.id === tag.id))
              this.defaultTags.push(tag);
          });
        }
      });
    },

    displayError(errorObj) {
      if (errorObj.response.data.message) {
        this.$toast.show(errorObj.response.data.message);
      } else {
        let errors = Object.values(errorObj.response.data);
        errors.forEach(error => this.$toast.show(error));
      }
    }
  },

  computed: {
    saveValid() {
      return (
        this.title &&
        this.title.length > 0 &&
        this.language &&
        this.language.length > 0
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/dashboard_create_blog.scss";
</style>
