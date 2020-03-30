<template>
  <div class="partners">
    <PartnersMain />
    <PartnersList />
    <Footer />
  </div>
</template>

<script>
import PartnersMain from "~/components/PartnersMain";
import PartnersList from "~/components/PartnersList";
import Footer from "~/components/Footer";

export default {
  layout: "portfolio",
  auth: false,
  components: { PartnersMain, PartnersList, Footer },
  async asyncData({ redirect }) {
    redirect("/");
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/partners.scss";
</style>
