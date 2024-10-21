/**
 * Экшены
 * Экшен — объект с обязательным ключом type.
 * 
 * Отправить экшен можно с помощью метода store.dispatch().
 */

// Генератор экшена
const ADD_TODO = "ADD_TODO";

const addToDo = (text, expiresAt) => ({
    type: ADD_TODO,
    text: text,
    expiresAt: expiresAt
})

/**
 * Редьюсеры
 * 
 * Редьюсеры же определяют, как изменится состояние приложения в ответ на экшены, отправленные в хранилище.
 * Редьюсер ведёт себя как чистая функция: принимает предыдущее состояние и возвращает новое.
 * Каждый редьюсер принимает два аргумента: состояние и экшен.
 * 
 * Блок default — в нём мы просто возвращаем актуальное состояние.
 * Это необходимо, потому что на каждый экшен Redux запускает все редьюсеры,
 * и важно не потерять те части состояния, которые не были затронуты этим экшеном. 
 */

/**
 * Работа со множеством редьюсеров
 * 
 * Функция combineReducers() применяется не только для корневого редьюсера, но и для вложенных редьюсеров с иерархичным состоянием
 */

import { combineReducers } from 'redux';

// соответственно state:
const state = {
    todoList: {},
    user: {},
    collaboration: {}
}

// Редьюсер списка дел
const todoList = (state, action) => {  };

// Редьюсер пользователя приложения
const user = (state, action) => {  };

// Редьюсер коллективной работы над списком дел
const collaboration = (state, action) => {  };

// Корневой редьюсер
const rootReducer = (state, action) => ({
    todoList: todoList(state.todoList, action),
    user: user(state.user, action),
    collaboration: collaboration(state.collaboration, action)
})

// Корневой редьюсер
const rootReducer2 = combineReducers({
    todoList,
    user,
    collaboration
})

/**
 * Инициализация хранилища
 * 
 * Хранилище — объект, в котором хранится актуальное состояние приложения.
 * В Redux-приложениях используется одно хранилище на всё приложение.
 * Получить доступ к состоянию можно несколькими способами, например с помощью метода store.getState().
 * Данные из хранилища доступны только для чтения, а чтобы изменить состояние, нужно отправить экшен.
 * 
 * Чтобы инициализировать хранилище, воспользуйтесь функцией createStore(). Она принимает три аргумента:
 *      1. Корневой редьюсер. Это обязательный аргумент.
 *      2. Начальное состояние. Оно необязательно и может быть указанно частично.
 *      3. Дополнения. Они расширяют функциональность хранилища.
 *         Это может быть, к примеру, логирование или сохранение в local storage.
 */

import { createStore } from 'redux';
// вместо  createStore теперь configureStor
import {configureStore} from "@reduxjs/toolkit"
// import { rootReducer } from './reducers'; 

// const store = createStore(rootReducer);

/**
 * Доступ к состоянию хранилища. Компонент Provider
 * 
 * Этот компонент нужен для доступа из приложения к актуальному состоянию хранилища.
 * «Под капотом» Provider использует React.Context.
 * 
 * Но если контекст можно применять на любом уровне иерархии,
 * то компонент Provider рекомендуется использовать только на верхнем уровне приложения.
 * 
 * В качестве пропсов компонент Provider получает объект store, созданный с помощью функции createStore().
 */

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/app/app';

// Корневой редьюсер, который обрабатывает экшены
import { rootReducer } from './services/reducers';

// Инициализируем хранилище с помощью корневого редьюсера
const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Оборачиваем приложение компонентом Provider из пакета react-redux
    <Provider store={store}>
        <App />
  </Provider>
); 