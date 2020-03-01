<template>
  <div class="dashboard-content">
    <div class="row">
      <div class="col-md-8">
        <div class="toolbar">
          <div class="row w-100">
            <div class="col-md-8">
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
                <a
                  href="#"
                  @click="resendInvitationLink()"
                >Send again</a>
                or
                <a href="#" @click="registrationEmailSent = false">Send another</a>
              </p>

              <div v-else class="d-flex justify-content-between mt-4">
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-sm"
                    :class="{'btn-primary': role.id === selectedRole}"
                    v-for="role in availableRoles"
                    :key="role.id"
                    @click="selectedRole = role.id"
                  >
                    <i
                      :class="{'fal fa-circle': role.id !== selectedRole, 'fal fa-dot-circle': role.id === selectedRole}"
                    ></i>
                    {{role.name}}
                  </button>
                </div>

                <button
                  type="button"
                  class="btn btn-success btn-sm"
                  @click="sendInvitationLink()"
                  :disabled="!selectedRole || !registrationEmail || invitationLinkLoading"
                >
                  <Spinner v-if="invitationLinkLoading" />Add Person
                </button>
              </div>
            </div>

            <div class="col-md-4">
              <img src="/images/registration-email-image.png" class="w-100" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="user-list">
          <h5 class="title">Added Users</h5>

          <Loading v-if="fetchUsersLoading" />

          <table v-else class="table table-borderless">
            <thead>
              <tr>
                <th>Email Id</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td class="email">{{user.email}}</td>
                <td class="status">{{user.status}}</td>
                <td>
                  <button
                    class="btn btn-default btn-sm btn-delete"
                    @click="deleteInvitation(user.email)"
                  >
                    <i class="fal fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Spinner from "~/components/Spinner";
import Helper from "~/helpers/common";
import Loading from "~/components/Loading";

export default {
  layout: "dashboard",
  auth: true,
  components: { Spinner, Loading },
  data() {
    return {
      invitationLinkLoading: false,
      fetchUsersLoading: false,

      availableRoles: null,
      selectedRole: null,
      users: null,
      registrationEmail: null,
      registrationEmailSent: false,
      loading: false
    };
  },

  created() {
    this.fetchRoles();
    this.fetchUsers();
  },

  methods: {
    sendInvitationLink() {
      this.invitationLinkLoading = true;
      this.$axios
        .post("/admin/register", {
          email: this.registrationEmail,
          roles: [this.selectedRole]
        })
        .then(response => {
          this.$toast.show(response.data.message);
          this.registrationEmailSent = true;
          this.invitationLinkLoading = false;
          this.fetchUsers();
        })
        .catch(error => {
          Helper.displayError(this.$toast, error);
          this.invitationLinkLoading = false;
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
          this.fetchUsers();
        })
        .catch(error => {
          this.$toast.show(error.response.data.email[0]);
        });
    },

    fetchRoles() {
      this.$axios.get("/roles").then(response => {
        this.availableRoles = response.data.data.roles;
      });
    },

    fetchUsers() {
      this.fetchUsersLoading = true;
      this.$axios.get("/admin/users/registered").then(response => {
        let registeredUsers = response.data.data.users;
        if (registeredUsers)
          this.users = registeredUsers.map(u => {
            return { email: u.email, status: "Active" };
          });
        else this.users = [];

        this.$axios.get("/admin/users/unregistered").then(response => {
          let unregisteredUsers = response.data.data.users;
          if (unregisteredUsers) {
            this.users = this.users.concat(
              unregisteredUsers.map(u => {
                return { email: u, status: "Pending" };
              })
            );
          }
          this.fetchUsersLoading = false;
        });
      });
    },

    deleteInvitation(email) {
      if (
        confirm("Are you sure you want to cancel registration for this user ?")
      )
        this.$axios
          .delete(`/admin/register/cancel/${email}`)
          .then(response => {
            this.fetchUsers();
            this.$toast.show(`${email} - registration cancelled`);
          })
          .catch(error => {
            Helper.displayError(this.$toast, error);
          });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/_dashboard_settings.scss";
</style>
