<template>
  <div class="dashboard-content">
    <h1 class="title">Pages</h1>

    <div class="container-card">
      <div v-if="pages">
        <table class="table table-borderless">
          <tr v-for="(page, index) in pages" :key="index">
            <td>
              <nuxt-link :to="'/dashboard/pages/' + page.code">{{page.name}}</nuxt-link>
            </td>
          </tr>
        </table>
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

export default {
  layout: "dashboard",
  auth: true,
  components: { Loading },
  data() {
    return {
      pages: null
    };
  },

  created() {
    this.fetchPages();
  },

  methods: {
    fetchPages() {
      this.pages = null;
      this.$axios.get("/pages").then(response => {
        this.pages = response.data.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/_dashboard_blogs.scss";
</style>
