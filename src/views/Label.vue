<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in tagList" :key="tag">
        <span>{{tag}}</span>
        <Icon name="right" />
      </li>
    </ol>
    <div class="btn-wrapper">
      <button class="btn" @click="create()">新建标签</button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tagListModel } from "@/models/tagListModel";
tagListModel.fetch();
@Component
export default class extends Vue {
  tagList = tagListModel.data;
  create() {
    const tagName = window.prompt();
    if (tagName) {
      tagListModel.create(tagName);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  padding-left: 6px;
  color: #000;
  font-size: 16px;

  & > li {
    display: flex;
    min-height: 44px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e5e6;
    svg {
      width: 18px;
      height: 18px;
      margin-right: 12px;
      color: #666;
    }
  }
}
.btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 44px;

  & > .btn {
    height: 40px;
    border: 0;
    padding: 0 16px;
    background: #767676;
    font-size: 17px;
    color: #fff;
    line-height: 40px;
    border-radius: 4px;
  }
}
</style>