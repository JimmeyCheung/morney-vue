<template>
  <a-modal
    class="modal"
    v-model="visible"
    title="添加标签"
    ok-text="确认"
    cancel-text="取消"
    @ok="handleOk"
  >
    <a-input ref="refInput" placeholder="请输入标签名" v-model="tagName" />
  </a-modal>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop, Watch, Mixins } from "vue-property-decorator";
import tagHelper from "@/mixins/tagHelper";
@Component
export default class extends Mixins(tagHelper) {
  visible = false;
  tagName: string = "";
  handleOk() {
    this.createTag(this.tagName);
    this.hide();
  }
  show() {
    this.tagName = "";
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
}
</script>

<style lang='scss' scoped>
.modal {
  height: 50px;
}
</style>