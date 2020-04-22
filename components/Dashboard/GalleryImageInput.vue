<template>
  <div>
    <div
      class="preview-image"
      :class="image_class"
      :style="applyStyle()"
      data-toggle="modal"
      :data-target="'#galleryModal-' + id"
    ></div>

    <!-- Modal -->
    <div
      class="modal fade"
      :id="'galleryModal-' + id"
      tabindex="-1"
      role="dialog"
      :aria-labelledby="'galleryModal-' + id"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Select Image</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex flex-wrap">
              <template v-for="(image, index) in galleryImages">
                <div class="d-flex flex-column" :key="index">
                  <img
                    :src="image.url"
                    :ref="'gallery-image-' + index"
                    class="gallery-image mb-0"
                    @click="selectImage(image)"
                  />
                  <label class="gallery-image-size">{{imageSize('gallery-image-' + index)}}</label>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GalleryImageInput",
  components: {},
  props: ["id", "value", "image_class", "page_code", "width", "height"],
  data() {
    return {
      galleryImages: null,
      selectedImagePath: this.value || null
    };
  },

  created() {
    this.fetchGalleryImages();
  },

  methods: {
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
    },

    applyStyle(){
      let style = "";
      if(this.width) style += 'width: ' + this.width + 'px;'
      if(this.height) style += 'height: ' + this.height + 'px;'
      style += 'background-image: url(' + this.selectedImagePath + ');';
      return style;
    }
  }
};
</script>

<style lang="scss" scoped>
.preview-image {
  height: 100px;
  width: 200px;
  border: 1px dashed black;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}
</style>