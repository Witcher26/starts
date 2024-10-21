/**
 * Усилитель Redux: библиотека redux-thunk
 * 
 * Взаимодействие с API, это экшен — функция, которая возвращает Promise.
 * У такой функции должна быть возможность отправлять экшены на каждом этапе жизни промиса.
 * Благодаря возможности добавлять усилители в Redux, redux-thunk позволяет использовать функции (и асинхронные тоже) в качестве экшенов.
 */

import thunk from 'redux-thunk';
import rootReducer from './services/reducers';

const store1 = createStore(rootReducer, applyMiddleware(thunk)); 