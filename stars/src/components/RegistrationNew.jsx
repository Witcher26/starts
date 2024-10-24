import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const GET_FORM_DATA = "GET_FORM_DATA";

const actionGenarator = (field, value) => ({
    type: GET_FORM_DATA,
    field,
    value

});

const initialState = {
    form: {
        name: "",
        secondName: "",
        petsCount: 1,
        socket: false,
        shelf: false
    }
}

const formReducer = (state = initialState, {type, field, value}) => {
    switch(type) {
        case GET_FORM_DATA: {
            let _form = state.form;
            _form[field] = value;
            return {
                ...state,
                ["form"]: _form
            }
        }
        default: {
            return state;
        }
    }
};

function RegistrationNew() {
    const [nameValue, setNameValue] = useState("")
    const dispatch = useDispatch();
    const {name, secondName, petsCount, socket, shelf} = useSelector(store => store.registrationNew.form)

    const changeForm = e => {
        if (e.target.name === "name" || e.target.name === "secondName" || e.target.name === "petsCount") {
            console.log("e.target.value :", e.target.value);
            dispatch(actionGenarator(e.target.name, e.target.value))
        } else {
            console.log("e.target.value :", e.target.checked);
            dispatch(actionGenarator(e.target.name, e.target.checked))
        }
    };

    const initValues = () => setNameValue("какое-то имя" + name);

    return (
        <>
            <div style={{display: "flex"}}>
                <form>
                    <label htmlFor="name">Имя</label>
                    <input name="name" id='name' onChange={changeForm} value={nameValue}/>
                </form>
                <form>
                    <label htmlFor="secondName">Фамилия</label>
                    <input name="secondName" id='secondName' onChange={changeForm}/>
                </form>
            </div>
            <div style={{display: "flex"}}>
                <form>
                    <label>Количество питомцев</label>
                    <input type="number" min="1" name="petsCount" id="petsCount" onChange={changeForm}/>
                </form>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "200px"}}>
                <form>
                    <label htmlFor="socket">Требуется дополнительная розетка</label>
                    <input name="socket" id='socket' type="checkbox" onChange={changeForm}/>
                </form>
                <form>
                    <label htmlFor="shelf">Собственный стеллаж</label>
                    <input name="shelf" id='shelf' type="checkbox" onChange={changeForm}/>
                </form>
            </div>
            <div>
                <button onClick={() => console.log("Хранилище для form: ", name)}>Консоль лог</button >
            </div>
            <div>
                <button onClick={() => initValues()}>Инициализация имени</button >
            </div>
        </>
    );
}

export {
    RegistrationNew,
    formReducer
}