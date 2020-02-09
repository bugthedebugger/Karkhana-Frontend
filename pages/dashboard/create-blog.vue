<template>
  <div class="create-blog dashboard-content d-flex">
    <div class="post-contents flex-fill">
      <div class="toolbar">
        <h1 class="title">Write Blog Post</h1>
        <div class="toolbar-controls">
          <button type="button" class="btn btn-primary mb-2">Publish</button>
          <button type="button" class="btn btn-link mb-2">Preview</button>
          <button type="button" class="btn btn-link mb-2">Close</button>
        </div>
      </div>

      <form class="post-form pr-4">
        <div class="form-group">
          <label for="post-title">Post Title</label>
          <input type="text" class="form-control" id="post-title" placeholder />
        </div>

        <div class="form-group">
          <label for="post-tags">Tags</label>
          <div class="post-tags d-flex flex-wrap">
            <div class="selected-tag d-flex align-self-center" v-for="tag in tags" :key="tag.id">
              {{tag.name}}
              <i class="fal fa-times" @click="removeTag(tag)"></i>
            </div>

            <input type="text" class="flex-fill" v-model="inputTag" @keyup.enter="createTag()" placeholder="Add tag" />
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

        <div class="form-group">
          <label for="post-text"></label>
          <no-ssr placeholder="Loading Your Editor...">
            <vue-editor v-model="content" :editorToolbar="editorToolbarConfig"></vue-editor>
          </no-ssr>
        </div>
      </form>
    </div>

    <div class="post-settings">
      <h1 class="title">Post Settings</h1>
    </div>
  </div>
</template>
<script>
let VueEditor;
if (process.browser) {
  VueEditor = require("vue2-editor").VueEditor;
}

export default {
  layout: "dashboard",
  components: { VueEditor },
  data() {
    return {
      uuid: null,
      title: null,
      content: null,
      tags: [],
      defaultTags: [],
      inputTag: null,
      mode: 0, // 0: Create, 1: Edit
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

        ["clean"] // remove formatting button
      ],
      autosaveTimer: null
    };
  },

  created() {
    this.uuid = this.$route.query.uuid;
    this.fetchTags();
    this.autosaveTimer = setInterval(() => this.autosave(), 5000);
  },

  methods: {
    autosave() {},

    save() {
      axios.post("/");
    },

    updatePost() {
      this.$axios
        .post(`/admin/blog/update/${this.uuid}`, {
          title: this.title
        })
        .then(response => {
          if (response.data.status === "success") {
          }
        });
    },

    createTag() {
      this.$axios
        .post("/admin/tags/store", {
          tag: this.inputTag
        })
        .then(response => {
          if (response.data.status === "success") {
            this.addTag({ id: Math.random(), name: this.inputTag }, false);
            this.inputTag = null;
          }
        });
    },

    publishPost(uuid) {
      this.$axios.post(`/admin/blog/${this.uuid}/publish`).then(response => {});
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

    fetchTags() {
      this.$axios.get(`/admin/tags?per_page=100`).then(response => {
        if (response.data.message === "success")
          this.defaultTags = response.data.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/dashboard_create_blog.scss";
</style>
