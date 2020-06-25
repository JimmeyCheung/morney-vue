<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tagList" :key="tag.id" :to="`/label/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="btn-wrapper">
      <Button class="btn" @click="createTag()">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Mixins } from "vue-property-decorator";
import tagHelper from "@/mixins/tagHelper";

@Component
export default class extends Mixins(tagHelper) {
  get tagList() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTag");
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