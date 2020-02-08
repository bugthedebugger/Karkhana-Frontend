<template>
  <div>
    <h1 class="text-center">Login</h1>

    <div class="container">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="text-center">
        <button class="btn btn-primary" @click="handleSubmit()">Login</button>
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
      this.$auth.loginWith("local", {
        data: {
          email: this.email,
          password: this.password
        }
      });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/login.scss";
</style>
