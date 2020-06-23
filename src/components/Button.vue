<template>
  <button @click="$emit('click',$event)">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
button {
  height: 40px;
  border: 0;
  padding: 0 16px;
  background: #767676;
  font-size: 17px;
  color: #fff;
  line-height: 40px;
  border-radius: 4px;
}
</style>