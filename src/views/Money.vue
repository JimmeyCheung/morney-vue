<template>
  <Layout class="layout">
    <Tags :tagList.sync="record.tags" />
    <Notes :value.sync="record.notes" />
    <Types :value.sync="record.type" />
    <NumberPad :value.sync="record.amount" @update:value="submit()" />
  </Layout>
</template>
<script lang='ts'>
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import { model } from "@/store/model.ts";

window.localStorage.setItem("version", "0.0.1");

@Component({
  components: { Tags, Notes, Types, NumberPad }
})
export default class extends Vue {
  record: RecordItem = {
    tags: ["衣", "食", "住", "行"],
    notes: "",
    type: "-",
    amount: 0
  };
  recordList: RecordItem[] = model.fetch();
  submit() {
    this.record.createdDate = new Date();
    const copyData = model.clone(this.record);
    this.recordList.push(copyData);
    console.log(this.recordList);
  }
  @Watch("recordList")
  onRecordItemListChanged() {
    model.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column-reverse;
}
</style>