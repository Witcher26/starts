import React, {useEffect, useContext, useState} from 'react';
import axios from "axios";
import {useUnit} from 'effector-react';

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

    useEffect(() => {
        Promise.all([action(actionKeys.stars)])
            .then(([response]) => {
                setData(response.data.items);
                savePreliminaryDataFx(response.data.items)
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