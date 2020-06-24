import clone from '../lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
    data: [] as RecordItem[],
    fetch() {
        this.data = JSON.parse(localStorage.getItem("recordList") || "[]") as RecordItem[];
        return this.data;
    },
    create(record: RecordItem) {
        const copyRecord = clone(record);
        copyRecord.createdDate = new Date();
        this.data.push(copyRecord);
        window.localStorage.setItem("recordList", JSON.stringify(this.data));
    },
};
export { recordListModel }