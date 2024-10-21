import React, {useEffect, useContext, useState} from 'react';
import { createStore } from 'redux';
import axios from "axios";
import {useUnit} from 'effector-react';
import { useDispatch, Provider } from 'react-redux';

import {
    Header,
    MainMenu,
    AuthProvider,
    ErrorBoundaryHandler
} from './index';

import { GlobalComponent as Footer} from '../storage';

import {
    eventsSaveFormData
} from "../storage";
import './styles.css';

import Message from "../components/messages.json";
import {
    GET_GITHUB_DATA_ACTION,
    rootReducer
} from "../redux/reduxStore.js";

import {
    GET_FEED,
    GET_FEED_FAILED,
    GET_FEED_SUCCESS
} from "../redux/thunks.js";

import {
    Registration
} from "../redux/Registration.jsx";

const reduxStore = createStore(rootReducer);

const actionKeys = {
    stars: "https://api.github.com/search/repositories?q=stars:>50&sort=stars"
};

async function action(key) {
    try {
        return await axios.get(key);
    } catch (error) {
        console.error(error);
    }
};

const errorMessage = "Вызов вне контекста";

const AppContext = React.createContext({
    title: errorMessage,
    name: errorMessage
});

function useAppContext() {
    return useContext(AppContext);
};

function getFeed() {
    // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function(dispatch) {
        // Проставим флаг в хранилище о том, что мы начали выполнять запрос
        // Это нужно, чтоб отрисовать в интерфейсе лоудер или заблокировать 
        // ввод на время выполнения запроса
    dispatch({
      type: GET_FEED
    })
        // Запрашиваем данные у сервера
    Promise.all([action(actionKeys.stars)])
        .then(([res]) => {
        console.log("res.request.status :", res)
      if (res && res.request.status === 200) {
    
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
        dispatch({
          type: GET_FEED_SUCCESS,
          feed: res.data
        })
      } else {
                // Если произошла ошибка, отправляем соотвтествующий экшен
        dispatch({
          type: GET_FEED_FAILED
        })
      }
    }).catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
            dispatch({
                type: GET_FEED_FAILED
            })
        })
  }
} 

function DefaultLayout() {
    const [_, setData] = useState([]);
    const [savePreliminaryDataFx] = useUnit(eventsSaveFormData);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("диспатч 1")
        dispatch(getFeed())
    }, [])

    useEffect(() => {
        Promise.all([action(actionKeys.stars)])
            .then(([response]) => {
                setData(response.data.items);
                savePreliminaryDataFx(response.data.items);
                dispatch({type: GET_GITHUB_DATA_ACTION, payload: response.data.items});
            })
            .catch(console.error)
            .finally(() => null)
    }, [savePreliminaryDataFx]);

    return (
        <ErrorBoundaryHandler>
                <AppContext.Provider value ={{title: Message.title, name: Message.name}}>
                    <Header/>
                    <AuthProvider>
                        {({authContext}) => (
                            <MainMenu authContext={authContext}/>
                        )}
                    </AuthProvider>
                    <Registration/>
                    <Footer
                        keyComponent="global-footer"
                        requiredComponent={true}
                    />
                </AppContext.Provider>
        </ErrorBoundaryHandler>
    );
}

export {
    useAppContext
}

export default DefaultLayout