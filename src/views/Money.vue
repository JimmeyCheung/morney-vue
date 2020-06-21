<template>
  <Layout class="layout">
    <Tags :tagList="tagList" />
    <Notes />
    <Types />
    <NumberPad />
  </Layout>
</template>

<script lang="js">
import Vue from "vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

export default Vue.extend({
  name: "Money",
  components: { Tags, Notes, Types, NumberPad },
  data: ()=>{
    return {
      tagList: ['衣','食','住','行']
    }
  }
});
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column-reverse;
}
</style>