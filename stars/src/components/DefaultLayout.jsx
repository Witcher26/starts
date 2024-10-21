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

export function useAppContext() {
    return useContext(AppContext);
};

function DefaultLayout() {
    const [_, setData] = useState([]);
    const [savePreliminaryDataFx] = useUnit(eventsSaveFormData);
    const dispatch = useDispatch();

    useEffect(() => {
        Promise.all([action(actionKeys.stars)])
            .then(([response]) => {
                setData(response.data.items);
                savePreliminaryDataFx(response.data.items);
                dispatch({type: GET_GITHUB_DATA_ACTION, payload: response.data.items})
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
                    <Footer
                        keyComponent="global-footer"
                        requiredComponent={true}
                    />
                </AppContext.Provider>
        </ErrorBoundaryHandler>
    );
}

export default DefaultLayout