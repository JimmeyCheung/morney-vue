
const localStorageKeyName = 'tagList';
const tagListModel = {
    data: <any>[],
    create(tagName: string) {
        this.data.push(tagName);
    },
    fetch: () => {
        return JSON.parse(localStorage.getItem("tagList") || "[]") as [];
    },
    save(data: []) {
        window.localStorage.setItem("tagList", JSON.stringify(data));
    }
};
export { tagListModel }