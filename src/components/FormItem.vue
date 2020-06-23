<template>
  <div class="notes">
    <label>
      <span>{{fieldName}}</span>
      <input
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="onChildChanged($event.target.value)"
      />
    </label>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class FormItem extends Vue {
  @Prop() value!: string;
  @Prop() fieldName!: string;
  @Prop() placeholder?: string;
  onChildChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.notes {
  font-size: 14px;
  background: #f5f5f5;
  padding-left: 16px;
  display: flex;
  align-items: center;
  span {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>