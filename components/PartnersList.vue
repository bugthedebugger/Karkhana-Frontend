<template>
  <section class="partners-list">
    <div class="container">
      <div class="current-partners">
        <h2 class="title">Our Current Partners</h2>
        <div class="d-flex justify-content-center flex-wrap mb-4">
          <div class="partners-list-item" v-for="(partner, index) in currentPartners" :key="index">
            <img :src="partner" />
          </div>
        </div>

        <div class="mt-4 text-center">
          <!-- <button class="btn btn-outline-primary">Load Old Partners</button> -->
        </div>
      </div>

      <!-- <div class="client-schools">
        <h2 class="title">Our Client Schools</h2>

        <div class="school-list">
          <div class="school-list-item d-flex" v-for="(schools, year) in clientSchools" :key="year">
            <div class="date">
              <span class="rotate-90">{{year}}</span>
            </div>
            <div class="schools w-100 align-self-center d-flex flex-wrap justify-content-around">
              <div class="school" v-for="(school, index) in schools" :key="index">
                <img :src="school" />
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  name: "PartnersList",
  data() {
    return {
      currentPartners: [
        "/images/partners/partner-1.png",
        "/images/partners/partner-2.png",
        "/images/partners/partner-3.png",
        "/images/partners/partner-4.png",
        "/images/partners/partner-5.png",
        "/images/partners/partner-6.png",
        "/images/partners/partner-7.png",
        "/images/partners/partner-8.png"
      ],

      clientSchools: {
        2020: [
          "/images/partners/school-1.png",
          "/images/partners/school-2.png",
          "/images/partners/school-3.png",
          "/images/partners/school-4.png",
          "/images/partners/school-5.png",
          "/images/partners/school-6.png"
        ],
        2019: [
          "/images/partners/school-1.png",
          "/images/partners/school-2.png",
          "/images/partners/school-3.png",
          "/images/partners/school-4.png",
          "/images/partners/school-5.png",
          "/images/partners/school-6.png"
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_partners_list.scss";
</style>