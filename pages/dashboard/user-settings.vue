<template>
  <div class="dashboard-content">
    <h1 class="title">User Settings</h1>

    <label class="mt-4">Email Address</label>
    <input
      type="text"
      class="form-control form-control-sm"
      v-model="registrationEmail"
      placeholder="Email address"
    />
    <p v-if="registrationEmailSent" class="mt-4">
      Didn't receive the registration link ?
      <a href="#" @click="resendInvitationLink()">Send again</a>
    </p>

    <div v-else class="d-flex justify-content-between mt-4">
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-primary btn-sm">Super Admin</button>
        <button type="button" class="btn btn-default btn-sm">Editor</button>
        <button type="button" class="btn btn-primary btn-sm">Author</button>
      </div>

      <button type="button" class="btn btn-success btn-sm">Add Person</button>
    </div>

    <button class="btn btn-primary mt-4" @click="sendInvitationLink()">Send Invitation Link</button>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  auth: true,
  data() {
    return {
      availableRoles: null,
      registrationEmail: "bibhutipd@gmail.com",
      registrationEmailSent: false,
      loading: false
    };
  },

  created() {
    this.fetchRoles();
  },

  methods: {
    sendInvitationLink() {
      this.$axios
        .post("/admin/register", {
          email: this.registrationEmail,
          redirect: "http://192.168.100.3:8001/"
          // roles: [9, 10]
        })
        .then(response => {
          this.$toast.show(response.data.message);
          this.registrationEmailSent = true;
        })
        .catch(error => {
          this.$toast.show(error.response.data.email[0]);
        });
    },

    resendInvitationLink() {
      this.$axios
        .post("/admin/register/resend-token", {
          email: this.registrationEmail,
          redirect: "http://192.168.100.3:8001/"
        })
        .then(response => {
          this.$toast.show(response.data.message);
          this.registrationEmailSent = true;
        })
        .catch(error => {
          this.$toast.show(error.response.data.email[0]);
        });
    },

    fetchRoles() {
      this.$axios
        .get("/roles")
        .then(response => {
          this.availableRoles = response.data.data.roles;
        })
        .catch(error => {
          // this.$toast.show(error.response.data.email[0]);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/_dashboard_settings.scss";
</style>
