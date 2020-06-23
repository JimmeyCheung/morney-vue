<template>
  <svg @click="$emit('click',$event)">
    <use :xlink:href="'#'+name" />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";
export default {
  props: ["name"]
};
</script>

<style lang="scss" scoped>
svg {
  width: 2em;
  height: 2em;
  fill: currentColor;
}
</style>