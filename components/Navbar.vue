<template>
  <nav class="navbar fixed-top navbar-expand-lg">
    <a class="navbar-brand" href="#">Logo</a>
    <div class="navbar-nav ml-auto">
      <a class="nav-item nav-link" href="#">Products</a>
      <a class="nav-item nav-link" href="#">Blog</a>
      <a class="nav-item nav-link" href="#">About</a>
      <a class="nav-item nav-link" href="#">Contact</a>

      <template v-if="$auth.loggedIn">{{$auth.user.email}}</template>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="scss">
@import "@/styles/components/_navbar.scss";
</style>