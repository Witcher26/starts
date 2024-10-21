 import { createStoreHook } from "react-redux";
//  import { createStore } from "redux";
 import { combineReducers } from "redux";
 import {
    GET_FEED,
    GET_FEED_FAILED,
    GET_FEED_SUCCESS
 } from "../redux/thunks.js";
 import {
    participantRegistrationReducer
 } from "../redux/reducers.js";

 const GET_GITHUB_DATA_ACTION = "GET_GITHUB_DATA_ACTION";

 const initialState = {
    feedRequest: false,
    feedFailed: false,
    feed: []
}

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

 const feedReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_FEED: {
        return {
          ...state,
                  // Запрос начал выполняться
          feedRequest: true,
                  // Сбрасываем статус наличия ошибок от предыдущего запроса 
                  // на случай, если он был и завершился с ошибкой
                  feedFailed: false,
        };
      }
      case GET_FEED_SUCCESS: {
        return { 
                  ...state, 
                  // Запрос выполнился успешно, помещаем полученные данные в хранилище
                  feed: action.feed, 
                  // Запрос закончил своё выполнение
                  feedRequest: false 
              };
      }
      case GET_FEED_FAILED: {
        return { 
                  ...state, 
                  // Запрос выполнился с ошибкой, 
                  // выставляем соответсвующие значения в хранилище
                  feedFailed: true, 
                  // Запрос закончил своё выполнение
                  feedRequest: false 
              };
      }
          default: {
              return state
          }
      }
  }
 

 const rootReducer = combineReducers({
    gitHubData,
    someReducer,
    participantRegistration: participantRegistrationReducer,
    feed: feedReducer
 });

//  const reduxStore = createStore(rootReducer);

 export {
    // reduxStore,
    GET_GITHUB_DATA_ACTION,
    rootReducer,
    gitHubData
 }