<template>
  <div class="tag-wrapper">
    <div class="tag d-flex" v-on:dblclick="editable = true" :class="{'--editable': editable}">
      <div
        class="tag-name align-self-center"
        :contenteditable="editable"
        @keypress.enter="editTag"
        @input="updateInput"
      >{{tag.name}}</div>
      <i class="fal fa-times align-self-center ml-2" @click="deleteTag()"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardNav",
  components: {},
  props: {
    tag: Object
  },
  data() {
    return {
      editable: false,
      tagInput: this.tag.name
    };
  },

  created() {},

  methods: {
    updateInput() {
      this.tagInput = this.$el.innerText;
    },

    deleteTag() {
      if (this.editable) {
        this.editable = false;
        return;
      }

      if (confirm("Are you sure you want to delete tag ?")) {
        this.$emit("deleted");
      }
    },

    editTag(e) {
      this.$emit("edited", this.tagInput);
      this.editable = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/dashboard/_editable_tag.scss";
</style>