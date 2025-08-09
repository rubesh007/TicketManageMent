import { createContext, useState } from "react";

export const LoginContext = createContext();

const LoginDetails = ( { children } ) => {

    const [ loggedid, setLoggedid ] = useState( "" );
    const studentlogin = JSON.parse( localStorage.getItem( 'studentDetail' ) || [] );
    setLoggedid( studentlogin );


    return (
        <LoginProvider.Provider value={ loggedid } >
            { children }
        </LoginProvider.Provider>
    );
};
export default LoginDetails;