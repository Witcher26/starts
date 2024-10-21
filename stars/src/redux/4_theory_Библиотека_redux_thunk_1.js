/**
 * Библиотека redux-thunk
 */

/**
 * Концепция middleware в Redux
 * 
 * Библиотека Redux обладает потрясающей возможностью: она позволяет использовать сторонний программный код (middleware, усилители).
 * Такой код может влиять на отправку экшенов, а также управлять тем, когда и как эти экшены достигнут редьюсеров.
 * Применение усилителей позволяет расширять возможности библиотеки, не меняя её исходный код
 */

// Для начала разберёмся с тем, как выглядит усилитель:
// ES6
const sayHiMiddleWare = store => next => action => {
    console.log('Привет!');  // Побочное действие
    return next(action);
};
  
  // ES5
function sayHiMiddleWare(store) {
    return function (next) {
        return function (action) {
            console.log('Привет!');
            return next(action);
        };
    };
}

// Суть усилителей — взять входные данные, добавить что-то или произвести какие-то побочные эффекты, а затем передать эти данные дальше.

/**
 * Подключение middleware в Redux.
 * 
 * Чтобы подключить усилитель в Redux, нужно разобраться с такими понятиями:
 *      1. Генератор хранилища — функция, которая создаёт Redux-хранилище.
 *         Стоит различать генератор хранилища createStore(), экспортируемый из пакета redux,
 *         и генераторы, которые возвращаются из расширителей хранилища.
 *      2. Расширитель хранилища (store enhancer) — функция высшего порядка, которая возвращает новый, расширенный генератор хранилища.
 */

/**
 * createStore()
 * 
 * Если использовать только два, вторым аргументом можно передать расширитель хранилища:
 * const store = createStore(rootReducer, enchancer) 
 * 
 * Если же передавать три аргумента, вторым нужно передать предварительное состояние хранилища, а третьим — расширители.
 * const store = createStore(rootReducer, { theme: 'dark' }, enchancer) 
 */

/**
 * applyMiddleware().
 * 
 * import { createStore, applyMiddleware } from 'redux';
 * applyMiddleware() — она и есть расширитель хранилища -  с её помощью мы сможем подключать усилители к Redux.
 */

import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './services/reducers';

// Наш усилитель
const actionLogger = store => next => action => {
    // Выводим в консоль время события и его содержание
  console.log(`${new Date().getTime()} | Action: ${JSON.stringify(action)}` );
    // Передаём событие «по конвейеру» дальше
  return next(action);
};

// Расширитель хранилища принимает в качестве аргумента усилитель
const enhancer = applyMiddleware(actionLogger);

// Инициализируем хранилище, использовав расширитель
const store = createStore(rootReducer, enhancer);

// applyMiddleware() принимает любое количество аргументов и применяет их последовательно:
// Расширитель хранилища принимает несколько усилителей одновременно
// const enhancer = applyMiddleware(actionLogger, errorLogger);

// Инициализируем хранилище, использовав расширитель
// const store = createStore(rootReducer, enhancer);