import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setParticipantFormValue } from './actions-generators';

const Registration = () => {
    const {
        name,
        surname,
        numberOfPets,
        extraSocket,
        ownRack
    } = useSelector(state => state.participantRegistration.form);

    const dispatch = useDispatch();

    const onFormChange = (e) => {
        if (e.target.name === 'extraSocket' || e.target.name === 'ownRack') {
            dispatch(setParticipantFormValue(e.target.name, e.target.checked))
        } else {
            dispatch(setParticipantFormValue(e.target.name, e.target.value))
        }
    }

    return (
        <form>
            <label htmlFor="name">Имя</label>
            <input type="text" onChange={onFormChange} value={name} name="name" id="name" />

            <label htmlFor="surname">Фамилия</label>
            <input type="text" onChange={onFormChange} value={surname} name="surname" id="surname" />

            <label htmlFor="numberOfPets">Количество питомцев</label>
            <input type="number" min="1" onChange={onFormChange} value={numberOfPets} name="numberOfPets" id="numberOfPets"/>

            <label htmlFor="extraSocket">Требуется дополнительная розетка</label>
            <input type="checkbox" onChange={onFormChange} value={extraSocket} name="extraSocket" id="extraSocket"/>

            <label htmlFor="ownRack">Собственный стеллаж</label>
            <input type="checkbox" onChange={onFormChange} value={ownRack} name="ownRack" id="ownRack"/>
            
            <button type="submit">Зарегистрироваться</button>
        </form>
    )
}

export {
    Registration
}