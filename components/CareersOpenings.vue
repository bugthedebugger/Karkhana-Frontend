<template>
  <section class="careers-openings">
    <div class="container">
      <div class="row" v-if="openings">
        <div class="col-md-4 col-sm-12">
          <perfect-scrollbar class="openings-scroll-area">
            <div class="openings-list">
              <div
                class="openings-list-item"
                :class="{'--active': opening === activeOpening}"
                v-for="(opening, index) in openings"
                :key="index"
                @click="activeOpening = opening"
              >
                <div class="position">{{opening.position}}</div>
                <div class="section">{{opening.section}}</div>
                <div class="location">
                  <i class="fal fa-map-marker-alt"></i>
                  {{opening.location}}
                </div>
              </div>
            </div>
          </perfect-scrollbar>
        </div>
        <div class="col-md-8 col-sm-12">
          <div class="active-opening-details">
            <div class="top-menu">
              <h3 class="title">{{activeOpening.position}}</h3>
              <div class="d-flex mb-2">
                <span class="section">{{activeOpening.section}}</span>

                <span class="location">{{activeOpening.location}}</span>

                <button class="btn btn-primary ml-auto">Apply</button>
              </div>
              <hr />
            </div>

            <div class="details" v-html="activeOpening.details"></div>
          </div>
        </div>
      </div>

      <h2 class="text-center" v-else>Sorry! We have no openings at the moment. Try back later.</h2>
    </div>
  </section>
</template>

<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

export default {
  name: "CareersOpenings",
  components: { PerfectScrollbar },

  data() {
    return {
      openings: [
        {
          position: "Senior Laravel Developer",
          section: "Team WASP",
          location: "Gyaneshowr, Kathmandu",
          details: ""
        },

        {
          position: "Karkhana Teacher",
          section: "Community of Teachers",
          location: "Gyaneshowr, Kathmandu",
          details: ""
        },

        {
          position: "Intern to the CEO",
          section: "Administration",
          location: "Gyaneshowr, Kathmandu",
          details: ""
        },

        {
          position: "Digital Marketing Analyst",
          section: "Team WASP",
          location: "Gyaneshowr, Kathmandu",
          details: ""
        },

        {
          position: "Inventory Person",
          section: "Team Inventory",
          location: "Gyaneshowr, Kathmandu",
          details: ""
        }
      ],

      activeOpening: null
    };
  },

  created() {
    // this.activeOpening = this.openings[0];
    this.openings = null;
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_careers_openings.scss";
</style>