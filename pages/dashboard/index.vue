<template>
  <div class="container">
    <h1>Dashboard</h1>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  auth: true,
  // middleware: "auth",
  components: {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/about.scss";
</style>
