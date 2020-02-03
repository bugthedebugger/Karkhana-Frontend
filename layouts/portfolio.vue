<template>
  <div>
    <img src="/images/under-construction.svg" class="under-construction" />
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
export default {
  components: { Navbar }
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
