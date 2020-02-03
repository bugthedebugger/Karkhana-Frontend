<template>
  <section class="about">
    <div class="pt-5 d-none d-md-block"></div>
    <div class="container pb-5">
      <div class="row">
        <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12 content">
          <h5 class="about-karkhana">ABOUT KARKHANA</h5>
          <p class="about-karkhana-detail">
            <span class="first-letter">K</span>
            arkhana believes that makers today are the shapers of the future. Making 
            teaches children to be resourceful,  to reshape their own environment, 
            to solve novel problems, and thus makes them confident in the face of 
            novel and unexpected problems. 
            <br />
            <nuxt-link to="/about" class="learn-more">LEARN MORE</nuxt-link>
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
                  <div class="stat-title">Students Reached</div>
                  <div class="stat-data">6100+</div>
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
                  <div class="stat-title">Employees</div>
                  <div class="stat-data">52+</div>
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
                  <div class="stat-title">Countries we work in</div>
                  <div class="stat-data">3</div>
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
                  <div class="stat-title">Cities we work in</div>
                  <div class="stat-data">6</div>
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
export default {
  name: "HomeAbout",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_home_about.scss";
</style>