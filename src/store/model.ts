
const localStorageKeyName = 'recordList';
const model = {
    fetch: () => {
        return JSON.parse(localStorage.getItem("recordList") || "[]") as RecordItem[];
    },
    save(data: RecordItem[]) {
        window.localStorage.setItem("recordList", JSON.stringify(data));
    },
    clone(data: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(data));
    }
};
export { model }