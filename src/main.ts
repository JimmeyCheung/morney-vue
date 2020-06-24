import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Icon from '@/components/Icon.vue';
import Layout from '@/components/Layout.vue';
import FormItem from '@/components/FormItem.vue';
import Button from '@/components/Button.vue';
import tagListModel from '@/models/tagListModel';
import { recordListModel } from '@/models/recordListModel.ts';

Vue.config.productionTip = false
Object.assign(window, {
    tagList: tagListModel.fetch(),
    createTag: (name: string) => {
        const message = tagListModel.create(name);
        if (message === "duplicated") {
            window.alert("标签名重复了");
        } else if (message === "success") {
            window.alert("添加成功");
        }
    },
    removeTag: (id: string) => {
        return tagListModel.remove(id);
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name);
    },
    findTag: (id: string) => {
        return window.tagList.find(t => t.id === id);
    },
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => {
        recordListModel.create(record);
    }

});

// 引入assets全部的 svg icon
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
    requireContext.keys().forEach(requireContext);
try {
    importAll(require.context("./assets/icons", true, /\.svg$/));
} catch (err) {
    console.log(err);
}

Vue.component('Nav', Nav);
Vue.component('Icon', Icon);
Vue.component('Layout', Layout);
Vue.component('FormItem', FormItem);
Vue.component('Button', Button);



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
