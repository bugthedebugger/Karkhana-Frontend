<template>
  <div>
    <div class="d-flex">
      <div class="dashboard-content flex-grow-1">
        <div class="toolbar d-flex mb-4 mt-4">
          <h1 class="title mb-4">Products Page</h1>

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
          <div v-if="productsData">
            <!-- Language -->
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

            <!-- Grade label & Type label -->
            <div class="mb-4">
              <div class="row">
                <div class="col">
                  <label>Grade Label *</label>
                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Grade Label"
                    v-model="productsData.grade_label"
                  />

                  <label>Type Label *</label>
                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Type Label"
                    v-model="productsData.type_label"
                  />
                </div>
              </div>
            </div>

            <!-- product label -->
            <div class="mb-4">
              <div class="row">
                <div class="col">
                  <label>Product Label *</label>
                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Product Label"
                    v-model="productsData.product_label"
                  />
                </div>
              </div>
            </div>

            <!-- School services label -->
            <div class="mb-4">
              <div class="row">
                <div class="col">
                  <label>School Services Label *</label>

                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="School Services Label"
                    v-model="productsData.school_services_label"
                  />
                </div>
              </div>
            </div>

            <!-- Student services label -->
            <div class="mb-4">
              <div class="row">
                <div class="col">
                  <label>Student Services Label *</label>

                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Student Services Label"
                    v-model="productsData.student_services_label"
                  />
                </div>
              </div>
            </div>

            <!-- Learn More & Download -->
            <div class="mb-4">
              <div class="row">
                <div class="col">
                  <label>Learn More Label *</label>

                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Learn More Label"
                    v-model="productsData.learn_more_label"
                  />
                </div>

                <div class="col">
                  <label>Download Label *</label>
                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Download Label"
                    v-model="productsData.download_label"
                  />
                </div>
              </div>
            </div>

            <hr />
          </div>

          <div v-else>
            <Loading />
          </div>
        </div>
      </div>

      <div class="ml-2 p-4 pl-2">
        <Gallery pageCode="products" @newImage="fetchData()" />
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "~/components/Loading";
import Spinner from "~/components/Spinner";
import Gallery from "~/components/Dashboard/Gallery";
import ProductInput from "~/components/Dashboard/ProductInput";
import TextArea from "~/components/core/TextArea";

export default {
  layout: "dashboard",
  auth: true,
  components: {
    Loading,
    Spinner,
    Gallery,
    ProductInput,
    TextArea
  },
  data() {
    return {
      saveLoading: false,
      languages: null,
      galleryImages: null,
      selectedLanguage: "en",
      productsData: null
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$axios.setHeader("Accept-Language", this.selectedLanguage);
      this.productsData = null;
      this.$axios.get("/pages/products").then(response => {
        this.$axios.get("/languages").then(response2 => {
          this.$axios.get("/admin/media/about").then(response3 => {
            this.galleryImages = response3.data.data;
            this.loading = false;
            this.languages = response2.data.data;
            this.productsData = response.data.data;
            this.correctData();
          });
        });
      });
    },

    save() {
      this.saveLoading = true;
      this.$axios
        .post("/admin/pages/products/update", this.productsData)
        .then(response => {
          this.saveLoading = false;
          this.$toast.show("Saved");
        });
    },

    correctData() {
      delete this.productsData["header"];
      delete this.productsData["products"];
      this.productsData.language = this.selectedLanguage;
    },

    generateResponse() {
      let resp = JSON.parse(JSON.stringify(this.productsData));

      // Karkhana building
      if (this.hasNullValue(resp.sections.karkhana_building))
        resp.sections.karkhana_building = null;

      // Head Section
      if (this.hasNullValue(resp.sections.head_section))
        resp.sections.head_section = null;

      // Mission Vision
      if (this.hasNullValue(resp.sections.mission_vision))
        resp.sections.mission_vision = null;

      // Values
      if (this.hasNullValue(resp.sections.values)) resp.sections.values = null;

      if (this.hasNullValue(resp.sections.team)) resp.sections.team = null;

      return resp;
    },

    valid() {
      return (
        this.productsData &&
        this.productsData.grade_label &&
        this.productsData.type_label &&
        this.productsData.product_label &&
        this.productsData.school_services_label &&
        this.productsData.student_services_label &&
        this.productsData.learn_more_label &&
        this.productsData.download_label &&
        this.productsData.language
      );
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "@/styles/pages/_dashboard_blogs.scss";7
.karkhana-building-image {
  width: 400px;
  height: 200px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border: 1px dashed black;
  background-color: whitesmoke;
  border-radius: 10px;
  cursor: pointer;
}
</style>
