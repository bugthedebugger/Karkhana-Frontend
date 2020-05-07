<template>
  <aside class="dashboard-nav" :class="{'--minimized': mode}">
    <div class="nav-logo d-flex justify-content-between">
      <img src="/images/logo-nav.png" class="align-self-center" />

      <button class="btn btn-default align-self-center pl-2 pr-2" @click="toggleDashNav()">
        <i class="fal fa-bars"></i>
      </button>
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
          <span>{{link.title}}</span>
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

    <div class="dropdown user-profile-menu mt-auto" :class="{'btn-group dropright': mode}">
      <button
        class="btn btn-primary dropdown-toggle"
        :class="{'pl-2 pr-2': mode}"
        type="button"
        id="user-profile-button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img class="mr-1" :src="$auth.user.avatar" />
        <span class="username">{{$auth.user.name}}</span>
        <i class="fal ml-2" :class="{'fa-angle-up': !mode, 'fa-angle-right': mode}"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="user-profile-button" style="z-index: 1000">
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
      mode: false,
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
          icon: "fal fa-tags",
          url: "/dashboard/tags"
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
      this.links.push(
        {
          title: "Pages",
          name: "dashboard-pages",
          icon: "fal fa-copy",
          url: "/dashboard/pages"
        },

        {
          title: "Products",
          name: "dashboard-products",
          icon: "fal fa-sitemap",
          url: "/dashboard/products"
        },

        {
          title: "Partners",
          name: "dashboard-partners",
          icon: "fal fa-users-crown",
          url: "/dashboard/partners"
        },

        {
          title: "Team Members",
          name: "dashboard-team-members",
          icon: "fal fa-users-class",
          url: "/dashboard/team-members"
        },

        {
          title: "User Settings",
          name: "dashboard-user-settings",
          icon: "fal fa-users-cog",
          url: "/dashboard/user-settings"
        }
      );
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
    toggleDashNav() {
      this.mode = !this.mode;
    },

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
      console.log(to.name);
      this.checkActiveTab(to.name);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_dashboard_nav.scss";
</style>