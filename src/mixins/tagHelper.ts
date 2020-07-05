import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class extends Vue {
    createTag(name: string) {
        if (name) {
            this.$store.commit("createTag", { name });
            const msg = this.$store.state.createTagError;
            msg ? this.$message.warning(msg, 1) : this.$message.success('添加成功', 1);
        }
    }
}