import { Reducer, Action } from "redux";
import * as types from '../actions/ActionTypes';

export interface Filter{
    filterName: string,
    filterStatus: number
}

export interface FilterState{
    filter: Filter
}

type DispatchAction = Action & FilterState;

let initialState: Filter = {
    filterName: '',
    filterStatus: -1
};

let myReducer: Reducer<Filter, DispatchAction> = (state = initialState, action) => {
    switch (action.type){
        case types.FILTER:
            return {...action.filter};
        default: return state;
    }
}

export default myReducer;