<template>
  <div class="dashboard-content">
    <div class="toolbar">
      <h1 class="title">Partners</h1>
      <div class="toolbar-controls">
        <button type="button" class="btn btn-primary mb-2" @click="createpartner()">
          <i class="fal fa-plus"></i> &nbsp;
          New Partner
        </button>
      </div>
    </div>

    <div class="container-card">
      <div v-if="partners">
        <div v-if="partners.length">
          <table class="table table-borderless partner-list">
            <tr
              v-for="(partner, index) in partners"
              :key="partner.uuid"
              class="dashboard-list-item"
            >
              <td valign="middle">
                <img :src="partner.logo.path" width="50" height="50" />
              </td>
              <td valign="middle">{{partner.name}}</td>
              <td valign="middle">
                <div class="controls d-flex">
                  <!-- <div class="btn-view mr-2">
                    <nuxt-link :to="'/partners/' + partner.id" target="_blank">
                      <i class="fal fa-eye"></i>
                    </nuxt-link>
                  </div>-->
                  <div class="btn-edit mr-2">
                    <nuxt-link :to="'create-partner?id=' + partner.id">
                      <i class="fal fa-edit"></i>
                    </nuxt-link>
                  </div>
                  <div class="btn-delete" @click="deletepartner(partner.id, index)">
                    <a href="#">
                      <i class="fal fa-trash-alt"></i>
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div v-else>No partners found</div>
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
      partners: null
    };
  },

  created() {
    this.fetchpartners();
  },

  methods: {
    createpartner() {
      this.$router.push({
        path: "/dashboard/create-partner",
        query: { id: "new-partner" }
      });
    },

    fetchpartners() {
      this.partners = null;
      this.$axios.get("/admin/partners").then(response => {
        this.partners = response.data.data || [];
      });
    },

    deletepartner(id, index) {
      if (confirm("Are you sure you want to delete this partner ?"))
        this.$axios.delete(`/admin/partners/${id}`).then(response => {
          this.partners.splice(index, 1);
        });
    },

    formatCreatedAt(date) {
      return moment(date).format("DD/MM/YYYY");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/_dashboard_blogs.scss";
</style>
