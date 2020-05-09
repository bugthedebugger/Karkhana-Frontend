<template>
  <div>
    <div
      class="preview-image"
      :class="image_class"
      :style="applyStyle()"
      data-toggle="modal"
      :data-target="'#galleryModal-' + id"
    >{{getType(selectedImageUrl) === 'file' ? selectedImageUrl : ''}}</div>

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
                    v-if="getType(image.url) === 'image'"
                    :src="image.url"
                    :ref="'gallery-image-' + index"
                    class="gallery-image mb-0"
                    @click="selectImage(image)"
                  />
                  <div v-else class="file" :title="image.url" @click="selectImage(image)">file</div>
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
  props: [
    "id",
    "value",
    "image_class",
    "page_code",
    "width",
    "height",
    "get_path",
    "preview"
  ],
  data() {
    return {
      galleryImages: null,
      selectedImageUrl: this.value || null,
      _preview: null,
      selectedImagePath: null
    };
  },

  created() {
    this._preview = this.preview;
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
      this.selectedImageUrl = image.url;
      this.selectedImagePath = image.path;
      this._preview = null;
      $("#galleryModal-" + this.id).modal("hide");
      this.emitUpdate();
    },

    emitUpdate() {
      this.$emit(
        "input",
        this.get_path ? this.selectedImagePath : this.selectedImageUrl
      );
    },

    applyStyle() {
      let style = "";
      if (this.width) style += "width: " + this.width + "px;";
      if (this.height) style += "height: " + this.height + "px;";

      if (this._preview) {
        style += "background-image: url(" + this._preview + ");";
        return style;
      }

      if (this.getType(this.selectedImageUrl) === "image")
        style += "background-image: url(" + this.selectedImageUrl + ");";
      return style;
    },

    getType(url) {
      if (!url) return;
      let ext = url.split(".").pop();
      if (
        ext === "jpg" ||
        ext === "png" ||
        ext === "jpeg" ||
        ext === "gif" ||
        ext === "svg"
      )
        return "image";
      return "file";
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      this.selectedImageUrl = newVal;
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

  padding: 0.5rem;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 100px;
}

.file {
  height: 50px;
  width: 50px;
  color: lightgray;
  text-align: center;
  line-height: 50px;
  border: 1px solid #373737;
  cursor: pointer;
  margin: 10px;
}
</style>