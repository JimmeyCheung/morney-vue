<template>
  <Layout>
    <div class="tags">
      <Icon name="left" />
      <span>编辑标签</span>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
    margin-right: 12px;
    color: #666;
  }
}
</style>