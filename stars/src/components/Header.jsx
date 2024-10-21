import { useAppContext } from "./DefaultLayout";
import { useSelector } from "react-redux";
import { useStore } from "react-redux";
import "./styles.css";

function Header() {
    const {title} = useAppContext();
    // const reduxStore = useSelector(store => store.someReducer); // reduxStore : defaultValue // reduxStore : data from gitHab
    const reduxStore = useSelector(store => store);
    const store = useStore();

    console.log("reduxStore :", reduxStore)

    console.log("store :", store.getState()?.someReducer);

    return ( 
        <div className="App">
            <h1>{title}</h1>
        </div>
    );
}

export default Header