<template>
  <div class="product-input">
    <!-- Logo -->
    <div class="text-center mb-4">
      <label>Logo</label>
      <div class="d-flex justify-content-center">
        <GalleryImageInput page_code="products" v-model="value.logo" />
      </div>
    </div>

    <!-- Color -->
    <div class="row">
      <div class="col">
        <label>Color</label>
        <input
          type="color"
          class="form-control form-control-sm form-control form-control-sm-sm mb-2"
          v-model="value.color"
        />
      </div>

      <div class="col">
        <label>Secondary Color</label>
        <input
          type="color"
          class="form-control form-control-sm form-control form-control-sm-sm mb-2"
          v-model="value.secondary_color"
        />
      </div>
    </div>

    <!-- Unique Code -->
    <label>Unique Product Code</label>
    <input
      type="text"
      class="form-control form-control-sm mb-1"
      placeholder="Unique product code"
      v-model="value.code"
    />

    <!-- Name -->
    <label>Product Name</label>
    <input
      type="text"
      class="form-control form-control-sm mb-1"
      placeholder="Product Name"
      v-model="value.name"
    />

    <!-- Tag -->
    <label>Tag</label>
    <TextArea id="tag" v-model="value.tag" rows="2" :maxlength="100" />

    <!-- Grade && Type -->
    <div class="row">
      <div class="col">
        <label>Grade</label>
        <input
          type="text"
          class="form-control form-control-sm mb-1"
          placeholder="Grade"
          v-model="value.grade"
        />
      </div>
      <div class="col">
        <label>Type</label>
        <input
          type="text"
          class="form-control form-control-sm mb-1"
          placeholder="Type"
          v-model="value.type"
        />
      </div>
    </div>

    <!-- School Services -->
    <div class="row">
      <div class="col">
        <label>School Services</label>
        <input
          type="text"
          class="form-control form-control-sm mb-1"
          placeholder="School Services"
          v-model="value.school_services"
        />
      </div>
    </div>

    <!-- Student Services -->
    <div class="row">
      <div class="col">
        <label>Student Services</label>
        <input
          type="text"
          class="form-control form-control-sm mb-1"
          placeholder="Student Services"
          v-model="value.school_services"
        />
      </div>
    </div>

    <!-- Description -->
    <label>Description</label>
    <TextArea id="tag" v-model="value.description" rows="10" :maxlength="1000" />
  </div>
</template>

<script>
import GalleryImageInput from "~/components/Dashboard/GalleryImageInput";
import TextArea from "~/components/core/TextArea";

export default {
  name: "ProductInput",
  components: { GalleryImageInput, TextArea },
  props: ["_value"],
  data() {
    return {
      mode: false, //false: create, true: update
      value: null
    };
  },

  created() {
    this.mode = this._value ? true : false;
    this.value = this._value || this.initProduct();
  },

  methods: {
    initProduct() {
      return {
        language: "en",
        logo: null,
        color: null,
        secondary_color: null,
        code: null,
        name: null,
        tag: null,
        grade: null,
        type: null,
        school_services: null,
        student_services: null,
        description: null,
        facts: [],
        features: [],
        brochure: null,
        featured_image: null
      };
    },

    refresh() {
      this.fetchGalleryImages();
    },

    imageSize(refName) {
      if (!this.$refs[refName]) return "";
      return (
        this.$refs[refName][0].naturalWidth +
        " x " +
        this.$refs[refName][0].naturalHeight
      );
    },

    fetchGalleryImages() {
      this.$axios.get("/admin/media/" + this.page_code).then(response => {
        this.galleryImages = response.data.data;
      });
    },

    selectImage(image) {
      this.selectedImagePath = image.url;
      $("#galleryModal-" + this.id).modal("hide");
      this.emitUpdate();
    },

    emitUpdate() {
      this.$emit("input", this.selectedImagePath);
    }
  }
};
</script>

<style lang="scss" scoped>
label {
  margin-bottom: 0;
}
</style>