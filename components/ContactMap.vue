<template>
  <section class="contact-map">
    <div class="container">
      <h1 class="page-title">LOCATION MAP</h1>
    </div>
    <div class="map">
      <iframe
        width="100%"
        height="540"
        src="https://maps.google.com/maps?q=karkhana%20kathmandu&t=&z=18&ie=UTF8&iwloc=&output=embed"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
      ></iframe>
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
@import "@/styles/components/_contact_map.scss";
</style>