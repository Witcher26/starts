import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { createStore } from 'redux';  // deprecated
// import {configureStore} from "reduxjs/toolkit"
import { compose } from 'redux';

import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './redux/reduxStore';
import {
    DefaultLayout
} from "./components";
import {thunk} from "redux-thunk";

// const reduxStore = createStore(rootReducer);
// const reduxStore = configureStore({reducer: rootReducer});

const logger1 = _store => next => action => {
    console.log(`Дата 1: ${new Date().getTime()} | Action ${JSON.stringify(action.type)}`)

    return next(action);
}

const logger2 = _store => next => action => {
    console.log(`Дата 2: ${new Date().getTime()} | Action ${JSON.stringify(action.type)}`)

    return next(action)
}

// const enhancer = applyMiddleware(logger1, logger2)
const enhancer = applyMiddleware(thunk)

const reduxStore = configureStore({
    reducer: rootReducer,
    enhancers: () => [enhancer],
})

// const reduxStore = createStore(rootReducer, enhancer)

function App() {
    return (
        <Provider store={reduxStore}>
            <DefaultLayout/>
        </Provider>
    );
}

export default App