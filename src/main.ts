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

Vue.config.productionTip = false

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
