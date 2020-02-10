<template>
  <div class="d-flex">
    <DashboardNav />
    <div class="flex-grow-1">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import DashboardNav from "~/components/DashboardNav.vue";
export default {
  components: { DashboardNav }
};
</script>

<style lang="scss">
@import "@/styles/layouts/dashboard.scss";
</style>
