import { Reducer, Action } from "redux";
import * as types from '../actions/ActionTypes';

export interface Search{
    keyword: string
}

type DispatchAction = Action & Search;

let initialState: string = '';

let myReducer: Reducer<string, DispatchAction> = (state = initialState, action) => {
    switch (action.type){
        case types.SEARCH:
            return action.keyword;
        default: return state;
    }
}

export default myReducer;