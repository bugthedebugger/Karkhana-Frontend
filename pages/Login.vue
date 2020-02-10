<template>
  <div class="login-page">
    <div class="login-card">
      <div class="text-center">
        <img src="/images/logo-nav.png" class="logo" />
      </div>
      <div class="form-group mb-4">
        <label for="email">Email Address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
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
          v-model="password"
        />
      </div>
      <div class="login-options d-flex justify-content-between mb-4">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value id="defaultCheck1" />
          <label class="form-check-label" for="defaultCheck1">Keep me logged in</label>
        </div>

        <nuxt-link to="/login">Forgot Password ?</nuxt-link>
      </div>
      <div class="text-center">
        <button class="btn btn-primary btn-block" @click="handleSubmit()">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  components: {},
  data() {
    return {
      email: "app@karkhana.asia",
      password: "password"
    };
  },

  methods: {
    handleSubmit() {
      this.$auth
        .loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(() => {
          this.$router.push({
            path: "/dashboard"
          });
        });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/login.scss";
</style>
