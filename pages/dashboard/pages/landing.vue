<template>
  <div class="d-flex">
    <div class="flex-grow-1">
      <div class="container-card pt-3">
        <div v-if="landingData.sections">
          <div class="toolbar d-flex mb-4 mt-4">
            <h2 class="title mb-4">Landing Page</h2>

            <div class="ml-auto">
              <button class="btn btn-primary btn-sm mr-2" @click="save()" :disabled="saveLoading">
                <Spinner v-if="saveLoading" />Save
              </button>
              <nuxt-link to="/dashboard/pages" class="btn btn-secondary btn-sm">Cancel</nuxt-link>
            </div>
          </div>

          <!-- Language -->
          <div class="language mb-4">
            <h5>Language</h5>
            <select class="form-control" v-model="landingData.language">
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
                <textarea
                  class="form-control mb-2"
                  v-model="landingData.sections.about.text"
                  placeholder="About Text"
                ></textarea>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Label"
                  v-model="landingData.sections.about.label"
                />
              </div>
              <div class="col">
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
                <label class="mb-1">Students Reached</label>
                <input
                  type="text"
                  class="form-control form-control-sm mb-1"
                  placeholder="Students Reached Label"
                  v-model="landingData.sections.stats.students_reached.label"
                />
                <input
                  type="text"
                  class="form-control form-control-sm mb-1"
                  placeholder="Students Reached Value"
                  v-model="landingData.sections.stats.students_reached.value"
                />
              </div>
              <div class="col">
                <label class="mb-1">Employees</label>
                <input
                  type="text"
                  class="form-control form-control-sm mb-1"
                  placeholder="Employees Label"
                  v-model="landingData.sections.stats.employees.label"
                />
                <input
                  type="text"
                  class="form-control form-control-sm mb-1"
                  placeholder="Employees Value"
                  v-model="landingData.sections.stats.employees.value"
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label class="mb-1">Countries We Work In</label>
                <input
                  type="text"
                  class="form-control form-control-sm mb-1"
                  placeholder="Countries We Work In - Label"
                  v-model="landingData.sections.stats.countried_we_work_in.label"
                />
                <input
                  type="text"
                  class="form-control form-control-sm mb-1"
                  placeholder="Countries We Work In - Value"
                  v-model="landingData.sections.stats.countried_we_work_in.value"
                />
              </div>
              <div class="col">
                <label class="mb-1">Cities We Work In</label>
                <input
                  type="text"
                  class="form-control form-control-sm mb-1"
                  placeholder="Cities We Work In - Label"
                  v-model="landingData.sections.stats.cities_we_work_in.label"
                />
                <input
                  type="text"
                  class="form-control form-control-sm mb-1"
                  placeholder="Cities We Work In - Value"
                  v-model="landingData.sections.stats.cities_we_work_in.value"
                />
              </div>
            </div>
          </div>

          <div class="partners mb-4">
            <h5>Partners</h5>
            <div class="row">
              <div class="col">
                <textarea
                  class="form-control mb-2"
                  v-model="landingData.sections.partners.text"
                  placeholder="Partners Text"
                ></textarea>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Label"
                  v-model="landingData.sections.partners.label"
                />
              </div>
              <div class="col">
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

export default {
  layout: "dashboard",
  auth: true,
  components: { Loading, Spinner, Gallery, SliderImageInput },
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
          label: null,
          value: null
        };
      if (!this.landingData.sections.stats.employees)
        this.landingData.sections.stats.employees = {
          label: null,
          value: null
        };
      if (!this.landingData.sections.stats.countried_we_work_in)
        this.landingData.sections.stats.countried_we_work_in = {
          label: null,
          value: null
        };
      if (!this.landingData.sections.stats.cities_we_work_in)
        this.landingData.sections.stats.cities_we_work_in = {
          label: null,
          value: null
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
          if (
            !(resp.sections.stats[key].label || resp.sections.stats[key].value)
          ) {
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
@import "@/styles/pages/_dashboard_blogs.scss";
</style>
