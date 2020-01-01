<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Logo</a>
    <div class="navbar-nav ml-auto">
      <a class="nav-item nav-link active" href="#">Link</a>
      <a class="nav-item nav-link" href="#">Link</a>
      <a class="nav-item nav-link" href="#">Link</a>
      <a class="nav-item nav-link disabled" href="#">Link</a>

      <template v-if="$auth.loggedIn">{{$auth.user.email}}</template>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style>
</style>