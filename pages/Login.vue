<template>
  <div class="login-page">
    <div class="login-card">
      <div class="text-center">
        <img src="/images/logo-nav.png" class="logo" />
      </div>

      <div v-if="view === 'login'">
        <div class="form-group mb-4">
          <label for="email">Email Address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            @keyup.enter="handleSubmit()"
            v-model="email"
          />
        </div>
        <div class="form-group mb-4">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            @keyup.enter="handleSubmit()"
            v-model="password"
          />
        </div>
        <div class="login-options d-flex justify-content-between mb-4">
          <div class="form-check align-self-center">
            <input class="form-check-input" type="checkbox" value id="defaultCheck1" />
            <label class="form-check-label" for="defaultCheck1">Keep me logged in</label>
          </div>

          <button
            class="btn btn-link align-self-center"
            @click="view='reset-password'"
          >Forgot Password ?</button>
        </div>
        <div class="text-center">
          <button
            class="btn btn-primary btn-block"
            @click="handleSubmit()"
            :disabled="email.length <= 0 || password.length <= 0 || loginLoading"
          >
            <Spinner v-if="loginLoading" />Login
          </button>
        </div>
      </div>

      <div v-else-if="view === 'reset-password'">
        <div class="form-group mb-2">
          <label for="email">Email Address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            @keyup.enter="handleResetPasswordSubmit()"
            v-model="resetEmail"
          />
        </div>

        <button class="btn btn-link mb-4 text-align-left pl-0" @click="view='login'">Go back to login</button>

        <div class="text-center">
          <button
            class="btn btn-primary btn-block"
            @click="handleResetPasswordSubmit()"
            :disabled="(resetEmail && resetEmail.length <= 0) || resetPasswordLoading"
          >
            <Spinner v-if="resetPasswordLoading" />Send Reset Password Link
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "~/components/Spinner";

export default {
  auth: false,
  components: { Spinner },
  data() {
    return {
      email: "",
      password: "",
      loginLoading: false,
      resetPasswordLoading: false,
      resetEmail: null,
      view: "login" // login, reset-password
    };
  },

  methods: {
    async handleSubmit() {
      if (this.email.length === 0 || this.password.length === 0) {
        this.$toast.show("Invalid credentials");
        return;
      }
      this.loginLoading = true;

      try {
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });
        this.$router.push({
          path: "/dashboard"
        });
        this.loginLoading = false;
      } catch (error) {
        this.$toast.show("Invalid credentials");
        this.loginLoading = false;
      }
    },

    handleResetPasswordSubmit() {
      this.resetPasswordLoading = true;
      this.$axios
        .post(`/password-reset/request`, {
          email: this.resetEmail
        })
        .then(response => {
          this.$toast.show("Reset link successfully sent to your email.");
          this.resetPasswordLoading = false;
          this.view = login;
        });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/login.scss";
</style>
