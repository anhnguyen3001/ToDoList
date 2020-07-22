import tasks, { TaskState } from './tasks';
import openForm, { FormState } from './form';
import editItem, { EditItem } from './editItem';
import keyword, { Search } from './search';
import filter, { FilterState } from './filter';
import sort, { SortState } from './sort';
import { combineReducers } from 'redux';

export type State = TaskState & FormState & EditItem & SortState & Search & FilterState;

export let rootReducer = combineReducers({
    tasks,
    openForm,
    editItem,
    sort,
    filter,
    keyword
});