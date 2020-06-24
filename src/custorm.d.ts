type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdDate?: Date;
};
type Tag = {
    id: string,
    name: string
}
type TagListModel = {
    data: Tag[],
    fetch: () => Tag[],
    create: (name: string) => 'success' | 'duplicated' // 联合类型
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    remove: (id: string) => boolean
    save: () => void
};

interface Window {
    tagList: Tag[],
    createTag: (name: string) => void,
    removeTag: (name: string) => boolean,
    UpdateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated',
    findTag: (id: string) => Tag | undefined
}