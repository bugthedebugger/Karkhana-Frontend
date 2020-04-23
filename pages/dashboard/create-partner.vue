<template>
  <div>
    <div class="d-flex">
      <div class="dashboard-content flex-grow-1">
        <div class="toolbar d-flex mb-4 mt-4">
          <h1 class="title mb-4">Create Partner</h1>

          <div class="ml-auto">
            <button
              class="btn btn-primary btn-sm mr-2"
              @click="save()"
              :disabled="saveLoading || !valid()"
            >
              <Spinner v-if="saveLoading" />Save
            </button>
            <nuxt-link to="/dashboard/partners" class="btn btn-secondary btn-sm">Cancel</nuxt-link>
          </div>
        </div>

        <div class="container-card mt-0">
          <div class="product-input" v-if="value">
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
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Name -->
            <label>Name *</label>
            <input
              type="text"
              class="form-control form-control-sm mb-4"
              placeholder="Name"
              v-model="value.name"
            />

            <!-- Description -->
            <label>Description *</label>
            <TextArea id="description" v-model="value.description" rows="5" :maxlength="500" />
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
      mode: false, //false: create, true: update
      value: null,
      saveLoading: false
    };
  },

  created() {
    let id = this.$route.query.id;
    if (id === "new-partner") {
      this.mode = false;
      this.value = this.initPartner();
    } else {
      this.mode = true;
      this.fetchPartner(id);
    }
  },

  methods: {
    initPartner() {
      return {
        logo: null,
        name: null,
        description: null
      };
    },

    fetchPartner(id) {
      this.$axios
        .get("/admin/partners/" + id)
        .then(response => {
          this.value = response.data.data;
          this.value.logo = this.value.logo.path;
        })
        .catch(error => {
          this.$toast.show("Partner not found");
          this.$router.push({ path: "/dashboard/partners" });
        });
    },

    save() {
      this.saveLoading = true;
      if (this.mode) {
        this.$axios
          .post("/admin/partners/update/" + this.$route.query.id, this.value)
          .then(response => {
            this.$toast.show("Partner Updated");
            this.saveLoading = false;
          })
          .catch(error => {
            Helper.displayError(this.$toast, error);
            this.saveLoading = false;
          });
      } else {
        this.$axios
          .post("/admin/partners/create", this.value)
          .then(response => {
            this.$router.push({
              path: "/dashboard/partners"
            });
            this.$toast.show("Partner Created");
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
    },

    valid() {
      return (
        this.value &&
        this.value.name &&
        this.value.logo &&
        this.value.description
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