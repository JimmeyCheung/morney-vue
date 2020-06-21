<template>
  <Layout class="layout">
    <Tags :tagList.sync="tagList" />
    <Notes />
    <Types />
    <NumberPad />
  </Layout>
</template>
<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
@Component({
  components: { Tags, Notes, Types, NumberPad }
})
export default class extends Vue {
  tagList: string[] = ["衣", "食", "住", "行"];
}
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column-reverse;
}
</style>