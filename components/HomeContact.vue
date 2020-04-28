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
                Do you have any questions? Just want to learn more about our philosophy or products ?
                Give us a call to learn more.
                <br />
                <br />You can call us at:
                <div class="pl-4">
                  Phone: {{phone}}
                  <br />
                  Mobile/Viber/Whatsapp: {{mobile}}
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
                At Karkhana our office is also a teacher. Visitors - whether they are parents, teachers or school leaders
                - learn more about us by visiting and seeing our facilities. We welcome you to
                visit us. But please do make an appointment before you come so that we can give you a great tour!
                <br />

                <nuxt-link to="/contact" class="btn btn-primary btn-take-a-tour">
                  <i class="fal fa-ticket icon"></i>Take a Tour
                </nuxt-link>
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
  name: "HomeContact",
  props: ["phone", "mobile"]
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_home_contact.scss";
</style>