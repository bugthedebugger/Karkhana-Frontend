<template>
  <section class="about">
    <div class="pt-5 d-none d-md-block"></div>
    <div class="container pb-5">
      <div class="row">
        <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12 content">
          <h5 class="about-karkhana text-uppercase">{{ aboutData.label }}</h5>
          <p class="about-karkhana-detail">
            <span class="first-letter">{{ aboutData.text.charAt(0).toUpperCase() }}</span>
            {{aboutData.text.slice(0)}}
            <br />
            <nuxt-link
              :to="'/about?lang=' + $route.query.lang"
              class="learn-more text-uppercase"
            >{{aboutData.button_label}}</nuxt-link>
          </p>

          <div class="row">
            <div class="col-md-6">
              <div class="stat">
                <div class="stat-icon">
                  <i class="far fa-users-class">
                    <img src="/images/blob-students-reached.svg" />
                  </i>
                </div>
                <div class="stat-detail">
                  <div
                    class="stat-title"
                  >{{stats.students_reached ? stats.students_reached.label : DefaultValue().home.stats.students_reached.label}}</div>
                  <div
                    class="stat-data"
                  >{{stats.students_reached ? stats.students_reached.value : DefaultValue().home.stats.students_reached.value}}</div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="stat">
                <div class="stat-icon">
                  <i class="far fa-users">
                    <img src="/images/blob-schools-we-work-with.svg" />
                  </i>
                </div>
                <div class="stat-detail">
                  <div
                    class="stat-title"
                  >{{stats.employees ? stats.employees.label : DefaultValue().home.stats.employees.label}}</div>
                  <div
                    class="stat-data"
                  >{{stats.employees ? stats.employees.value : DefaultValue().home.stats.employees.value}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="seperator"></div>
          <div class="row">
            <div class="col-md-6">
              <div class="stat">
                <div class="stat-icon">
                  <i class="far fa-globe-asia">
                    <img src="/images/blob-schools-we-work-with.svg" />
                  </i>
                </div>
                <div class="stat-detail">
                  <div
                    class="stat-title"
                  >{{stats.countries_we_work_in ? stats.countries_we_work_in.label : DefaultValue().home.stats.countries_we_work_in.label}}</div>
                  <div
                    class="stat-data"
                  >{{stats.countries_we_work_in ? stats.countries_we_work_in.value : DefaultValue().home.stats.countries_we_work_in.value}}</div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="stat">
                <div class="stat-icon">
                  <i class="far fa-building">
                    <img src="/images/blob-partners.svg" />
                  </i>
                </div>
                <div class="stat-detail">
                  <div
                    class="stat-title"
                  >{{stats.cities_we_work_in ? stats.cities_we_work_in.label : DefaultValue().home.stats.cities_we_work_in.label}}</div>
                  <div
                    class="stat-data"
                  >{{stats.cities_we_work_in ? stats.cities_we_work_in.value : DefaultValue().home.stats.cities_we_work_in.value}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hidden <= sm -->
        <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12 pics d-none d-md-block">
          <div class="gallery">
            <ul class="no-bullets">
              <li>
                <div class="blob-pic blob-pic-1"></div>
                <div
                  style="background-image: url(/images/gallery-pic-1.png)"
                  class="gallery-img pic-1"
                ></div>
              </li>
              <li>
                <div class="blob-pic blob-pic-2"></div>
                <div
                  style="background-image: url(/images/gallery-pic-2.png)"
                  class="gallery-img pic-2"
                ></div>
              </li>
              <li>
                <div class="blob-pic blob-pic-3"></div>
                <div
                  style="background-image: url(/images/gallery-pic-3.png)"
                  class="gallery-img pic-3"
                ></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DefaultValue from "~/helpers/default-values";

export default {
  name: "HomeAbout",
  props: ["aboutData", "stats"],
  data() {
    return {};
  },

  methods: {
    DefaultValue() {
      return DefaultValue;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_home_about.scss";
</style>