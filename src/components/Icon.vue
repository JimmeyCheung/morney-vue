<template>
  <svg>
    <use :xlink:href="'#'+id" />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["id"]
});
</script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>