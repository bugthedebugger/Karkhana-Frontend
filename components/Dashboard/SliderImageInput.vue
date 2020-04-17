<template>
  <div>
    <div class="slider-image-input-container d-flex flex-nowrap">
      <div class="card mr-2" v-for="(sliderImage, i) in sliderImages" :key="i">
        <div class="card-body p-1">
          <div class="slider-image-input d-flex flex-column">
            <div class="toolbar d-flex mb-1">
              <p class="mb-0">Slider-{{sliderImage.order}}</p>

              <div class="btn-group ml-auto" role="group">
                <button class="btn btn-secondary btn-sm" @click="remove(i)">
                  <i class="fal fa-trash-alt"></i>
                </button>
                <button class="btn btn-secondary btn-sm">
                  <i class="fal fa-caret-left"></i>
                </button>
                <button class="btn btn-secondary btn-sm">
                  <i class="fal fa-caret-right"></i>
                </button>
              </div>
            </div>
            <div
              class="image"
              :style="'background-image: url(' + sliderImage.path + ')'"
              data-toggle="modal"
              data-target="#sliderGalleryModal"
              @click="activeSlider = sliderImage"
            ></div>
            <textarea
              class="form-control"
              rows="3"
              placeholder="Slider Quote"
              v-model="sliderImage.quote"
              @input="emitUpdate()"
            ></textarea>
            <div class="form-group form-check mb-1">
              <input
                type="checkbox"
                class="form-check-input"
                :id="'is-hidden' + i"
                v-model="sliderImage.hidden"
                @input="emitUpdate()"
              />
              <label class="form-check-label" :for="'is-hidden' + i">Hide slider</label>
            </div>
            <div class="d-flex">
              <div class="form-group p-1 mb-0">
                <label class="mb-0" :form="'label' + i">Label</label>
                <input
                  type="text"
                  class="form-control"
                  :id="'label' + i"
                  placeholder="Label"
                  v-model="sliderImage.button.label"
                  @input="emitUpdate()"
                />
              </div>

              <div class="form-group p-1 mb-0">
                <label class="mb-0" :form="'action' + i">Action</label>
                <input
                  type="text"
                  class="form-control"
                  :id="'action' + i"
                  placeholder="Action"
                  v-model="sliderImage.button.action"
                  @input="emitUpdate()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-2">
      <button class="btn btn-primary btn-sm" @click="add()">Add New Slider</button>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="sliderGalleryModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="sliderGalleryModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Select Slider Image</h5>
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
                    @click="selectSliderImage(image)"
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
  name: "SliderImageInput",
  components: {},
  props: ["_sliderImages"],
  data() {
    return {
      activeSlider: null,
      galleryImages: null,
      sliderImages: this._sliderImages || []
    };
  },

  created() {
    this.fetchGalleryImages();
  },

  methods: {
    add() {
      this.sliderImages.push({
        quote: null,
        order: this.sliderImages.length + 1,
        hidden: false,
        path: null,
        button: {
          label: null,
          action: null
        }
      });
      this.emitUpdate();
    },

    remove(index) {
      this.sliderImages.splice(index, 1);
      this.emitUpdate();
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
      this.$axios.get("/admin/media/landing").then(response => {
        this.galleryImages = response.data.data;
      });
    },

    selectSliderImage(image) {
      this.activeSlider.path = image.url;
      $("#sliderGalleryModal").modal("hide");
      this.emitUpdate();
    },

    emitUpdate() {
      this.$emit("sliderImageChanged", this.sliderImages);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/dashboard/_slider_image_input.scss";
</style>