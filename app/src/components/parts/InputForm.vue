<template>
<div class="field is-horizontal">
  <div class="field-label is-normal ">
    <label class="label is-size-7">{{ label }}</label>
  </div>
   <div class="field-body">
     <div class="field">
       <div class="control">
          <input
           class="input"
              :type="type"
              :name="name"
              :value="value"
              :placeholder="placeholder"
              v-model="email"
          />
       </div>
     </div>
   </div>
</div>
</template>
<script>
export default {
    name: "InputForm",
    props: {
        value: { type: String, required: true },
        type: { type: String, required: true },
        name: { type: String, required: true },
        placeholder: { type: String, required: false },
        label: { type: String, required: false },
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