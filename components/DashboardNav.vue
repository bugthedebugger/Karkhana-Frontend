<template>
  <aside class="dashboard-nav">
    <div class="nav-logo">
      <img src="/images/logo-nav.png" />
    </div>
    <ul class="no-bullets nav-link-list">
      <li
        v-for="(link, index) in links"
        class="nav-link-list-item"
        :class="{'nav-link-list-item-selected': activeTab === link}"
        :key="index"
      >
        <nuxt-link :to="link.url">
          <i :class="link.icon"></i>
          {{link.title}}
        </nuxt-link>
      </li>
      <li class="nav-link-list-item">
        <a @click="logout()">
          <i class="fal fa-sign-out"></i>
          Logout
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "DashboardNav",
  data() {
    return {
      activeTab: null,
      links: [
        {
          title: "Dashbaord",
          name: "dashboard",
          icon: "fal fa-tachometer-alt",
          url: "/dashboard"
        },
        {
          title: "Blog Posts",
          name: "dashboard-blogs",
          icon: "fal fa-align-left",
          url: "/dashboard/blogs"
        },
        {
          title: "Pages",
          name: "dashboard-pages",
          icon: "fal fa-copy",
          url: "/dashboard/pages"
        },
        {
          title: "Settings",
          name: "dashboard-settings",
          icon: "fal fa-cog",
          url: "/dashboard/settings"
        }
      ]
    };
  },

  created() {
    this.checkActiveTab(this.$route.name);
  },

  methods: {
    checkActiveTab(routeName) {
      this.activeTab = this.links.find(tab => routeName === tab.name);
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push({ path: "/" });
    }
  },

  watch: {
    $route(to, from) {
      this.checkActiveTab(to.name);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_dashboard_nav.scss";
</style>