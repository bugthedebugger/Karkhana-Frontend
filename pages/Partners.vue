<template>
  <div class="partners">
    <PartnersMain />
    <PartnersList :partners="partners" />
    <Footer />
  </div>
</template>

<script>
import PartnersMain from "~/components/PartnersMain";
import PartnersList from "~/components/PartnersList";
import Footer from "~/components/Footer";
import DefaultValue from "~/helpers/default-values";

export default {
  layout: "portfolio",
  auth: false,
  components: { PartnersMain, PartnersList, Footer },
  async asyncData({ $axios, query, error, redirect }) {
    if (!query.lang) redirect({ path: "/", query: { lang: "en" } });
    try {
      // fetch partners
      const partners = (await $axios.get("/pages/partners")).data.data;
      console.log("-----", );

      return { partners };
    } catch (e) {
      console.log(e);
      error({ statusCode: 404 });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/partners.scss";
</style>
