import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ( { children } ) => {
    const [ darkMode, setDarkMode ] = useState( false );

    // student store and get to localStore
    const getStuData = localStorage.getItem( "studentDetail" );
    const storeStuData = getStuData ? JSON.parse( getStuData ) : [];
    const [ dataStore, setDataStore ] = useState( storeStuData );


    // Project store and get to localStore
    const getPrjtData = localStorage.getItem( "projectDetails" );
    const storePrjtData = getPrjtData ? JSON.parse( getPrjtData ) : [];
    const [ projectStore, setProjectStorre ] = useState( storePrjtData );

    // mockDetails store and get to localStore
    const getMocktData = localStorage.getItem( "studentmockDetails" );
    const storeMocktData = getMocktData ? JSON.parse( getMocktData ) : {};
    const [ mockStore, setMockStore ] = useState( storeMocktData );

    //there get to localst in CurrentRole
    const getUserRole = localStorage.getItem( "currentUserRole" );
    const currentUserRole = getUserRole ? JSON.parse( getUserRole ) : {};
    const [ initialRole, setInitialRole ] = useState( currentUserRole );

    //default register and when update the localstore there default register also update
    const [ controlDash, setControlDash ] = useState( () => {
        const adminCreateLocal = localStorage.getItem( "adminRegister" );
        const adminCheckUser = adminCreateLocal ? JSON.parse( adminCreateLocal ) : [
            {
                role: 'admin',
                email: 'admin@gmail.com',
                password: 'admin'
            },
            {
                role: 'trainer',
                email: '',
                password: ''
            },
            {
                role: 'student',
                email: '',
                password: ''
            }
        ];
        return adminCheckUser;

    } );

    //current user

    const toggleTheme = () => {
        setDarkMode( prev => !prev );
    };

    return (
        <ThemeContext.Provider value={ { darkMode, setDarkMode, toggleTheme, dataStore, setDataStore, projectStore, setProjectStorre, mockStore, setMockStore, controlDash, setControlDash, initialRole, setInitialRole } }>
            { children }
        </ThemeContext.Provider>
    );
};
export const useTheme = () => useContext( ThemeContext );