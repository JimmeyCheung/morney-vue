import recordStore from './recordStore';
import tagStore from './tagStore';

export default {
    ...recordStore,
    ...tagStore
}