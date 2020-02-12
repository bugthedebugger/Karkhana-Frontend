<template>
  <div class="spinner" :class="{'spinner-dark': dark}">
    <i class="fas fa-spinner-third"></i>
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props: ["dark"],
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_spinner.scss";
</style>