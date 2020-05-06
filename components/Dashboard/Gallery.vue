<template>
  <div>
    <div v-if="!loading" class="post-settings">
      <h2 class="title">Gallery Images</h2>

      <div>
        <label>Select Gallery images</label>
        <FileUpload :pageCode="pageCode" @fileUploaded="handleFileUploaded" />
        <hr />
        <div class="d-flex flex-wrap" v-if="galleryImages">
          <div v-for="(image, index) in galleryImages" :key="index">
            <img v-if="getType(image.url) === 'image'" :src="image.url" class="gallery-image" />

            <div v-else class="file" :title="image.url">file</div>
          </div>
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
      this.$emit("newImage");
    },

    getType(url) {
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
  }
};
</script>

<style lang="scss" scoped>
.file {
  height: 50px;
  width: 50px;
  color: lightgray;
  text-align: center;
  line-height: 50px;
  border: 1px solid #373737;
  color: #373737;
  cursor: pointer;
  margin: 10px;
}
</style>