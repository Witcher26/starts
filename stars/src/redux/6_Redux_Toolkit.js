/**
 * Redux Toolkit
 * 
 * Установка npm install @reduxjs/toolkit 
 */

/**
 * Инициализация хранилища. configureStore()
 */

// Так выглядит инициализация глобального хранилища в Redux:
// import { createStore } from 'redux';
// import { rootReducer } from './reducers'; 

// const store = createStore(rootReducer);

// А так можно сделать то же самое, но с помощью configureStore():
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import todosReducer from './todos/todosReducer'
import { customEnhancer } from './enhancers'

const preloadedState = {
  todos: [],
}
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [customEnhancer],
})

/**
 * Создание экшенов, генераторов экшенов и редьюсеров. createSlice()
 * 
 * Функция createSlice() создаёт экшены, генераторы экшенов и редьюсеры. 
 */

// Простые экшены без данных (payload):
import { createSlice } from '@reduxjs/toolkit'
const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
        increment: (state) => state + 1,
    },
})

/**
 * В коде мы использовали:
 *      name — ключ, который станет префиксом всех экшенов. Например: type: 'counter/increment');
 *      reducers — логика редьюсеров;
 *      initialState — начальное значение стейта этого редьюсера.
 * 
 *      Теперь мы можем получить из counterSlice такие элементы:
 *          counterSlice.actions — возвращает объект с экшенами. В нашем примере — counterSlice.actions.increment();
 *          counterSlice.reducer — возращает редьюсер.
 */

//Теперь немного усложним пример — создадим экшен с данными (payload):
const counterSlice1 = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    incrementByValue: (state, action) => state + action.payload,
  },
})

// createSlice позволяет изменять данные глобального стейта без необходимости заботиться об иммутабильности.
// То есть визуально это может выглядеть как мутация, но «под капотом» библиотека создаёт копию стейта и мутации не происходит

// Функция createSlice создаёт редьюсеры и экшены, которые ничем не отличаются от обычных, созданных без Redux Toolkit.
// Чтобы в этом убедиться, перепишем код из предыдущих уроков с помощью Redux Toolkit:
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { counterSlice } from './slices'

    const dispatch = useDispatch();
    const { actions } = counterSlice();
    useEffect(() => {
        // Отправляем экшен при монтировании компонента
        dispatch(actions.incrementByValue(1));
    }, [])



/**
 * Создание экшена одновременно с его типом. createAction()
 */

/**
 * В Redux сначала объявляется константа с типом экшена, а затем создаётся генератор экшена с использованием этой константы:
        const action = {
            type: 'ACTION_NAME'
        } 
* А в Redux Toolkit с применением createAction() создание экшена и его типа выглядит так: 
        import { createAction } from '@reduxjs/toolkit'

        const increment = createAction('ACTION_NAME') 
 */

/**
 * Создание редьюсеров. createReducer()
 */

// Стандартная форма:

// Редьюсер списка дел
const todoList = (state, action) => {  };

// Редьюсер пользователя приложения
const user = (state, action) => { };

// Редьюсер коллективной работы над списком дел
const collabaration = (state, action) => { };
// Корневой редьюсер
const rootReducer = (state, action) => ({
    todoList: todoList(state.todoList, action),
    user: user(state.user, action),
    collabaration: collabaration(state.collabaration, action),
    counterReducer
})