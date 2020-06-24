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
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import store from "@/store/index2";

window.localStorage.setItem("version", "0.0.1");

@Component({
  components: { Tags, Types, NumberPad }
})
export default class extends Vue {
  tagList = store.tagList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0
  };
  recordList = store.recordList;
  submit() {
    store.createRecord(this.record);
  }
  onSelectedTags(selectedTags: string[]) {
    this.record.tags = selectedTags;
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