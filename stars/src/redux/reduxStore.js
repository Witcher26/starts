 import { createStoreHook } from "react-redux";
//  import { createStore } from "redux";
 import { combineReducers } from "redux";

 const GET_GITHUB_DATA_ACTION = "GET_GITHUB_DATA_ACTION";

 const gitHubData = (state = {}, {type, payload}) => {
    switch(type) {
        case GET_GITHUB_DATA_ACTION: {
            return {
                ...state,
                ["gitHubData"]: payload
            }
        };
        default:
            return state
    }
 }

 const someReducer = (state = "defaultValue", {type}) => {
    switch(type) {
        case GET_GITHUB_DATA_ACTION: {
            return "data from gitHab"
        };
        default: {
            return state
        }
    }
 }

 const rootReducer = combineReducers({
    gitHubData,
    someReducer
 });

//  const reduxStore = createStore(rootReducer);

 export {
    // reduxStore,
    GET_GITHUB_DATA_ACTION,
    rootReducer,
    gitHubData
 }