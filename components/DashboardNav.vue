<template>
  <aside class="dashboard-nav">
    <div class="nav-logo">
      <img src="/images/logo-nav.png" />
    </div>
    <ul class="no-bullets nav-link-list">
      <li v-for="(link, index) in links" class="nav-link-list-item" :key="index">
        <nuxt-link :to="link.url">
          <i :class="link.icon"></i>
          {{link.title}}
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "DashboardNav",
  data() {
    return {
      links: [
        {
          title: "Dashbaord",
          icon: "fal fa-tachometer-alt",
          url: "/dashboard"
        },
        { title: "Blog Posts", icon: "fal fa-align-left", url: "/blog-posts" },
        { title: "Pages", icon: "fal fa-copy", url: "/pages" },
        { title: "Settings", icon: "fal fa-cog", url: "/settings" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_dashboard_nav.scss";
</style>