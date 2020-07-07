import Vue from 'vue'
import { message, Modal, Input, Button, DatePicker, Tabs, Carousel } from 'ant-design-vue';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Icon from '@/components/Icon.vue';
import Layout from '@/components/Layout.vue';
import FormItem from '@/components/FormItem.vue';
import TagModal from '@/components/TagModal.vue';

Vue.config.productionTip = false;
Vue.prototype.$message = message;
Vue.use(Modal);
Vue.use(Input);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Tabs);
Vue.use(Carousel);

Vue.component('Nav', Nav);
Vue.component('Icon', Icon);
Vue.component('Layout', Layout);
Vue.component('FormItem', FormItem);
Vue.component('TagModal', TagModal);

// 引入assets全部的 svg icon
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
    requireContext.keys().forEach(requireContext);
try {
    importAll(require.context("./assets/icons", true, /\.svg$/));
} catch (err) {
    console.log(err);
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

window.onload = function () {
    setTimeout(function () {
    }, 0);
};
