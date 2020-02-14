<template>
  <div class="create-blog dashboard-content d-flex">
    <div class="post-contents flex-fill">
      <div class="toolbar">
        <h1 class="title">Write Blog Post</h1>
        <div class="toolbar-controls">
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

          <nuxt-link :to="'/blogs/' + uuid" class="btn btn-link mb-2 btn-sm" target="_blank">Preview</nuxt-link>
          <button type="button" class="btn btn-link mb-2 btn-sm" @click="deleteBlog()">Close</button>
          <button
            type="button"
            class="btn btn-primary mb-2 mr-2 btn-sm btn-save"
            @click="updatePost(true)"
            :disabled="saveLoading"
          >
            <Spinner v-if="saveLoading" />
            Saving in {{autosaveCounter}} Secs / Save Now
          </button>
        </div>
      </div>

      <form class="post-form pr-4">
        <div class="form-group mb-4">
          <label for="post-title">Post Title</label>
          <input type="text" class="form-control" id="post-title" v-model="title" />
        </div>

        <!-- <div class="form-group mb-4">
          <label for="post-title">Post Language</label>
          <select class="form-control" v-model="language" v-if="languages && languages.length">
            <option v-for="lang in languages" :value="lang.code" :key="lang.code">{{lang.name}}</option>
          </select>
        </div>-->

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
      </form>
    </div>

    <div class="post-settings">
      <h1 class="title">Gallery Images</h1>
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

export default {
  layout: "dashboard",
  auth: true,
  components: { Editor, FileUpload, Spinner },
  data() {
    return {
      uuid: null,
      title: null,
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
          "formatselect | bold italic backcolor | \
           fontselect | fontsizeselect | alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | image",
        font_formats:
          "Ananda=ananda; Museo=museo; Poppins=Poppins, sans-serif; Raleway=Raleway, sans-serif; Lato=Lato, sans-serif",
        fontsize_formats:
          "8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt 60pt 72pt 90pt",
        image_class_list: [
          { title: "None", value: "" },
          { title: "Responsive", value: "img-fluid" }
        ]
      },
      autosaveTimer: null,
      autosaveCounter: null,
      autosaveCounterTimer: null,
      autosaveInterval: 10,
      languages: null,
      featuredChanged: false,
      featuredForShow: null,
      saveLoading: false,
      publishLoading: false
    };
  },

  created() {
    this.uuid = this.$route.query.uuid;
    this.fetchBlog(() => {
      this.fetchTags();
    });
    this.fetchGallery();
    this.fetchLanguages();
    this.resetSaveTimer();
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

    updatePost(showToast) {
      if (this.saveLoading) return;
      let updateBody = {
        uuid: this.uuid,
        title: this.title,
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
            this.featuredChanged = false;
          }
          this.saveLoading = false;
        })
        .catch(e => {
          if (showToast) this.$toast.show("Error updating blog");
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
        });
    },

    deleteBlog() {
      if (confirm("Are you sure you want to delete this post?"))
        this.$axios.delete(`/admin/blog/delete/${this.uuid}`).then(response => {
          this.$router.push({
            path: "/dashboard/blogs"
          });
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
      this.$axios.get(`/admin/blog/gallery/${this.uuid}`).then(response => {
        this.gallery = response.data.data;
      });
    },

    publishPost() {
      this.publishLoading = true;
      this.$axios.post(`/admin/blog/publish/${this.uuid}`).then(response => {
        this.published = true;
        this.$toast.show("Published");
        this.publishLoading = false;
      });
    },

    unPublishPost() {
      this.publishLoading = true;
      this.$axios.post(`/admin/blog/unpublish/${this.uuid}`).then(response => {
        this.published = false;
        this.$toast.show("Un-published");
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
      this.$axios.get(`/admin/blog/${this.uuid}`).then(response => {
        let data = response.data.data;
        this.title = data.title;
        this.body = data.body;
        this.tags = data.tags || [];
        this.published = data.published;
        this.featured = data.featured;
        this.featuredForShow = data.featured;
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/dashboard_create_blog.scss";
</style>
