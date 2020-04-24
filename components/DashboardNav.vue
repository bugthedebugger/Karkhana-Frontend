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
      <!-- <li class="nav-link-list-item">
        <a href="#" @click="logout()">
          <Spinner :dark="true" v-if="logoutLoading" />
          <i v-else class="fal fa-sign-out"></i>
          Logout
        </a>
      </li>-->
    </ul>

    <div class="dropdown user-profile-menu mt-auto">
      <button
        class="btn btn-primary dropdown-toggle"
        type="button"
        id="user-profile-button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img class="mr-1" :src="$auth.user.avatar" />
        {{$auth.user.name}}
        <i class="fal fa-angle-up ml-2"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="user-profile-button">
        <a class="dropdown-item" href="#" @click="logout()">
          <Spinner :dark="true" v-if="logoutLoading" />
          <i v-else class="fal fa-sign-out"></i>
          Logout
        </a>
      </div>
    </div>
  </aside>
</template>

<script>
import Spinner from "~/components/Spinner";

export default {
  name: "DashboardNav",
  components: { Spinner },
  data() {
    return {
      activeTab: null,
      minimized: false,
      links: [
        {
          title: "Dashboard",
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
          title: "Tags",
          name: "dashboard-tags",
          icon: "fal fa-align-left",
          url: "/dashboard/tags"
        },

        {
          title: "Pages",
          name: "dashboard-pages",
          icon: "fal fa-copy",
          url: "/dashboard/pages"
        },

        {
          title: "Products",
          name: "dashboard-products",
          icon: "fal fa-copy",
          url: "/dashboard/products"
        },

        {
          title: "Partners",
          name: "dashboard-partners",
          icon: "fal fa-copy",
          url: "/dashboard/partners"
        },

        {
          title: "Team Members",
          name: "team-members",
          icon: "fal fa-copy",
          url: "/dashboard/team-members"
        }
      ],
      logoutLoading: false
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
    checkActiveTab(routeName) {
      this.activeTab = this.links.find(tab => routeName === tab.name);
    },

    async logout() {
      this.logoutLoading = true;
      try {
        await this.$auth.logout();
        this.$router.push({ path: "/" });
        this.logoutLoading = false;
      } catch (error) {
        this.$toast.show("Error loggin out");
      }
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