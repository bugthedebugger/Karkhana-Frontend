<template>
  <div class="container">
    <h1>File upload here...</h1>
    <FileUpload />
  </div>
</template>
<script>
import FileUpload from "~/components/FileUpload";
export default {
  layout: "dashboard",
  components: { FileUpload }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/about.scss";
</style>
