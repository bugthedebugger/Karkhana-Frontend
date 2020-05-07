<template>
  <div>
    <div class="d-flex">
      <div class="dashboard-content flex-grow-1">
        <div class="toolbar d-flex mb-4 mt-4">
          <h1 class="title mb-4">Create Product</h1>

          <div class="ml-auto">
            <button
              class="btn btn-primary btn-sm mr-2"
              @click="save()"
              :disabled="saveLoading || !valid()"
            >
              <Spinner v-if="saveLoading" />Save
            </button>
            <nuxt-link to="/dashboard/products" class="btn btn-secondary btn-sm">Cancel</nuxt-link>
          </div>
        </div>

        <div class="container-card mt-0">
          <div class="product-input" v-if="value">
            <div class="language mb-4">
              <h5>Language</h5>
              <select class="form-control" v-model="value.language">
                <option
                  v-for="language in languages"
                  :value="language.code"
                  :key="language.code"
                >{{language.name}}</option>
              </select>
            </div>

            <!-- Logo -->
            <div class="row mb-4">
              <div class="col">
                <div class="d-flex justify-content-center">
                  <div>
                    <label>Logo *</label>
                    <GalleryImageInput
                      ref="logoImageInput"
                      id="logo"
                      page_code="products"
                      :value="value.logo"
                      v-model="value.logo"
                      :get_path="true"
                    />
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="d-flex justify-content-center">
                  <div>
                    <label>Featured Image</label>
                    <GalleryImageInput
                      ref="featuredImageInput"
                      id="featured-image"
                      page_code="products"
                      :value="value.featured_image"
                      v-model="value.featured_image"
                      :get_path="true"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Color -->
            <div class="row">
              <div class="col">
                <label>Color *</label>
                <input type="color" class="form-control form-control-sm mb-4" v-model="value.color" />
              </div>

              <div class="col">
                <label>Secondary Color *</label>
                <input
                  type="color"
                  class="form-control form-control-sm mb-4"
                  v-model="value.secondary_color"
                />
              </div>
            </div>

            <!-- Unique Code -->
            <label>Unique Product Code *</label>
            <input
              type="text"
              class="form-control form-control-sm mb-4"
              placeholder="Unique product code"
              v-model="value.code"
            />

            <!-- Name -->
            <label>Product Name *</label>
            <input
              type="text"
              class="form-control form-control-sm mb-4"
              placeholder="Product Name"
              v-model="value.name"
            />

            <!-- Tag -->
            <label>Tag *</label>
            <TextArea id="tag" v-model="value.tag" rows="2" :maxlength="100" />

            <!-- Grade && Type -->
            <div class="row">
              <div class="col">
                <label>Grade *</label>
                <input
                  type="text"
                  class="form-control form-control-sm mb-4"
                  placeholder="Grade"
                  v-model="value.grade"
                />
              </div>
              <div class="col">
                <label>Type *</label>
                <input
                  type="text"
                  class="form-control form-control-sm mb-4"
                  placeholder="Type"
                  v-model="value.type"
                />
              </div>
            </div>

            <!-- School Services -->
            <div class="row">
              <div class="col">
                <label>School Services *</label>
                <input
                  type="text"
                  class="form-control form-control-sm mb-4"
                  placeholder="School Services"
                  v-model="value.school_services"
                />
              </div>
            </div>

            <!-- Student Services -->
            <div class="row">
              <div class="col">
                <label>Student Services *</label>
                <input
                  type="text"
                  class="form-control form-control-sm mb-4"
                  placeholder="Student Services"
                  v-model="value.student_services"
                />
              </div>
            </div>

            <!-- Description -->
            <label>Description *</label>
            <TextArea id="tag" v-model="value.description" rows="5" :maxlength="1000" />

            <!-- Facts -->
            <div class="facts-input mb-4">
              <label>Facts</label>
              <div class="d-flex flex-column">
                <div class="fact d-flex mb-2" v-for="(fact, index) in value.facts" :key="index">
                  <input
                    type="text"
                    class="form-control form-control-sm align-self-center mr-2"
                    placeholder="Student Services"
                    v-model="value.facts[index]"
                  />
                  <button
                    class="btn btn-secondary btn-sm align-self-center mr-2"
                    @click="removeFact(index)"
                  >
                    <i class="fal fa-trash"></i>
                  </button>
                </div>
              </div>
              <button class="btn btn-sm btn-success" @click="addFact()">Add new Fact</button>
            </div>

            <!-- Features -->
            <div class="features-input mb-4">
              <label>Features</label>
              <div class="d-flex flex-column">
                <div
                  class="feature d-flex mb-2"
                  v-for="(feature, index) in value.features"
                  :key="index"
                >
                  <div class="align-self-center mr-2">
                    <GalleryImageInput
                      :ref="'featureImageInput' + index"
                      :id="'feature-image' + index"
                      page_code="products"
                      v-model="value.features[index].logo"
                      value="value.features[index].logo"
                      width="50"
                      height="50"
                    />
                  </div>

                  <div class="align-self-center mr-2">
                    <TextArea
                      :id="'feature-' + index + 'text'"
                      custom_class="mb-0"
                      v-model="value.features[index].feature"
                      rows="2"
                    />
                  </div>

                  <button
                    class="btn btn-secondary btn-sm align-self-center"
                    @click="removeFeature(index)"
                  >
                    <i class="fal fa-trash"></i>
                  </button>
                </div>
              </div>
              <button class="btn btn-sm btn-success" @click="addFeature()">Add new Feature</button>
            </div>

            <!-- Brochure -->
            <label>Brochure</label>
            <!-- <input
              type="text"
              class="form-control form-control-sm mb-4"
              placeholder="Brochure"
              v-model="value.brochure"
            />-->
            <GalleryImageInput
              ref="brochureFileInput"
              id="brochure"
              page_code="products"
              :get_path="true"
              :value="value.brochure"
              v-model="value.brochure"
            />
          </div>
          <div v-else>
            <Loading />
          </div>
        </div>
      </div>

      <div class="ml-2 p-4 pl-2">
        <Gallery pageCode="products" @newImage="fetchGalleryImages()" />
      </div>
    </div>
  </div>
