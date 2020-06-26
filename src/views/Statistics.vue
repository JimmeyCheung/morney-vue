<template>
  <Layout class="layout">
    <Tabs :data-source="tabDataSource" class-prefix="type" />
    <Tabs :data-source="intervalDataSource" class-prefix="interval" />
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import intervalList from "@/constants/intervalList";

@Component({
  components: { Tabs }
})
export default class extends Vue {
  tabDataSource = recordTypeList;
  intervalDataSource = intervalList;
}
</script>

<style lang='scss' scoped>
::v-deep {
  .type-tabs-item {
    background: #c4c4c4;
    &.selected {
      background: white;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
</style>