<template>
  <Layout class="container">
    <div class="tags">
      <router-link class="tag" v-for="tag in tagList" :key="tag.id" :to="`/label/edit/${tag.id}`">
        <div>
          <Icon :name="tag.icon"></Icon>
          <span>{{tag.name}}</span>
        </div>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="btn-wrapper">
      <a-button type="primary" @click="showModal()">新建标签</a-button>
    </div>
    <TagModal ref="tagModal"></TagModal>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Mixins } from "vue-property-decorator";
import tagHelper from "@/mixins/tagHelper";
import TagModalVue from "../components/TagModal.vue";

@Component
export default class extends Mixins(tagHelper) {
  visible = false;
  get tagList() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTag");
  }
  showModal() {
    (this.$refs.tagModal as TagModalVue).show();
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  .tags {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    padding-left: 6px;
    overflow: auto;
    color: #000;
    font-size: 16px;

    & > .tag {
      display: flex;
      min-height: 44px;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e5e6;
      & > div {
        display: flex;
        align-items: center;
      }
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
    margin: 20px 0;
  }
}
</style>