</template>

<script>
import GalleryImageInput from "~/components/Dashboard/GalleryImageInput";
import TextArea from "~/components/core/TextArea";
import Gallery from "~/components/Dashboard/Gallery";
import Helper from "~/helpers/common";
import Loading from "~/components/Loading";
import Spinner from "~/components/Spinner";

export default {
  name: "CreateProduct",
  layout: "dashboard",
  auth: true,
  components: { GalleryImageInput, TextArea, Gallery, Loading, Spinner },
  data() {
    return {
      language: "en",
      mode: false, //false: create, true: update
      value: null,
      languages: null,
      saveLoading: false
    };
  },

  created() {
    this.initProduct();
  },

  methods: {
    initProduct() {
      let id = this.$route.query.id;
      this.value = null;
      if (id === "new-product") {
        this.mode = false;
        this.value = this.emptyProduct();
      } else {
        this.mode = true;
        this.fetchProduct(id);
      }
    },

    emptyProduct() {
      this.$axios.get("/languages").then(response => {
        this.languages = response.data.data;
      });

      return {
        language: "en",
        logo: null,
        color: null,
        secondary_color: null,
        code: null,
        name: null,
        tag: null,
        grade: null,
        type: null,
        school_services: null,
        student_services: null,
        description: null,
        facts: [],
        features: [],
        brochure: null,
        featured_image: null
      };
    },

    fetchProduct(id) {
      this.$axios
        .get("/admin/product/" + id + "?language=" + value.language)
        .then(response => {
          this.$axios.get("/languages").then(response2 => {
            this.languages = response2.data.data;
            this.value = response.data.data;
            this.value.logo = this.value.logo.path;
            this.value.featured_image = this.value.featured_image.path;
            this.value.brochure = this.value.brochure.path;
            // this.value.language = "en";

            if (!this.value.color) this.value.color = "#ffffff";
            if (!this.value.secondary_color)
              this.value.secondary_color = "#ffffff";

            if (this.value.color > 6)
              this.value.color = this.value.color.substr(
                0,
                this.value.color.length - 2
              );

            if (this.value.secondary_color > 6)
              this.value.secondary_color = this.value.secondary_color.substr(
                0,
                this.value.secondary_color.length - 2
              );
          });
        })
        .catch(error => {
          this.$toast.show(error.response.data.message);
          this.$router.push({ path: "/dashboard/products" });
        });
    },

    save() {
      this.saveLoading = true;
      if (this.mode) {
        this.$axios
          .post("/admin/product/update", {
            ...this.value,
            product_id: this.$route.query.id
            // color: this.value.color + "FF",
            // secondary_color: this.value.secondary_color + "FF"
          })
          .then(response => {
            this.$toast.show("Product Updated");
            this.saveLoading = false;
          })
          .catch(error => {
            Helper.displayError(this.$toast, error);
            this.saveLoading = false;
          });
      } else {
        this.$axios
          .post("/admin/product/create", {
            ...this.value
            // color: this.value.color + "FF",
            // secondary_color: this.value.secondary_color + "FF"
          })
          .then(response => {
            this.$router.push({
              path: "/dashboard/products"
            });
            this.$toast.show("Product Created");
            this.saveLoading = false;
          })
          .catch(error => {
            Helper.displayError(this.$toast, error);
            this.saveLoading = false;
          });
      }
    },

    fetchGalleryImages() {
      this.$refs.logoImageInput.fetchGalleryImages();
      this.$refs.featuredImageInput.fetchGalleryImages();
      for (let i = 0; i < this.value.features.length; i++) {
        this.$refs["featureImageInput" + i].fetchGalleryImages();
      }
      this.$refs.brochureFileInput.fetchGalleryImages();
    },

    addFact() {
      this.value.facts.push("New fact " + (this.value.facts.length + 1));
    },

    removeFact(index) {
      this.value.facts.splice(index, 1);
    },

    addFeature() {
      this.value.features.push({
        logo: null,
        feature: "New feature " + (this.value.features.length + 1)
      });
    },

    removeFeature(index) {
      this.value.features.splice(index, 1);
    },

    valid() {
      return (
        this.value &&
        this.value.code &&
        this.value.color &&
        this.value.description &&
        this.value.grade &&
        this.value.logo &&
        this.value.featured_image &&
        this.value.name &&
        this.value.school_services &&
        this.value.secondary_color &&
        this.value.student_services &&
        this.value.tag &&
        this.value.type
      );
    }
  }
};
</script>

<style lang="scss" scoped>
label {
  margin-bottom: 0;
}
</style>