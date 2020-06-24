<template>
  <Layout class="layout">
    <Tags :tagList.sync="tagList" @select:tags="onSelectedTags" />
    <FormItem class="form-item" field-name="备注" placeholder="请填写备注" :value.sync="record.notes" />
    <Types :value.sync="record.type" />
    <NumberPad :value.sync="record.amount" @submit:value="submit" />
  </Layout>
</template>
<script lang='ts'>
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import { recordListModel } from "@/models/recordListModel.ts";
import tagListModel from "@/models/tagListModel";

window.localStorage.setItem("version", "0.0.1");

tagListModel.fetch();
recordListModel.fetch();

@Component({
  components: { Tags, Types, NumberPad }
})
export default class extends Vue {
  tagList = tagListModel.data;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0
  };
  recordList = recordListModel.data;
  submit() {
    recordListModel.create(this.record);
  }
  onSelectedTags(selectedTags: string[]) {
    this.record.tags = selectedTags;
  }
  @Watch("recordList")
  onRecordItemListChanged() {
    recordListModel.save();
  }
  @Watch("tagList")
  onTagListChanged() {
    tagListModel.save();
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