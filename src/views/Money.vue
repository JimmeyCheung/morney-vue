<template>
  <Layout class="layout">
    <Tags />
    <Notes />
    <Types />
    <NumberPad />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

export default Vue.extend({
  name: "Money",
  components: { Tags, Notes, Types, NumberPad }
});
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column-reverse;
}
</style>