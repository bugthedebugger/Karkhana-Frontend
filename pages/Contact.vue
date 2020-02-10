<template>
  <div class="contact">
    <ContactInfo />
    <ContactMap />
    <Footer />
  </div>
</template>

<script>
import ContactInfo from "~/components/ContactInfo";
import ContactMap from "~/components/ContactMap";
import Footer from "~/components/Footer";

export default {
  layout: "portfolio",
  auth: false,
  components: { ContactInfo, ContactMap, Footer }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/contact.scss";
</style>
