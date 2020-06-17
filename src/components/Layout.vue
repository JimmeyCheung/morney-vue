<template>
    <div class="wrapper">
    <div class="content">
      <slot />
    </div>
    <Nav class="nav"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Layout extends Vue {
}
</script>

<style lang="scss" scoped>
  .wrapper{
    display: flex;
    flex-direction: column;
    height: 100vh;

    .content{
      flex: 1;
      height: 100%;
      background: yellow;
      overflow: auto;
    }
  }
</style>