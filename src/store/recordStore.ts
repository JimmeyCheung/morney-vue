import clone from '../lib/clone';
const localStorageKeyName = 'recordList';
const recordStore = {
    recordList: [] as RecordItem[],
    fetch() {
        this.recordList = JSON.parse(localStorage.getItem("recordList") || "[]") as RecordItem[];
        return this.recordList;
    },
    saveRecords() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },
    createRecord(record: RecordItem) {
        const copyRecord = clone(record);
        copyRecord.createdDate = new Date().toString();
        this.recordList.push(copyRecord);
        window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
    }
}
recordStore.fetch();
export default recordStore;