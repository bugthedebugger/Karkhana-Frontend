<template>
  <div class="file-upload">
    <input type="file" @change="onFileSelected" ref="fileInput" />

    <div class="input-group file-upload-handle" @click="$refs.fileInput.click()">
      <div class="form-control">
        <label v-if="selectedFile">{{selectedFile.name}}</label>
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
    <button class="btn btn-success btn-sm" @click="onUpload()" :disabled="!selectedFile">Upload</button>
  </div>
</template>

<script>
export default {
  name: "FileUpload",
  data() {
    return {
      selectedFile: null,
      uploadPercent: 0
    };
  },
  created() {},

  methods: {
    onFileSelected(event) {
      if (event.target.files[0]) this.selectedFile = event.target.files[0];
    },

    onUpload() {
      const fd = new FormData();
      fd.append("file", this.selectedFile, this.selectedFile.name);
      this.$axios
        .post("http://localhost:5000/files/" + this.selectedFile.name, fd, {
          onUploadProgress: this.handleUploadProgress
        })
        .then(response => {});
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