import { useEffect, useState } from "react";
import { FiBell, FiMail, FiMenu, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const TrainerTopbar = ( { darkMode, toggleSidebar } ) => {
    const navigate = useNavigate();
    const [ isopen, setIsOpen ] = useState( false );
    const [ user, setuser ] = useState( "" );
    useEffect( () => {
        const currentusers = JSON.parse( localStorage.getItem( 'currentuser' ) || [] );
        setuser( currentusers );
    }, [] );
    const [ isZoomed, setIsZoomed ] = useState( false );
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
                                <div
                                    onClick={ ( e ) => {
                                        e.stopPropagation();
                                        setIsZoomed( true );
                                    } }
                                    role="button"
                                    tabIndex={ 0 }
                                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-all"
                                >
                                    <img
                                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg hover:scale-105 transition-transform duration-200"
                                        src={ user.image }
                                        alt={ `${ user.name }'s profile` }
                                    />
                                </div>
                                <div className="text-left hidden md:block">
                                    <div className={ `text-sm font-medium ${ darkMode ? 'text-white' : 'text-gray-900' }` }>{ user.name }</div>
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

                        { isZoomed && (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                                onClick={ () => setIsZoomed( false ) }
                            >
                                <div className="relative max-w-md w-full"> {/* Changed max-w-4xl to max-w-md for medium size */ }
                                    <button
                                        onClick={ ( e ) => {
                                            e.stopPropagation();
                                            setIsZoomed( false );
                                        } }
                                        className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <div className="bg-white dark:bg-gray-800 rounded-full overflow-hidden shadow-2xl aspect-square w-full max-w-md mx-auto"> {/* Added rounded-full and aspect-square */ }
                                        <img
                                            className="w-full h-full rounded object-cover" /* Changed object-contain to object-cover */
                                            src={ user.image }
                                            alt={ `Enlarged view of ${ user.name }'s profile` }
                                        />
                                    </div>

                                    { user.name && (
                                        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center"> {/* Added rounded-lg and centered text */ }
                                            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                                { user.name }
                                            </p>
                                            { user.userName && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    @{ user.userName }
                                                </p>
                                            ) }
                                        </div>
                                    ) }
                                </div>
                            </div>
                        ) }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TrainerTopbar;