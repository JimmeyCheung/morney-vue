<template>
  <div class="tags-wrapper">
    <a-carousel dot-position="bottom" dotsClass="dots" class="carousel">
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
import { Component, Mixins, Watch } from "vue-property-decorator";
import tagHelper from "@/mixins/tagHelper";
import TagModalVue from "@/components/TagModal.vue";

@Component({})
export default class Tags extends Mixins(tagHelper) {
  selectedTags: string[] = [];
  carouselLength = this.getCarouselLength(); //单页走马灯上限
  get carouselList() {
    const list = this.$store.state.tagList;
    const copyList = Array.from(list);
    copyList.push({
      icon: "add",
      name: "添加",
    });
    const arr = [];
    while (copyList.length > 0) {
      arr.push(copyList.splice(0, this.carouselLength));
    }
    return arr;
  }
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
  mounted() {
    window.onresize = () => {
      let canUse = true;
      if (canUse) {
        this.carouselLength = this.getCarouselLength();
        canUse = false;
        setTimeout(() => (canUse = true), 50);
      }
    };
  }
  getCarouselLength() {
    return window.document.body.clientHeight > 700 ? 15 : 10;
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ::v-deep {
    .carousel {
      height: 100%;
      .slick-slider,
      .slick-list,
      .slick-track {
        height: 100%;
        div {
          height: 100%;
        }
      }
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
  }

  .tags {
    flex: 1;
    display: flex;
    height: 100%;
    min-height: 120px;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
    > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 50%;
      width: 20%;
      border-radius: 50%;
      font-size: 12px;
      cursor: pointer;
      &.selected {
        color: $color-highlight;
      }
      & {
        @media screen and (min-height: 700px) {
          height: 33.333%;
        }
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