<template>
  <div class>
    <div class="d-flex">
      <div class="dashboard-content flex-grow-1">
        <div class="toolbar d-flex mb-4 mt-4">
          <h1 class="title mb-4">Header Section</h1>

          <div class="ml-auto">
            <button
              class="btn btn-primary btn-sm mr-2"
              @click="save()"
              :disabled="saveLoading || !valid()"
            >
              <Spinner v-if="saveLoading" />Save
            </button>
            <nuxt-link to="/dashboard/pages" class="btn btn-secondary btn-sm">Cancel</nuxt-link>
          </div>
        </div>

        <div class="container-card mt-0 page-form">
          <div v-if="headerData">
            <div class="language mb-4">
              <h5>Language</h5>
              <select class="form-control" v-model="selectedLanguage" @change="fetchData()">
                <option
                  v-for="language in languages"
                  :value="language.code"
                  :key="language.code"
                >{{language.name}}</option>
              </select>
            </div>

            <!-- Email & Location -->
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="products">Product Label *</label>
                  <input
                    id="product_label"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Product Label"
                    v-model="headerData.product_label"
                  />
                </div>

                <div class="form-group">
                  <label for="blog">Blog Label *</label>
                  <input
                    id="blog"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Blog Label"
                    v-model="headerData.blog"
                  />
                </div>

                <div class="form-group">
                  <label for="about">About Label *</label>
                  <input
                    id="about"
                    type="text"
                    class="form-control mb-1"
                    placeholder="About Label"
                    v-model="headerData.about"
                  />
                </div>

                <div class="form-group">
                  <label for="contact">Contact Label *</label>
                  <input
                    id="contact"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Contact Label"
                    v-model="headerData.contact"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <Loading />
          </div>
        </div>
      </div>

      <div class="ml-2 p-4 pl-2"></div>
    </div>
  </div>
</template>
<script>
import Loading from "~/components/Loading";
import Spinner from "~/components/Spinner";
import Gallery from "~/components/Dashboard/Gallery";
import AboutValuesInput from "~/components/Dashboard/AboutValuesInput";
import GalleryImageInput from "~/components/Dashboard/GalleryImageInput";
import TextArea from "~/components/core/TextArea";

export default {
  layout: "dashboard",
  auth: true,
  components: {
    Loading,
    Spinner,
    Gallery,
    AboutValuesInput,
    GalleryImageInput,
    TextArea
  },
  data() {
    return {
      saveLoading: false,
      languages: null,
      selectedLanguage: "en",
      headerData: null
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$axios.setHeader("Accept-Language", this.selectedLanguage);
      this.headerData = null;
      this.$axios.get("/admin/pages/header").then(response => {
        this.$axios.get("/languages").then(response2 => {
          this.headerData = response.data.data;
          this.languages = response2.data.data;
        });
      });
    },

    save() {
      this.saveLoading = true;
      this.headerData.language = this.selectedLanguage;
      this.$axios
        .post("/admin/pages/header/update", this.headerData)
        .then(response => {
          this.saveLoading = false;
          this.$toast.show("Saved");
        });
    },

    valid() {
      return (
        this.headerData &&
        this.headerData.about &&
        this.headerData.blog &&
        this.headerData.contact &&
        this.headerData.product_label
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
