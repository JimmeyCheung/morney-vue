<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <Nav class="nav" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Layout"
});
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    height: 100%;
  }
}
</style>