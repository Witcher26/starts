import {createStore, createEvent} from 'effector';
import GlobalComponent from "./GlobalComponent";


const savePreliminaryData = createEvent();

const eventsSaveFormData = [
    savePreliminaryData
];

const $preliminaryStore = createStore({});

$preliminaryStore
    .on(savePreliminaryData, (_, value) => ({
        value
    }));

export {
    eventsSaveFormData,
    $preliminaryStore,
    GlobalComponent
}