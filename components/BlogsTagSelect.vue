<template>
  <div class="tags-select">
    <button
      type="button"
      class="dropdown-toggle tags-dropdown-toggle align-self-center d-flex"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <span class="label">Search by Tags |</span>
      <span class="selected-tag ml-1" v-if="selectedTag">{{selectedTag.name}}</span>
      <span class="ml-auto"></span>
    </button>

    <perfect-scrollbar class="dropdown-menu tags-dropdown-menu w-100">
      <div class="tags-list d-flex flex-wrap">
        <div
          class="tags-list-item"
          v-for="tag in tags"
          :key="tag.id"
          @click="selectTag(tag)"
        >{{tag.name}}</div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
export default {
  name: "BlogsTagSelect",
  components: { PerfectScrollbar },

  props: {
    tags: Array,
    value: null
  },
  data() {
    return {
      selectedTag: null
    };
  },

  created() {
    if (this.value) this.selectTag(this.tags.find(tag => tag.id == this.value));
    else this.selectTag(this.tags[0]);
  },

  methods: {
    selectTag(tag) {
      this.selectedTag = tag;
      this.$emit("input", tag.id);
      this.$emit("tagSelected");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_blog_tag_select.scss";
</style>