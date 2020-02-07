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

<style>
.under-construction {
  position: fixed;
  bottom: -5px;
  right: -5px;
  height: 200px;
  width: 200px;
  z-index: 100000;
}
</style>
