<template>
  <div class="d-flex">
    <div class="dashboard-content flex-grow-1">
      <div class="container-card pt-3">
        <div v-if="landingData.sections">
          <div class="toolbar d-flex mb-4 mt-4">
            <h1 class="title mb-4">Landing Page</h1>

            <div class="ml-auto">
              <button class="btn btn-primary btn-sm mr-2" @click="save()" :disabled="saveLoading">
                <Spinner v-if="saveLoading" />Save
              </button>
              <nuxt-link to="/dashboard/pages" class="btn btn-secondary btn-sm">Cancel</nuxt-link>
            </div>
          </div>

          <div class="page-form">
            <!-- Language -->
            <div class="language mb-4">
              <h5>Language</h5>
              <select class="form-control" v-model="landingData.language" @change="fetchData()">
                <option
                  v-for="language in languages"
                  :value="language.code"
                  :key="language.code"
                >{{language.name}}</option>
              </select>
            </div>

            <!-- Slider Images -->
            <div class="slider-images mb-4">
              <h5>Slider Images</h5>
              <SliderImageInput
                :_sliderImages="landingData.sections.sliders"
                @sliderImageChanged="handleSliderImageChanged"
              />
            </div>

            <!-- About -->
            <div class="about mb-4">
              <h5>About</h5>
              <div class="row">
                <div class="col">
                  <label>About Text</label>
                  <TextArea
                    id="about-text"
                    placeholder="About Text"
                    :maxlength="200"
                    v-model="landingData.sections.about.text"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label>About Label</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Label"
                    v-model="landingData.sections.about.label"
                  />
                </div>
                <div class="col">
                  <label>About Button Label</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Button Label"
                    v-model="landingData.sections.about.button_label"
                  />
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="stats mb-4">
              <h5>Stats</h5>
              <div class="row">
                <div class="col">
                  <label class="mb-1">Students Reached - Label</label>
                  <input
                    type="text"
                    class="form-control form-control-sm mb-1"
                    placeholder="Students Reached Label"
                    v-model="landingData.sections.stats.students_reached.label"
                  />
                </div>
                <div class="col">
                  <label class="mb-1">Employees - Label</label>
                  <input
                    type="text"
                    class="form-control form-control-sm mb-1"
                    placeholder="Employees Label"
                    v-model="landingData.sections.stats.employees.label"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col">
                  <label class="mb-1">Countries We Work In - Label</label>
                  <input
                    type="text"
                    class="form-control form-control-sm mb-1"
                    placeholder="Countries We Work In - Label"
                    v-model="landingData.sections.stats.countries_we_work_in.label"
                  />
                </div>
                <div class="col">
                  <label class="mb-1">Cities We Work In - Label</label>
                  <input
                    type="text"
                    class="form-control form-control-sm mb-1"
                    placeholder="Cities We Work In - Label"
                    v-model="landingData.sections.stats.cities_we_work_in.label"
                  />
                </div>
              </div>
            </div>

            <!-- Partners -->
            <div class="partners mb-4">
              <h5>Partners</h5>
              <div class="row">
                <div class="col">
                  <label>Partners Text</label>
                  <TextArea
                    id="partners-text"
                    placeholder="Partners Text"
                    :maxlength="200"
                    v-model="landingData.sections.partners.text"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label>Partners Label</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Label"
                    v-model="landingData.sections.partners.label"
                  />
                </div>
                <div class="col">
                  <label>Button Label</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Button Label"
                    v-model="landingData.sections.partners.button_label"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <Loading />
        </div>
      </div>
    </div>

    <div class="p-4">
      <Gallery pageCode="landing" />
    </div>
  </div>
</template>
<script>
import Loading from "~/components/Loading";
import Spinner from "~/components/Spinner";
import Gallery from "~/components/Dashboard/Gallery";
import SliderImageInput from "~/components/Dashboard/SliderImageInput";
import TextArea from "~/components/core/TextArea";

export default {
  layout: "dashboard",
  auth: true,
  components: { Loading, Spinner, Gallery, SliderImageInput, TextArea },
  data() {
    return {
      saveLoading: false,
      languages: null,
      galleryImages: null,
      landingData: {
        language: "en",
        sections: null
      }
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$axios.setHeader("Accept-Language", this.landingData.language);
      this.landingData.sections = null;
      this.$axios.get("/pages/landing").then(response => {
        this.$axios.get("/languages").then(response2 => {
          this.languages = response2.data.data;
          this.landingData.sections = response.data.data;
          this.correctData();
        });
      });
    },

    save() {
      this.saveLoading = true;
      this.$axios
        .post("/admin/pages/landing/update", this.generateResponse())
        .then(response => {
          this.saveLoading = false;
          this.$toast.show("Saved");
        });
    },

    correctData() {
      // Slider images
      if (!this.landingData.sections.sliders)
        this.landingData.sections.sliders = [];
      else {
        this.landingData.sections.sliders = this.landingData.sections.sliders.map(
          slider => {
            if (!slider.button) slider.button = { label: null, action: null };
            return slider;
          }
        );
      }

      // About
      if (!this.landingData.sections.about)
        this.landingData.sections.about = {
          text: null,
          label: null,
          button_label: null
        };

      // Stats
      if (!this.landingData.sections.stats.students_reached)
        this.landingData.sections.stats.students_reached = {
          label: null
        };
      if (!this.landingData.sections.stats.employees)
        this.landingData.sections.stats.employees = {
          label: null
        };
      if (!this.landingData.sections.stats.countries_we_work_in)
        this.landingData.sections.stats.countries_we_work_in = {
          label: null
        };
      if (!this.landingData.sections.stats.cities_we_work_in)
        this.landingData.sections.stats.cities_we_work_in = {
          label: null
        };

      // About
      if (!this.landingData.sections.partners)
        this.landingData.sections.partners = {
          text: null,
          label: null,
          button_label: null
        };
    },

    generateResponse() {
      let resp = JSON.parse(JSON.stringify(this.landingData));

      // sliders
      if (resp.sections.sliders) {
        resp.sections.sliders = resp.sections.sliders.map(slider => {
          if (!slider.button) slider.button = { label: null, action: null };
          return slider;
        });
      }

      // About
      if (resp.sections.about) {
        Object.keys(resp.sections.about).some(key => {
          if (!resp.sections.about[key]) {
            resp.sections.about = null;
            return true;
          }
        });
      }

      // Stats
      if (resp.sections.stats) {
        Object.keys(resp.sections.stats).some(key => {
          if (!resp.sections.stats[key].label) {
            resp.sections.stats = null;
            return true;
          }
        });
      }

      // Partners
      if (resp.sections.partners) {
        Object.keys(resp.sections.partners).some(key => {
          if (!resp.sections.partners[key]) {
            resp.sections.partners = null;
            return true;
          }
        });
      }

      return resp;
    },

    handleSliderImageChanged(newVal) {
      this.landingData.sections.sliders = newVal;
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "@/styles/pages/_dashboard_blogs.scss";
</style>
