<template>
  <div class="tags-wrapper">
    <div class="btn-add">
      <button>新增标签</button>
    </div>
    <ul class="tags">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
export default {
  name: "Tags"
};
</script>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags-wrapper {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  > .tags {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    > li {
      background: #d9d9d9;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
    }
  }
  > .btn-add {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>