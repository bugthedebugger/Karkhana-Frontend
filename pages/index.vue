<template>
  <div class="container mt-4">
    <button type="button" class="btn btn-primary">Click Me</button>
    <button type="button" class="btn btn-info">Click Me</button>
    <button type="button" class="btn btn-warning">Click Me</button>
    <button type="button" class="btn btn-success">Click Me</button>

    <hr />

    <button class="btn btn-outline-primary">Click Me</button>
    <button class="btn btn-outline-info">Click Me</button>
    <button class="btn btn-outline-warning">Click Me</button>
    <button class="btn btn-outline-success">Click Me</button>

    <hr />

    <button class="btn btn-primary" disabled>Click Me</button>
    <button class="btn btn-info" disabled>Click Me</button>
    <button class="btn btn-warning" disabled>Click Me</button>
    <button class="btn btn-success" disabled>Click Me</button>

    <hr />

    <button class="btn btn-link btn-link-primary">Click Me</button>
    <button class="btn btn-link btn-link-info">Click Me</button>
    <button class="btn btn-link btn-link-warning">Click Me</button>
    <button class="btn btn-link btn-link-success">Click Me</button>

    <hr />

    <button class="btn btn-primary btn-cta">Call to action</button>

    <hr />

    <button class="btn btn-primary">
      <i class="fal fa-trash-alt icon"></i> Delete
    </button>

    <button class="btn btn-success">
      <i class="fal fa-save icon"></i> Save
    </button>

    <button class="btn btn-info">
      <i class="fal fa-print icon"></i> Print
    </button>

    <button class="btn btn-warning">
      <i class="fal fa-skull icon"></i> Exit
    </button>

    <hr />

    <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">
          <i class="fal fa-credit-card icon"></i> Primary card title
        </h5>
        <p
          class="card-text"
        >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "portfolio",
  components: {}
};
</script>

<style lang="scss">
@import "@/styles/pages/about.scss";
</style>
