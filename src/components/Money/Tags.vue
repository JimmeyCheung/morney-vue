<template>
  <div class="tags-wrapper">
    <a-carousel dot-position="bottom" dotsClass="dots">
      <div v-for="(tagList,index) of carouselList" :key="index">
        <ul class="tags">
          <li
            v-for="tag in tagList"
            :key="tag.id"
            :class="tag.icon==='add'?'add-item':(selectedTags.indexOf(tag)>-1&&'selected')"
            @click="tag.icon==='add'?showModal():toggle(tag)"
          >
            <Icon :name="tag.icon"></Icon>
            <span>{{tag.name}}</span>
          </li>
        </ul>
      </div>
    </a-carousel>
    <TagModal ref="tagModal"></TagModal>
  </div>
</template>


<script lang='ts'>
import { Component, Mixins } from "vue-property-decorator";
import tagHelper from "@/mixins/tagHelper";
import TagModalVue from "@/components/TagModal.vue";

//单页走马灯上限
const carouselLength = 10;

@Component({
  computed: {
    carouselList() {
      const list = this.$store.state.tagList;
      const copyList = Array.from(list);
      copyList.push({
        icon: "add",
        name: "添加"
      });
      const arr = [];
      while (copyList.length > 0) {
        arr.push(copyList.splice(0, carouselLength));
      }
      return arr;
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
$bg: #d9d9d9;
.tags-wrapper {
  position: relative;
  font-size: 14px;
  padding: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ::v-deep {
    .dots {
      $bgcolor: rgb(160, 154, 154);
      bottom: 0;
      & > li {
        background: $bgcolor;
      }
      & > .slick-active {
        button {
          background: #000;
        }
      }
    }
  }

  .tags {
    flex: 1;
    display: flex;
    min-height: 120px;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
    > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 48px;
      width: 20%;
      margin-top: 4px;
      border-radius: 50%;
      font-size: 12px;
      cursor: pointer;
      &.selected {
        color: $color-highlight;
      }
    }
    .add-item {
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
  .spread {
    position: absolute;
    bottom: 5px;
    width: 48px;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>