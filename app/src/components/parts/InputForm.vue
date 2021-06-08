<template>
    <input
        :type="type"
        :name="name"
        :value="value"
        :placeholder="placeholder"
        v-model="email"
  />
</template>
<script>
export default {
    name: "InputForm",
    props: {
        value: { type: String, required: true },
        type: { type: String, required: true },
        name: { type: String, required: true },
        placeholder: { type: String, required: false },
        v: { type: Object, required: true },
    },
    computed: {
    email: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
        this.$emit("input", value);
      }
    }
  }
}
</script>