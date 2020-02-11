<template>
  <div class="file-upload">
    <input type="file" @change="onFileSelected" ref="fileInput" multiple />

    <div class="input-group file-upload-handle" @click="$refs.fileInput.click()">
      <div class="form-control">
        <label>{{selectedFiles && selectedFiles.length > 0 ? selectedFiles.length + " file(s) selected" : "None"}}</label>
      </div>
      <div class="input-group-append">
        <span class="input-group-text">
          <i class="fal fa-upload"></i>
        </span>
      </div>
    </div>
    <div class="progress" v-if="uploadPercent > 0">
      <div
        class="progress-bar"
        role="progressbar"
        :style="'width:' + uploadPercent + '%'"
        :aria-valuenow="uploadPercent"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <div class="mb-3"></div>
    <button class="btn btn-success btn-sm" @click="onUpload()" :disabled="!selectedFiles">Upload</button>
  </div>
</template>

<script>
export default {
  name: "FileUpload",
  props: ["uuid"],
  data() {
    return {
      selectedFiles: null,
      uploadPercent: 0
    };
  },
  created() {},

  methods: {
    onFileSelected(event) {
      if (event.target.files.length) this.selectedFiles = event.target.files;
    },

    onUpload() {
      const fd = new FormData();
      Array.from(this.selectedFiles).forEach((selectedFile, index) => {
        fd.append(`photos[${index}]`, selectedFile, selectedFile.name);
      });
      this.$axios
        .post(`/admin/blog/gallery/${this.uuid}/upload`, fd, {
          onUploadProgress: this.handleUploadProgress
        })
        .then(response => {
          this.$emit("fileUploaded", response.data);
        });
    },

    handleUploadProgress(uploadEvent) {
      this.uploadPercent = Math.round(
        (uploadEvent.loaded / uploadEvent.total) * 100
      );
      console.log(this.uploadPercent);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_file_upload.scss";
</style>