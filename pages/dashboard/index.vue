<template>
  <div class="dashboard-content">
    <div class="toolbar">
      <h1 class="title">Dashboard</h1>
    </div>
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
