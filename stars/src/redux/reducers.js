import { PARTICIPANT_REGISTER_FORM_SET_VALUE } from './actions';

const initialState = {
    form: {
        name: '',
        surname: '',
        // Числовое значение, количество животных
        numberOfPets: null,
        // Булево значение, дополнительная розетка для подключения света / подогрева
        extraSocket: false,
        // Булево значение, наличие собственного стеллажа для террариумов
        ownRack: false,
    }
}

const participantRegistrationReducer = (state = initialState, action) => {
    switch(action.type) {
        case PARTICIPANT_REGISTER_FORM_SET_VALUE: {
            return {
                ...state,
                [action.field]: action.value
            }
        }
        default: {
            return state;
        }
    }
}

export {
    participantRegistrationReducer
}