import Vue from 'vue';
import { Component } from 'vue-property-decorator';
@Component
export default class extends Vue {
    createTag() {
        const name = window.prompt("请输出标签名");
        if (name) {
            this.$store.commit("createTag", name);
        }
    }
}