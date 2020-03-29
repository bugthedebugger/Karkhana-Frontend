<template>
  <div class="reset-token-page">
    <div class="reset-card">
      <div class="text-center">
        <img src="/images/logo-nav.png" class="logo" />
      </div>

      <div>
        <h2 class="text-center mt-4">Password Reset</h2>
        <br />
        <div class="form-group mb-4 mt-4">
          <label for="email">New Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            @keyup.enter="handleResetPasswordSubmit()"
            v-model="password"
          />
        </div>

        <div class="form-group mb-4">
          <label for="email">Password Confirmation</label>
          <input
            type="password"
            class="form-control"
            id="password-confirmation"
            placeholder="Password Confirmation"
            @keyup.enter="handleResetPasswordSubmit()"
            v-model="passwordConfirmation"
          />
        </div>

        <div class="text-center">
          <button class="btn btn-primary" @click="handleResetPasswordSubmit()" :disabled="!isValid">
            <Spinner v-if="resetLoading" />Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "~/components/Spinner";
import Helper from "~/helpers/common";

export default {
  auth: false,
  components: { Spinner },
  data() {
    return {
      resetToken: this.$route.params.reset_token,
      password: "",
      passwordConfirmation: "",
      resetLoading: false
    };
  },

  async asyncData({ $axios, params, error }) {
    try {
      const response = await $axios.post(
        `/password-reset/${params.reset_token}`
      );
    } catch (e) {
      error({ statusCode: 404 });
    }
  },

  methods: {
    handleResetPasswordSubmit() {
      this.resetLoading = true;
      this.$axios
        .post(`/password-reset`, {
          token: this.resetToken,
          password: this.password
        })
        .then(response => {
          this.$toast.show("Password reset successfull");
          this.resetLoading = false;
        })
        .catch(error => {
          Helper.displayError(this.$toast, error);
          this.resetLoading = false;
        });
    }
  },

  computed: {
    isValid() {
      return (
        this.password &&
        this.password.length > 0 &&
        this.passwordConfirmation &&
        this.passwordConfirmation.length > 0 &&
        this.password === this.passwordConfirmation &&
        !this.resetLoading
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/reset_token.scss";
</style>
