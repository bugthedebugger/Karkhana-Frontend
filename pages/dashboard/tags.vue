<template>
  <div class="dashboard-content">
    <div class="toolbar">
      <h1 class="title">Tags</h1>
    </div>

    <div class="container-card">
      <div v-if="tags">
        <div class="tags-container d-flex" v-for="(item, key, index) in tags" :key="index">
          <h2 class="mr-4">{{upperCaseKey(key) + key}}</h2>
          <div class="d-flex flex-wrap mb-4 ml-4">
            <EditableTag
              v-for="(tag, index) in item"
              :key="index"
              :tag="tag"
              @edited="(newName) => handleEdit(newName, tag.id)"
              @deleted="handleDelete(tag.id)"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <Loading />
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import Loading from "~/components/Loading";
import EditableTag from "~/components/DashboardEditableTag";

export default {
  layout: "dashboard",
  auth: true,
  components: { Loading, EditableTag },
  data() {
    return {
      tags: null
    };
  },

  created() {
    this.fetchTags();
  },

  methods: {
    fetchTags() {
      this.tags = null;
      this.$axios.get(`/admin/tags?per_page=1000`).then(response => {
        let tags = response.data.data;
        let tagData = {};
        // arrange by alphabetical order
        tags.forEach(tag => {
          let key = tag.name[0].toLowerCase();
          if (tagData[key]) tagData[key].push(tag);
          else tagData[key] = [tag];
        });

        let sortedTagData = {};
        Object.keys(tagData)
          .sort()
          .forEach(key => {
            sortedTagData[key] = tagData[key];
          });
        this.tags = sortedTagData;
      });
    },

    handleDelete(id) {
      if (confirm("Are you sure you want to delete this tag ?"))
        this.$axios.delete(`/admin/tags/delete/${id}`).then(response => {
          this.fetchTags();
        });
    },

    handleEdit(newName, id) {
      console.log("edit " + newName);
      this.$axios.delete(`/admin/tags/delete/${id}`).then(response => {
        this.fetchTags();
      });
    },

    // deleteTag(id) {
    //   if (confirm("Are you sure you want to delete this tag ?"))
    //     this.$axios.delete(`/admin/tags/delete/${id}`).then(response => {
    //       this.fetchTags();
    //     });
    // },

    upperCaseKey(key) {
      if (key.length > 0 && key.match(/[a-z]/i)) return key.toUpperCase();
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/_dashboard_tags.scss";
</style>
