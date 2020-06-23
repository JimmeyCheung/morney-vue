<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tagList" :key="tag.id" :to="`/label/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="btn-wrapper">
      <Button class="btn" @click="create()">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";
tagListModel.fetch();
@Component
export default class extends Vue {
  tagList = tagListModel.data;
  create() {
    const name = window.prompt("请输出标签名");
    if (name) {
      const message = tagListModel.create(name);
      if (message === "duplicated") {
        window.alert("标签名重复了");
      } else if (message === "success") {
        window.alert("添加成功");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  padding-left: 6px;
  color: #000;
  font-size: 16px;

  & > .tag {
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
}
</style>