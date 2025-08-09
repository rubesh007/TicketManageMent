import { useEffect, useState } from "react";
import { FiBell, FiMail, FiMenu, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const StudentTopnav = ( { darkMode, toggleSidebar } ) => {
    const navigate = useNavigate();
    const [ isopen, setIsOpen ] = useState( false );
    const [ user, setUser ] = useState( "" );
    useEffect( () => {
        const currentusers = JSON.parse( localStorage.getItem( 'currentuser' ) || [] );
        setUser( currentusers );
    }, [] );

    return (
        <div className={ `sticky top-0 z-10 py-4 px-6 flex items-center justify-between shadow-sm ${ darkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200' }` }>
            <div className="flex items-center">
                <button
                    onClick={ toggleSidebar }
                    className={ `mr-4 p-2 rounded-lg ${ darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100' }` }
                >
                    <FiMenu className="w-5 h-5" />
                </button>
                <div className={ `relative ${ darkMode ? 'text-gray-300' : 'text-gray-600' }` }>
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className={ `py-2 pl-10 pr-4 rounded-lg text-sm w-64 ${ darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200' } border focus:outline-none focus:ring-2 focus:ring-blue-500` }
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">

                <div className="flex items-center space-x-4">
                    <button className={ `p-2 rounded-full ${ darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100' }` }>
                        <FiBell className="w-5 h-5" />
                    </button>
                    <button className={ `p-2 rounded-full ${ darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100' }` }>
                        <FiMail className="w-5 h-5" />
                    </button>
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 focus:outline-none"
                            onClick={ () => setIsOpen( !isopen ) }
                        >
                            <div className="flex items-center space-x-2 relative group">
                                <div className={ `w-10 h-10 rounded-full flex items-center justify-center ${ darkMode ? 'bg-blue-600' : 'bg-blue-500' }` }>
                                    <span className="text-white font-medium">{ user.id }</span>
                                </div>
                                <div className="text-left hidden md:block">
                                    <div className={ `text-sm font-medium ${ darkMode ? 'text-white' : 'text-gray-900' }` }>{ user.role }</div>
                                    <p className={ `text-xs ${ darkMode ? 'text-gray-400' : 'text-gray-500' }` }>
                                        { user.userName }
                                    </p>
                                </div>
                            </div>
                        </button>

                        {/* Dropdown menu */ }
                        { isopen && (
                            <div
                                className={ `absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 ${ darkMode ? 'bg-gray-800' : 'bg-white' } border ${ darkMode ? 'border-gray-700' : 'border-gray-200' }` }
                                onClick={ ( e ) => e.stopPropagation() }
                            >
                                <button
                                    className={ `w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${ darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100' }` }
                                    onClick={ () => { setTimeout( () => { navigate( '/' ); }, 1000 ); } }
                                >

                                    <span>Logout</span>
                                </button>
                            </div>
                        ) }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentTopnav;