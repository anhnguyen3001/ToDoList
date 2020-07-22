import * as types from '../actions/ActionTypes';
import { Reducer, Action } from 'redux';

export interface Task{
    id: string,
    name: string, 
    status: number
};

export interface TaskState{
    tasks: Task[]
};

interface DispatchAction extends Action{
    task: Task
}

let data = localStorage.getItem('tasks');
let initialState: Task[] = data ? JSON.parse(data) : [];

let myReducer: Reducer<Task[], DispatchAction> = (state = initialState, action) =>{
    switch (action.type){
        case types.SAVE_TASK:
            let { task } = action;
            if (task.id){
                let i = findIndex(state, task.id);
                state[i] = {...task};
            } else {
                task.id = generateID();    
                state.push(action.task);
            }

            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];   
        case types.DELETE_TASK:
            let i = findIndex(state, action.task.id);
            state.splice(i, 1);
            
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]; 
        default: return state;
    }
}

let generateID = () => {
    let id : number = Math.floor((Math.random() + 1) * 100);
    let reverseID = id.toString().split('').join('');

    return id + '-' + reverseID + '-' + id + '-' + reverseID;
}

let findIndex = (tasks: Task[], id: string) =>{
    let result : number = -1;
    tasks.forEach( (task, index) => {
        if (task.id === id) {
            result = index;
        }	
    });

    return result;
}

export default myReducer;
