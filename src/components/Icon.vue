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
  width: 2em;
  height: 2em;
}
</style>