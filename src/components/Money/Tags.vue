<template>
  <div class="tags-wrapper">
    <ul class="tags">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="selectedTags.indexOf(tag)>-1&&'selected'"
        @click="toggle(tag)"
        class="tag-item"
      >
        <Icon :name="tag.icon"></Icon>
        <span>{{tag.name}}</span>
      </li>
      <li class="add-Item" @click="showModal()">
        <Icon name="add"></Icon>
        <span>添加</span>
      </li>
    </ul>
    <TagModal ref="tagModal"></TagModal>
  </div>
</template>


<script lang='ts'>
import { Component, Mixins } from "vue-property-decorator";
import tagHelper from "@/mixins/tagHelper";
import TagModalVue from "@/components/TagModal.vue";

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
      // this.selectedTags.push(tag);
      this.selectedTags = [tag]; // 单次选中一个标签
    }
    this.$emit("select:tags", this.selectedTags);
  }

  showModal() {
    (this.$refs.tagModal as TagModalVue).show();
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags-wrapper {
  font-size: 14px;
  padding: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  min-height: 132px;
  $bg: #d9d9d9;
  > .tags {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 48px;
      width: 48px;
      border-radius: 50%;
      margin-right: 12px;
      margin-top: 4px;
      font-size: 12px;
      cursor: pointer;
      &.selected {
        color: $color-highlight;
      }
    }
    .add-Item {
      svg {
        background: $bg;
        border-radius: 50%;
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