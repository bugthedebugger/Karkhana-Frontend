<template>
  <div class="tag-wrapper">
    <div v-if="editable"></div>
    <div v-else>
      <div class="tag" v-on:dblclick="editable = true">
        <span class="tag-name"></span>
        <i class="fal fa-times ml-1" @click="deleteTag()"></i>
      </div>
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

  created() {
    if (
      this.$auth.user.roles &&
      this.$auth.user.roles.find(
        role => role.name.toLowerCase() === "superadmin"
      )
    )
      this.links.push({
        title: "User Settings",
        name: "user-settings",
        icon: "fal fa-user",
        url: "/dashboard/user-settings"
      });
    else
      this.links.push({
        title: "Profile",
        name: "dashboard-profile",
        icon: "fal fa-user",
        url: "/dashboard/profile"
      });

    this.checkActiveTab(this.$route.name);
  },

  methods: {
    deleteTag() {
      if (prompt("Are you sure ?", "Delete Tag")) {
        this.$emit("deleted");
      }
    },

    editTag(id) {
      this.$emit("edited");
      this.editable = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_dashboard_nav.scss";
</style>