<template>
  <div class="create-blog dashboard-content d-flex">
    <div class="post-contents flex-fill">
      <div class="toolbar">
        <h1 class="title">Write Blog Post</h1>
        <div class="toolbar-controls">
          <button
            v-if="published"
            type="button"
            class="btn btn-warning mb-2"
            @click="unPublishPost()"
          >Unpublish</button>

          <button v-else type="button" class="btn btn-primary mb-2" @click="publishPost()">Publish</button>

          <nuxt-link :to="'/blogs/' + uuid" class="btn btn-link mb-2" target="_blank">Preview</nuxt-link>
          <button type="button" class="btn btn-link mb-2" @click="deleteBlog()">Close</button>
          <button type="button" class="btn btn-success mb-2" @click="autosave()">Save</button>
        </div>
      </div>

      <form class="post-form pr-4">
        <div class="form-group mb-4">
          <label for="post-title">Post Title</label>
          <input type="text" class="form-control" id="post-title" v-model="title" />
        </div>

        <div class="form-group mb-4">
          <label for="post-title">Post Language</label>
          <select class="form-control" v-model="language" v-if="languages && languages.length">
            <option v-for="lang in languages" :value="lang.code" :key="lang.code">{{lang.name}}</option>
          </select>
        </div>

        <div class="form-group mb-4">
          <label for="post-featured-image">Featured Image</label>
          <br />
          <button
            type="button"
            class="btn btn-success btn-sm"
            data-toggle="modal"
            data-target="#galleryModal"
          >Select Featured Image</button>
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
          <client-only placeholder="Loading Your Editor...">
            <vue-editor
              v-model="body"
              :editorToolbar="editorToolbarConfig"
              @image-added="handleImageAdded"
            ></vue-editor>
          </client-only>
        </div>
      </form>
    </div>

    <div class="post-settings">
      <h1 class="title">Gallery Images</h1>
      <label>Gallery images</label>
      <FileUpload :uuid="uuid" :filename="featured" @fileUploaded="handleFileUploaded" />
      <hr />
      <div class="d-flex flex-wrap">
        <img
          v-for="(image, index) in gallery"
          :src="image.url"
          :key="index"
          class="gallery-image"
          :class="{'gallery-image-featured': image.url === featured}"
          style="width: 50px; height: 50px; margin: 10px"
          @click="selectFeaturedImage(image.url)"
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
            <!-- Render List of gallery Images here -->
            <div class="d-flex flex-wrap">
              <img
                v-for="(image, index) in gallery"
                :src="image.url"
                :key="index"
                class="gallery-image"
                :class="{'gallery-image-featured': image.path === featured}"
                @click="selectFeaturedImage(image.path)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let VueEditor;
if (process.browser) {
  VueEditor = require("vue2-editor").VueEditor;
}
import FileUpload from "~/components/FileUpload";

export default {
  layout: "dashboard",
  auth: true,
  components: { VueEditor, FileUpload },
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
      editorToolbarConfig: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["link", "image", "video", "formula"],

        ["clean"] // remove formatting button
      ],
      autosaveTimer: null,
      languages: null
    };
  },

  created() {
    this.uuid = this.$route.query.uuid;
    this.fetchBlog(() => {
      this.fetchTags();
    });
    this.fetchGallery();
    this.fetchLanguages();

    this.autosaveTimer = setInterval(() => this.autosave(), 5000);
  },

  destroyed() {
    clearInterval(this.autosaveTimer);
  },

  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {},

    autosave() {
      this.updatePost();
    },

    save() {
      axios.post("/");
    },

    updatePost() {
      this.$axios
        .post(`/admin/blog/create`, {
          uuid: this.uuid,
          title: this.title,
          language: this.language,
          body: this.body,
          featured: this.featured,
          tags: this.tags.map(tag => tag.id)
        })
        .then(response => {
          if (response.data.status === "success") {
            console.log("autosaved");
          }
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

    selectFeaturedImage(imagePath) {
      this.featured = imagePath;
    },

    fetchGallery() {
      this.$axios.get(`/admin/blog/gallery/${this.uuid}`).then(response => {
        this.gallery = response.data.data;
      });
    },

    publishPost() {
      this.$axios.post(`/admin/blog/publish/${this.uuid}`).then(response => {
        this.published = true;
      });
    },

    unPublishPost() {
      this.$axios.post(`/admin/blog/unpublish/${this.uuid}`).then(response => {
        this.published = false;
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
          // debugger;
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
