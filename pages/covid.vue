<template></template>

<script>
export default {
  auth: false,
  async asyncData({ redirect }) {
    redirect("/blogs/resources-to-cope-with-covid");
  }
};
</script>
