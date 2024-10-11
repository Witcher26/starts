import {
    sessionDataMock
} from "../mockData";

function AuthProvider({children}) {

    return (
        children({
            authContext: sessionDataMock
        })
    );
}

export default AuthProvider