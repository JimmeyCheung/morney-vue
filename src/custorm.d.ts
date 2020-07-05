type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdDate?: string;
};
type Tag = {
    id: string,
    name: string,
    icon: string
}
type TagListModel = {
    data: Tag[],
    fetch: () => Tag[],
    create: (name: string) => 'success' | 'duplicated' // 联合类型
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    remove: (id: string) => boolean
    save: () => void
};
type RootState = {
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag
}

interface Window {
}