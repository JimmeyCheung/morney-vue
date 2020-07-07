import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import moment from 'moment';

Vue.use(Vuex)
// 初始化统计记录
const initialRecordList = [
    {
        "tags": [{
            "id": "42",
            "name": "服饰",
            "icon": "dress"
        }
        ],
        "notes": "买了一件裙子",
        "type": "-",
        "amount": 200,
        "createdDate": moment("2020-07-01")
    }, {
        "tags": [{
            "id": "43",
            "name": "餐饮",
            "icon": "food"
        }
        ],
        "notes": "吃了一顿大餐",
        "type": "-",
        "amount": 220,
        "createdDate": moment("2020-07-01")
    }, {
        "tags": [{
            "id": "45",
            "name": "交通",
            "icon": "traffic"
        }
        ],
        "notes": "乘坐地铁",
        "type": "-",
        "amount": 5,
        "createdDate": moment("2020-07-01")
    }, {
        "tags": [{
            "id": "47",
            "name": "红包",
            "icon": "cash"
        }
        ],
        "notes": ".",
        "type": "-",
        "amount": 520,
        "createdDate": moment("2020-05-20")
    }
];

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
            if (state.recordList.length === 0) {
                state.recordList = initialRecordList;
            }
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
                store.commit("createTag", { name: "服饰", icon: "dress" });
                store.commit("createTag", { name: "餐饮", icon: "food" });
                store.commit("createTag", { name: "居家", icon: "hotel" });
                store.commit("createTag", { name: "交通", icon: "traffic" });
                store.commit("createTag", { name: "旅游", icon: "travel" });
                store.commit("createTag", { name: "红包", icon: "cash" });
                store.commit("createTag", { name: "补贴", icon: "allowance" });
                store.commit("createTag", { name: "零食", icon: "sock" });
                store.commit("createTag", { name: "通讯", icon: "message" });
                store.commit("createTag", { name: "社交", icon: "social-contact" });
                store.commit("createTag", { name: "工资", icon: "salary" });
                store.commit("createTag", { name: "奖金", icon: "bonus" });
                store.commit("createTag", { name: "兼职", icon: "part-time" });
            }
            return state.tagList;
        },
        createTag(state, { name, icon = "default" }) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return state.errorMessage = '标签名重复了';
            }
            const id = createId().toString();
            state.tagList.push({ id, name, icon });
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