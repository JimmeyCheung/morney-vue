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

@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList;
    }
  }
})
export default class extends Vue {
  created() {
    this.$store.commit("fetchTag");
  }
  create() {
    const name = window.prompt("请输出标签名");
    if (name) {
      this.$store.commit("createTag", name);
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