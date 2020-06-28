<template>
  <Layout class="layout">
    <Tags @select:tags="onSelectedTags" />
    <FormItem
      class="form-item"
      field-name="备注"
      placeholder="请填写备注"
      :value.sync="record.notes"
    />
    <Tabs :value.sync="record.type" :data-source="tabDataSource" />
    <NumberPad :value.sync="record.amount" @submit:value="submit" />
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import recordTypeList from "@/constants/recordTypeList";

window.localStorage.setItem("version", "0.0.1");

@Component({
  components: { Tags, Tabs, NumberPad },
})
export default class extends Vue {
  tabDataSource = recordTypeList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  recordList = this.$store.state.recordList;
  created() {
    this.$store.commit("fetchRecord");
  }
  submit() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert("请选择标签后再提交");
    }
    this.$store.commit("createRecord", this.record);
  }
  onSelectedTags(selectedTags: string[]) {
    this.record.tags = selectedTags;
  }
  initPageInfo() {
    Object.assign(this.record, {
      notes: "",
      amount: 0,
    });
  }
}
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column-reverse;

  .form-item {
    background: #f5f5f5;
  }
}
</style>
