<template>
  <section class="about-main">
    <div class="karkhana-team">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <h1 class="title">The Karkhana Family</h1>
            <p class="description">Learn more about our people and their motivations.</p>
          </div>
          <div class="col-md-6 col-sm-12">
            <div v-if="!showVideo" class="ml-auto about-video-thumbnail">
              <i class="fal fa-play-circle play cursor-pointer" @click="showVideo = true"></i>
              <div class="about-video-thumbnail-overlay"></div>
            </div>

            <div v-else class="video-wrapper">
              <img class="k-loading" src="/images/k-loading.gif" />
              <iframe
                src="https://www.youtube.com/embed/CDFPQATSsiY?autoplay=1"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>

            <!-- display gap on mobile -->
            <!-- <div class="mb-5 d-md-none"></div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="red-wave"></div>

    <div class="company-ethics">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card">
              <img class="card-img-top" src="/images/karkhana-building.png" />
              <div class="card-body">
                <h2 class="title">Our Vision</h2>
                <p class="content">
                  We created Karkhana to nurture a spirit of innovating locally so as to make a
                  global impact. We want to empower people with the skills &amp; attitudes that will
                  help them build their future and the future of their community.
                </p>

                <div class="d-none d-md-block pb-4"></div>

                <h2 class="title">Our Mission</h2>
                <h3 class="subtitle">How will we achieve our vision? We will make learning fun!</h3>
                <div class="d-none d-md-block pb-3"></div>
                <p class="content">
                  We will do this by showing children creative ways of using science and technology.
                  Children will learn how science and technology can help them solve the problems in
                  their own lives, in their community, in their country, and globally.
                </p>
              </div>
            </div>
          </div>
          <div class="col d-none d-md-block">
            <div class="more-content">
              <h2 class="title mb-5">Our Values</h2>
              <h3 class="subtitle">We exist for our people</h3>
              <p class="content">
                Karkhana’s first and biggest responsibility is to its own team. Only with an honest
                understanding of individual aspirations can we achieve our collective mission.
              </p>

              <h3 class="subtitle">We push boundaries in everything we do</h3>
              <p class="content">
                In our work we try to go past what we already know and break new ground.
                We have a commitment to relentlessly looking for the real edge of what is
                possible within our geographical and socio-economic constraints.
              </p>

              <h3 class="subtitle">We evoke emotions through our work</h3>
              <p class="content">
                The best learning happens when our learning experiences are emotionally rich and meaningful.
                The best learning experiences are created by people who feel emotionally engaged with their work.
              </p>

              <h3 class="subtitle">We share beyond to catalyze change</h3>
              <p class="content">
                Realizing our vision requires more than our effort.
                So we share our knowledge and enthusiasm freely to catalyze other institutions
                and individuals that want to walk the same path as us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container pt-5 pb-5 d-none d-md-block">
      <div class="col-md-12"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutMain",
  data() {
    return {
      showVideo: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_about_main.scss";
</style>