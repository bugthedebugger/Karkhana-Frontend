<template>
  <section class="contact">
    <div class="waves"></div>
    <div class="container pb-5">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="card contact-card">
            <div class="card-body">
              <h1 class="card-icon">
                <i class="fal fa-phone-office">
                  <img src="/images/blob-give-us-call.svg" />
                </i>
              </h1>
              <div class="card-title">Give us a call</div>
              <div class="card-content">
                Want to lean more about what we do and partner with us or just want to say Hello.
                Our line is always open. We would love to hear from you.
                <br />
                <br />You can call us at:
                <div class="pl-4">
                  +977 01 4444444
                  <br />+977 01 4444444
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="card contact-card">
            <div class="card-body">
              <h1 class="card-icon">
                <i class="fal fa-hotel">
                  <img src="/images/blob-take-a-tour.svg" />
                </i>
              </h1>
              <div class="card-title">Take a tour</div>
              <div class="card-content">
                We welcome anyone or any team that want to take a look around our space and learn more about us and our processes. Do let us know in advance when you're arriving so we can start brewing coffee.
                <br />
                <button class="btn btn-primary btn-take-a-tour">
                  <i class="fal fa-ticket icon"></i>Take a Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomeContact"
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_home_contact.scss";
</style>