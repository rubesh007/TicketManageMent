import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { RoleProvider } from "./DataManagement/RoleContext";




const App = () => {
    // const getRoleDash = localStorage.getItem( 'defaulRoleDash' );
    // const checkRoleDash = getRoleDash ? JSON.parse( getRoleDash ) : null;

    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={ {
                    duration: 3000,
                    style: {
                        fontSize: '14px',
                    },
                } }
            />
            <ThemeProvider>

                <RoleProvider>
                   <AppRoutes />
                </RoleProvider>

            </ThemeProvider>

        </>
    );



};



export default App;