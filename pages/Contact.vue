<template>
  <div class="contact">
    <ContactInfo
      :address="contactData.address"
      :open_hours="contactData.open_hours"
      :open_days="contactData.open_days"
      :phone="contactData.phone"
      :email="contactData.email"
    />
    <ContactMap />
    <Footer />
  </div>
</template>

<script>
import ContactInfo from "~/components/ContactInfo";
import ContactMap from "~/components/ContactMap";
import Footer from "~/components/Footer";
import DefaultValue from "~/helpers/default-values";

export default {
  layout: "portfolio",
  auth: false,
  components: { ContactInfo, ContactMap, Footer },

  async asyncData({ $axios, params, error }) {
    try {
      const response = await $axios.get("/pages/contact");
      const contactData = response.data.data;

      // set default values if null
      Object.keys(contactData).forEach(key => {
        if (!contactData[key] && DefaultValue.home[key])
          contactData[key] = DefaultValue.home[key];
      });

      return { contactData };
    } catch (e) {
      console.log(e);
      error({ statusCode: 404 });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/contact.scss";
</style>
