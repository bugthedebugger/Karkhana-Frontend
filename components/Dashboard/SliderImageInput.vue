<template>
  <div>
    <div class="slider-image-input-container d-flex flex-nowrap">
      <div class="card mr-2" v-for="(sliderImage, i) in sliderImages" :key="i">
        <div class="card-body p-1">
          <div class="slider-image-input d-flex flex-column">
            <div class="slider-image-input-toolbar d-flex justify-content-between mb-1">
              <p class="mb-0">Slider-{{sliderImage.order}}</p>

              <div class="btn-group" role="group" style="width: 100px">
                <button class="btn btn-secondary btn-sm" @click="remove(i)">
                  <i class="fal fa-trash-alt"></i>
                </button>
                <button class="btn btn-secondary btn-sm" @click="moveLeft(i)" :disabled="i===0">
                  <i class="fal fa-caret-left"></i>
                </button>
                <button
                  class="btn btn-secondary btn-sm"
                  @click="moveRight(i)"
                  :disabled="i=== sliderImages.length -1"
                >
                  <i class="fal fa-caret-right"></i>
                </button>
              </div>
            </div>

            <div class="ml-auto mr-auto mb-2">
              <GalleryImageInput
                page_code="landing"
                :id="'slider-image-' + i"
                :value="sliderImage.path"
                v-model="sliderImage.path"
                image_class="karkhana-building-image"
              />
            </div>

            <TextArea
              id="slider-quote"
              placeholder="Slider Quote"
              rows="3"
              :maxlength="200"
              v-model="sliderImage.quote"
              @input="emitUpdate()"
            />

            <div class="form-group form-check mb-0">
              <input
                type="checkbox"
                class="form-check-input"
                :id="'is-hidden' + i"
                v-model="sliderImage.hidden"
                @input="emitUpdate()"
              />
              <label class="form-check-label" :for="'is-hidden' + i">Hide slider</label>
            </div>
            <div class="form-group mb-0">
              <label class="mb-0" :form="'label' + i">Button Label</label>
              <input
                type="text"
                class="form-control form-control-sm"
                :id="'label' + i"
                placeholder="Label"
                v-model="sliderImage.button.label"
                @input="emitUpdate()"
              />

              <div class="form-group mb-0">
                <label class="mb-0" :form="'action' + i">Button Action</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
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
  </div>
</template>

<script>
import TextArea from "~/components/core/TextArea";
import GalleryImageInput from "~/components/Dashboard/GalleryImageInput";
import Vue from "vue";

export default {
  name: "SliderImageInput",
  components: { TextArea, GalleryImageInput },
  props: {
    _sliderImages: {
      type: Array
    },
    max: {
      type: Number,
      default: 4
    }
  },
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
      if (this.sliderImages.length >= this.max) {
        alert(this.max + " Sliders are allowed");
        return;
      }
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
    },

    moveRight(i) {
      // swap i and i+1
      // let temp = this.sliderImages[i];
      // Vue.set(this.sliderImages, i, this.sliderImages[i + 1]);
      // Vue.set(this.sliderImages, i + 1, temp);
      // this.sliderImages[i] = this.sliderImages[i + 1];
      // this.sliderImages[i + 1] = temp;

      this.sliderImages[i].order++;
      this.sliderImages[i + 1].order--;
      this.sliderImages = this.sliderImages.sort((a, b) => a.order - b.order);
    },

    moveLeft() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/dashboard/_slider_image_input.scss";
</style>
