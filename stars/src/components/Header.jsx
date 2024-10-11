import { useAppContext } from "./DefaultLayout";
import "./styles.css";

function Header() {
    const {title} = useAppContext();

    return ( 
        <div className="App">
            <h1>{title}</h1>
        </div>
    );
}

export default Header