<template>
  <div class="dashboard-content">
    <div class="toolbar">
      <h1 class="title">Team Members</h1>
      <div class="toolbar-controls">
        <button type="button" class="btn btn-primary mb-2" @click="createTeamMember()">
          <i class="fal fa-plus"></i> &nbsp;
          New Team Member
        </button>
      </div>
    </div>

    <div class="container-card">
      <div v-if="teamMembers">
        <div v-if="teamMembers.length">
          <table class="table table-borderless teamMember-list">
            <tr
              v-for="(teamMember, index) in teamMembers"
              :key="teamMember.uuid"
              class="dashboard-list-item"
            >
              <td valign="middle">
                <img :src="teamMember.photo.path" width="50" height="50" />
              </td>
              <td valign="middle">{{teamMember.name}}</td>
              <td valign="middle">
                <div class="controls d-flex">
                  <!-- <div class="btn-view mr-2">
                    <nuxt-link :to="'/teamMembers/' + teamMember.id" target="_blank">
                      <i class="fal fa-eye"></i>
                    </nuxt-link>
                  </div>-->
                  <div class="btn-edit mr-2">
                    <nuxt-link :to="'create-team-member?id=' + teamMember.id">
                      <i class="fal fa-edit"></i>
                    </nuxt-link>
                  </div>
                  <div class="btn-delete" @click="deleteTeamMember(teamMember.id, index)">
                    <a href="#">
                      <i class="fal fa-trash-alt"></i>
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div v-else>No Team Members found</div>
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
      teamMembers: null
    };
  },

  created() {
    this.fetchTeamMembers();
  },

  methods: {
    createTeamMember() {
      this.$router.push({
        path: "/dashboard/create-team-member",
        query: { id: "new-team-member" }
      });
    },

    fetchTeamMembers() {
      this.teamMembers = null;
      this.$axios.get("/admin/team").then(response => {
        this.teamMembers = response.data.data || [];
      });
    },

    deleteTeamMember(id, index) {
      if (confirm("Are you sure you want to delete this Team Member ?"))
        this.$axios.delete(`/admin/team/${id}`).then(response => {
          this.teamMembers.splice(index, 1);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/_dashboard_blogs.scss";
</style>
