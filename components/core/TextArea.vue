<template>
  <div class="form-group">
    <label v-if="label" :for="id">{{label}}</label>

    <textarea
      ref="input"
      class="form-control"
      :id="id"
      :placeholder="placeholder"
      v-model="val"
      @input="updateValue()"
      :rows="rows"
      :cols="cols"
      :maxlength="maxlength"
    ></textarea>
    <label v-if="maxlength">Count: {{val.length}}</label>
  </div>
</template>

<script>
export default {
  name: "TextArea",
  props: {
    id: {
      type: String,
      required: true
    },

    value: {
      type: String
    },

    label: {
      type: String
    },

    placeholder: {
      type: String
    },

    rules: {
      type: String
    },

    rows: {
      type: String
    },

    cols: {
      type: String
    },

    maxlength: {
      type: Number
    }
  },

  data() {
    return {
      val: this.value || ""
    };
  },

  methods: {
    updateValue() {
      this.$emit("input", this.val);
    }
  }
};
</script>

<style scoped lang="scss">
label {
  font-size: 12px;
}
</style>