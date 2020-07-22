import { Reducer, Action } from "redux";
import * as types from '../actions/ActionTypes';

export interface Sort {
    sortBy: string,
    sortValue: number       //-1 : Giảm - 1: Tăng
}

export interface SortState{
    sort: Sort
}

type DispatchAction = Action & SortState;

let initialState: Sort = {
    sortBy: 'name',
    sortValue: 1
};

let myReducer: Reducer<Sort, DispatchAction> = (state = initialState, action) => {
    switch (action.type){
        case types.SORT:
            return {...action.sort};
        default: return state;
    }
}

export default myReducer;