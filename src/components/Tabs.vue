<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li
      v-for="item in dataSource"
      :key="item.value"
      class="tabs-item"
      :class="{[classPrefix+'-tabs-item']:classPrefix,'selected':selectedItem.value===item.value}"
      @click="select(item)"
    >{{item.text}}</li>
  </ul>
</template>


<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
type DataSourceItem = {
  text: string;
  value: string;
};

@Component
export default class Types extends Vue {
  @Prop({ required: true }) readonly dataSource!: DataSourceItem[];
  @Prop() classPrefix?: string;
  @Prop() selectedIndex?: number;

  selectedItem: DataSourceItem = {
    value: "",
    text: ""
  };
  created() {
    const index = this.selectedIndex || 0;
    const item = this.dataSource.find((item, i) => i === index);
    if (item) {
      this.select(item);
    }
  }
  select(item: DataSourceItem) {
    this.selectedItem = item;
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>