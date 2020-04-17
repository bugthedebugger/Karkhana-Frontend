<template>
  <div>
    <div v-if="!loading" class="post-settings">
      <h2 class="title">Gallery Images</h2>

      <div>
        <label>Select Gallery images</label>
        <FileUpload :pageCode="pageCode" @fileUploaded="handleFileUploaded" />
        <hr />
        <div class="d-flex flex-wrap" v-if="galleryImages">
          <img
            v-for="(image, index) in galleryImages"
            :src="image.url"
            :key="index"
            class="gallery-image"
          />
        </div>
        <div v-else>Gallery images not found for {{pageCode}} page</div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import Loading from "~/components/Loading";
import FileUpload from "~/components/FileUpload";

export default {
  name: "Gallery",
  components: { Loading, FileUpload },
  props: {
    pageCode: String
  },
  data() {
    return {
      loading: false,
      galleryImages: null
    };
  },

  created() {
    this.fetchGalleryImages();
  },

  methods: {
    fetchGalleryImages() {
      this.loading = true;
      this.$axios.get("/admin/media/" + this.pageCode).then(response => {
        this.galleryImages = response.data.data;
        this.loading = false;
      });
    },

    handleFileUploaded() {
      this.fetchGalleryImages();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>