<template>
  <Layout class="layout">
    <Tags :tagList.sync="record.tags" />
    <Notes :value.sync="record.notes" />
    <Types :value.sync="record.type" />
    <NumberPad :value.sync="record.amount" />
  </Layout>
</template>
<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
};
@Component({
  components: { Tags, Notes, Types, NumberPad }
})
export default class extends Vue {
  record: Record = {
    tags: ["衣", "食", "住", "行"],
    notes: "",
    type: "-",
    amount: 0
  };
}
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column-reverse;
}
</style>