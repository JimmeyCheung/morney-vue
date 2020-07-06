<template>
  <Layout class="layout">
    <Tags @select:tags="onSelectedTags" />
    <FormItem class="form-item" field-name="备注" placeholder="请填写备注" :value.sync="record.notes" />
    <Tabs :value.sync="record.type" :data-source="tabDataSource" />
    <NumberPad :value.sync="record.amount" @submit:value="submit" ref="numberPad" />
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import recordTypeList from "@/constants/recordTypeList";

window.localStorage.setItem("version", "0.0.1");

@Component({
  components: { Tags, Tabs, NumberPad }
})
export default class extends Vue {
  @Ref() readonly numberPad!: NumberPad;
  tabDataSource = recordTypeList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0
  };
  recordList = this.$store.state.recordList;
  created() {
    this.$store.commit("fetchRecord");
  }
  submit() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return this.$message.warning("请选择标签后再提交");
    }
    this.$store.commit("createRecord", this.record);
    const msg = this.$store.state.createTagError;
    msg ? this.$message.warning(msg) : this.$message.success("添加成功");
    this.reset();
  }
  onSelectedTags(selectedTags: Tag[]) {
    this.record.tags = selectedTags;
  }
  reset() {
    Object.assign(this.record, {
      notes: "",
      amount: 0
    });
    this.numberPad.clear();
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
