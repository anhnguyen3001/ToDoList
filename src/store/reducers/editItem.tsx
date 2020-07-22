import * as types from '../actions/ActionTypes';
import { Task } from './tasks';
import { Action, Reducer } from 'redux';

export interface EditItem{
    editItem: Task
}

interface DispatchAction extends Action{
    task: Task
}

let initialState: Task ={
    id: '',
    name: '',
    status: 0
} 

let myReducer: Reducer<Task, DispatchAction> = (state = initialState, action) => {
    switch (action.type){
        case types.EDIT_ITEM:
            return {...action.task};
        default: return state;
    }
}

export default myReducer;