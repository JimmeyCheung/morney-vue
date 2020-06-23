<template>
  <Layout class="layout">
    <Tags :tagList.sync="tagList" @select:tags="onSelectedTags" />
    <Notes :value.sync="record.notes" />
    <Types :value.sync="record.type" />
    <NumberPad :value.sync="record.amount" />
  </Layout>
</template>
<script lang='ts'>
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import { recordListModel } from "@/models/recordListModel.ts";
import tagListModel from "@/models/tagListModel";

window.localStorage.setItem("version", "0.0.1");

tagListModel.fetch();

@Component({
  components: { Tags, Notes, Types, NumberPad }
})
export default class extends Vue {
  tagList = tagListModel.data;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0
  };
  recordList: RecordItem[] = recordListModel.fetch();
  submit() {
    this.record.createdDate = new Date();
    const copyData = recordListModel.clone(this.record);
    this.recordList.push(copyData);
    console.log(this.recordList);
  }
  onSelectedTags(selectedTags: string[]) {
    console.log(1, selectedTags);
    this.record.tags = selectedTags;
  }
  @Watch("recordList")
  onRecordItemListChanged() {
    recordListModel.save(this.recordList);
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
}
</style>