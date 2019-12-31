<template>
  <!-- <div class="container mt-4">
   <button class="k-btn k-btn-primary">Primary</button>
   <button class="k-btn k-btn-success">Success</button>
   <button class="k-btn k-btn-warning">Warning</button>
   <button class="k-btn k-btn-info">Info</button>

   <hr>

   <button class="k-btn k-btn-outline-primary">Primary</button>
   <button class="k-btn k-btn-outline-success">Success</button>
   <button class="k-btn k-btn-outline-warning">Warning</button>
   <button class="k-btn k-btn-outline-info">Info</button>
  </div>-->
  <div class="container mt-4">
    <button class="btn btn-primary">Click Me</button>
    <button class="btn btn-success">Click Me</button>
    <button class="btn btn-warning">Click Me</button>
    <button class="btn btn-info">Click Me</button>

    <hr />

    <button class="btn btn-outline-primary">Click Me</button>
    <button class="btn btn-outline-success">Click Me</button>
    <button class="btn btn-outline-warning">Click Me</button>
    <button class="btn btn-outline-info">Click Me</button>

    <hr />

    <button class="btn btn-primary" disabled>Click Me</button>
    <button class="btn btn-success" disabled>Click Me</button>
    <button class="btn btn-warning" disabled>Click Me</button>
    <button class="btn btn-info" disabled>Click Me</button>

    <hr />

    <button class="btn btn-link btn-link-primary">Click Me</button>
    <button class="btn btn-link btn-link-success">Click Me</button>
    <button class="btn btn-link btn-link-warning">Click Me</button>
    <button class="btn btn-link btn-link-info">Click Me</button>

    <hr />

    <button class="btn btn-primary btn-cta">
      Call to action
    </button>

    <hr />

    <button class="btn btn-primary">
      <i class="fas fa-trash"></i> Delete
    </button>

    <hr />
    <div class="card" style="width: 382px; height: 179px">
      <div class="card-body">

        asdasdasd
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>

<style lang="scss">
@import "@/styles/pages/about.scss";
</style>
