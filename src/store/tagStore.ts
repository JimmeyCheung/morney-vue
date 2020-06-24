import createId from '@/lib/createId';
const localStorageKeyName = 'tagList';

const tagStore = {
    tagList: [] as Tag[],
    fetch() {
        this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.tagList;
    },
    createTag(name: string) {
        const names = this.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            window.alert("标签名重复了");
            return 'duplicated';
        }
        const id = createId().toString();
        this.tagList.push({ id, name: name });
        this.save();
        window.alert("添加成功");
        return 'success';
    },
    removeTag(id: string) {
        const index = this.tagList.findIndex(v => v.id === id);
        this.tagList.splice(index, 1);
        this.save();
        return true;
    },
    updateTag(id: string, name: string) {
        const idList = this.tagList.map(item => item.id);
        if (idList.indexOf(id) >= 0) {
            const names = this.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.tagList.filter(item => item.id === id)[0];
                tag.name = name;
                this.save();
                return 'success';
            }
        } else {
            return 'not found';
        }
    },
    findTag(id: string) {
        return this.tagList.find(t => t.id === id);
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
    }
}

tagStore.fetch();
export default tagStore;