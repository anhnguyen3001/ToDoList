import * as types from './ActionTypes';
import { Task } from '../reducers/tasks';
import { Filter } from '../reducers/filter';

// let dispatch = useDispatch();
// Form
let toggleForm = () =>{
    return {
        type: types.TOGGLE_FORM
    }
}

let openForm = () => {
    return{
        type: types.OPEN_FORM
    }
}

let closeForm = () => {
    return {
        type: types.CLOSE_FORM
    }
}

// Task
let listAll = () => {
    return {
        type: types.LIST_ALL
    }
};

let saveTask = (task : Task) => {
    return {
        type: types.SAVE_TASK,
        task
    }
};

let deleteTask = (task: Task) => {
    return {
        type: types.DELETE_TASK,
        task
    }
};

let editItem = (task?: Task) => {
    return {
        type: types.EDIT_ITEM,
        task: task ? task : {
            id: '',
            name: '',
            status: 0
        }
    }
}

let search = (keyword: string) => {
    return {
        type: types.SEARCH,
        keyword
    }
}

let filter = (filter: Filter) => {
    return {
        type: types.FILTER,
        filter
    }
}

let sort = (sortBy: string, sortValue: number) => {
    return {
        type: types.SORT,
        sort:{
            sortBy,
            sortValue
        }
    }
}

let action = {
    toggleForm,
    openForm,
    closeForm,
    listAll,
    saveTask,
    deleteTask,
    editItem,
    search,
    filter,
    sort
}

export default action;