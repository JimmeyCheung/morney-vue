import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        tagList: [] as Tag[],
        errorMessage: '',
        recordList: [] as RecordItem[],
        currentTag: undefined as Tag | undefined
    },
    getters: {

    },
    mutations: {
        //Record
        fetchRecord(state) {
            state.recordList = JSON.parse(localStorage.getItem("recordList") || "[]") as RecordItem[];
            return this.recordList;
        },
        createRecord(state, record) {
            const copyRecord = clone(record);
            copyRecord.createdDate = new Date().toString();
            state.recordList.push(copyRecord);
            store.commit("saveRecord");
        },
        saveRecord(state) {
            window.localStorage.setItem("recordList", JSON.stringify(state.recordList));
        },
        //Tag
        fetchTag(state) {
            state.tagList = JSON.parse(window.localStorage.getItem("tagList") || '[]');
            // 初始化标签
            if (state.tagList.length === 0) {
                store.commit("createTag", "衣");
                store.commit("createTag", "食");
                store.commit("createTag", "住");
                store.commit("createTag", "行");
            }
            return state.tagList;
        },
        createTag(state, name) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return state.errorMessage = '标签名重复了';
            }
            const id = createId().toString();
            state.tagList.push({ id, name: name });
            store.commit("saveTag");
        },
        updateTag(state, payload: { id: string, name: string }) {
            const { id, name } = payload;
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    return state.errorMessage = '标签名重复了';
                } else {
                    const tag = state.tagList.find(item => item.id === id) as Tag;
                    tag.name = name;
                    store.commit("saveTag");
                }
            } else {
                state.errorMessage = '未知的错误';
            }
        },
        saveTag(state) {
            window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
        },
        removeTag(state, id) {
            const index = state.tagList.findIndex(v => v.id === id);
            if (state.tagList.splice(index, 1).length > 0) {
                state.currentTag = undefined;
            }
            store.commit("saveTag");
        },
        findTag(state, id) {
            state.currentTag = state.tagList.find(t => t.id === id);
            console.log('currentTag', state.currentTag);
        }

    }
})
export default store;