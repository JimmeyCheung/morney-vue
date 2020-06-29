<template>
  <div class="tags-wrapper">
    <div class="btn-add">
      <button @click="createTag()">新增标签</button>
    </div>
    <ul class="tags">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="selectedTags.indexOf(tag)>-1&&'selected'"
        @click="toggle(tag)"
      >{{tag.name}}</li>
    </ul>
  </div>
</template>


<script lang='ts'>
import Vue from "vue";
import { Component, Prop, Mixins } from "vue-property-decorator";
import tagHelper from "@/mixins/tagHelper";

@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList;
    }
  }
})
export default class Tags extends Mixins(tagHelper) {
  selectedTags: string[] = [];
  created() {
    this.$store.commit("fetchTag");
  }
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("select:tags", this.selectedTags);
  }
}
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
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      cursor: pointer;
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
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
      cursor: pointer;
    }
  }
}
</style>