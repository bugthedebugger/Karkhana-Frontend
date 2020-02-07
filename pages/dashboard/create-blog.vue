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
          <div class="post-tags form-control">
            <div class="selected-tag" v-for="tag in tags" :key="tag.id">
              {{tag.title}}
              <i class="fal fa-times" @click="removeTag(tag)"></i>
            </div>
          </div>
          <div class="tags-container d-flex">
            <div
              class="tag"
              v-for="tag in defaultTags"
              :key="tag.id"
              @click="addTag(tag)"
            >{{tag.title}}</div>
          </div>
        </div>

        <div class="form-group">
          <label for="post-text"></label>
          <textarea class="form-control" rows="10"></textarea>
        </div>
      </form>
    </div>

    <div class="post-settings">
      <h1 class="title">Post Settings</h1>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  components: {},
  data() {
    return {
      tags: [],
      defaultTags: [
        {
          id: 1,
          title: "Education"
        },
        {
          id: 2,
          title: "Nepal"
        },
        {
          id: 3,
          title: "Computing"
        }
      ],
      mode: "Create"
    };
  },

  methods: {
    autosave() {},

    addTag(tag) {
      this.tags.push(tag);
      this.defaultTags.splice(this.defaultTags.indexOf(tag), 1);
    },

    removeTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.defaultTags.push(tag);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/dashboard_create_blog.scss";
</style>
