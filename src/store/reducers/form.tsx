import * as types from '../actions/ActionTypes';
import { Reducer, Action } from 'redux';

export interface FormState{
    openForm: boolean
};

let initialState: boolean = false;

let myReducer: Reducer<boolean, Action> = (state = initialState, action) =>{
    switch (action.type){
        case types.OPEN_FORM:
            state = true;
            return state;
        case types.CLOSE_FORM:
            state = false;
            return state;
        case types.TOGGLE_FORM:
            return !state;
        default: return state;
    }
}

export default myReducer;
