<template>
  <section class="about">
    <div class="blob-home-about"></div>
    <div class="container pt-5 pb-5">
      <div class="row">
        <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12 content">
          <h5 class="about-karkhana">ABOUT KARKHANA</h5>
          <p class="about-karkhana-detail">
            <span class="first-letter">K</span>
            arkhana is an education company and makerspace with a unique approach to learning.
            Our teachers come from a spectrum of engineers, designers, artists, scientists,
            programmers; that turn the classroom into a lab for discovery! We have been in the
            field of education for the past five years
            designing learning experiences for middle school students.
            We believe that the world is malleable and this is the insight we want our students to gain.
            <br>
            <a href="#" class="learn-more ml-auto text-right">LEARN MORE</a>
          </p>

          <div class="row">
            <div class="col-md-6">
              <div class="stat">
                <div class="stat-icon">
                  <i class="fal fa-graduation-cap">
                    <img src="/images/blob-students-reached.svg" />
                  </i>
                </div>
                <div class="stat-detail">
                  <div class="stat-title">Students Reached</div>
                  <div class="stat-data">10,000+</div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="stat">
                <div class="stat-icon">
                  <i class="fal fa-school">
                    <img src="/images/blob-schools-we-work-with.svg" />
                  </i>
                </div>
                <div class="stat-detail">
                  <div class="stat-title">Schools we work with</div>
                  <div class="stat-data">50+</div>
                </div>
              </div>
            </div>
          </div>
          <div class="seperator"></div>
          <div class="row">
            <div class="col-md-6">
              <div class="stat">
                <div class="stat-icon">
                  <i class="fal fa-users">
                    <img src="/images/blob-schools-we-work-with.svg" />
                  </i>
                </div>
                <div class="stat-detail">
                  <div class="stat-title">Employees</div>
                  <div class="stat-data">50+</div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="stat">
                <div class="stat-icon">
                  <i class="fal fa-suitcase">
                    <img src="/images/blob-partners.svg" />
                  </i>
                </div>
                <div class="stat-detail">
                  <div class="stat-title">Partners</div>
                  <div class="stat-data">30+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12 pics"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomeAbout",
  data() {
    return {
      stats: [
        {
          title: "Students Reached",
          icon: "blob-students-reached",
          data: "10,000+"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "@/styles/components/_home_about.scss";
</style>