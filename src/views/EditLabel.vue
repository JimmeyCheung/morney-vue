<template>
  <Layout>
    <div class="tags">
      <Icon name="left" />
      <span>编辑标签</span>
    </div>
    <FormItem field-name="标签名" placeholder="请填写标签名" :value.sync="labelName" />
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class EditLabel extends Vue {
  labelName = "";
}
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
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>