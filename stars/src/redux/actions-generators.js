import { PARTICIPANT_REGISTER_FORM_SET_VALUE } from "./actions";


const setParticipantFormValue = (field, value) => ({
    type: PARTICIPANT_REGISTER_FORM_SET_VALUE,
    field,
    value
}) 

export {
    setParticipantFormValue
}