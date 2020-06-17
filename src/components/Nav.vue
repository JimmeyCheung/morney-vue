<template>
  <div class="nav">
    <router-link to="/money">money</router-link>
    <router-link to="/label">label</router-link>
    <router-link to="/statistics">statistics</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Nav extends Vue {
  @Prop() private msg!: string;
}
</script>

<style lang="scss" scoped>
.nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 10px;
  }
}
</style>