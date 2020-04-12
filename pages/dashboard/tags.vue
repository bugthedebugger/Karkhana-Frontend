<template>
  <div class="dashboard-content">
    <div class="toolbar">
      <h1 class="title">Tags</h1>
    </div>

    <div class="container-card">
      <div v-if="tags">
        <EditableTag v-for="(tag, index) in tags" :key="index" />
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
        this.tags = response.data.data;
      });
    },

    deleteTag(id) {
      if (confirm("Are you sure you want to delete this tag ?"))
        this.$axios.delete(`/admin/blog/delete/${uuid}`).then(response => {
          this.blogPosts.splice(index, 1);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/_dashboard_tags.scss";
</style>
