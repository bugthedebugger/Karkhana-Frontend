<template>
  <div>
    <div class="d-flex flex-column">
      <input
        type="text"
        class="form-control mb-1"
        v-model="value.title"
        placeholder="Section Title"
        @input="emitUpdate()"
      />

      <div v-for="(valueItem, index) in value.values" :key="index">
        <div class="d-flex mb-2">
          <input
            type="text"
            class="form-control form-control-sm mr-2"
            v-model="value.values[index].title"
            placeholder="Title"
            @input="emitUpdate()"
          />
          <button class="btn btn-sm btn-secondary" @click="remove(index)">
            <i class="fal fa-trash-alt"></i>
          </button>
        </div>

        <TextArea
          :id="'value-text-' + index"
          placeholder="Text"
          :maxlength="300"
          v-model="value.values[index].text"
          @input="emitUpdate()"
        />
        <hr />
      </div>

      <div class="text-center">
        <button class="btn btn-sm btn-success" @click="add()">Add new</button>
      </div>
    </div>
  </div>
</template>

<script>
import TextArea from "~/components/core/TextArea";

export default {
  name: "AboutValuesInput",
  components: { TextArea },
  props: ["_value"],
  data() {
    return {
      value: this._value
    };
  },

  created() {
    if (!this.value.values) this.value.values = [];
  },

  methods: {
    add() {
      this.value.values.push({
        title: null,
        text: null
      });
      // debugger;
      this.emitUpdate();
    },

    remove(index) {
      this.value.values.splice(index, 1);
      this.emitUpdate();
    },

    emitUpdate() {
      this.$emit("input", this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/dashboard/_slider_image_input.scss";
</style>