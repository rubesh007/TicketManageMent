import { useState } from "react";
import {
    FiAward,
    FiBriefcase,
    FiCheckSquare,
    FiChevronDown,
    FiChevronLeft,
    FiChevronRight,
    FiChevronUp,
    FiClipboard,
    FiCode,
    FiHome,
    FiSettings
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const StudentSidenav = ( { darkMode, sidebarOpen, setSidebarOpen } ) => {
    const location = useLocation();
    const [ openGroups, setOpenGroups ] = useState( {
        processManagement: true
    } );

    const isActive = ( path ) => location.pathname === path;

    const toggleGroup = ( group ) => {
        setOpenGroups( prev => ( {
            ...prev,
            [ group ]: !prev[ group ]
        } ) );
    };

    const toggleSidebar = () => {
        setSidebarOpen( !sidebarOpen );
        if ( sidebarOpen ) {
            setOpenGroups( {
                processManagement: false
            } );
        }
    };

    const sidebarItems = [
        {
            id: 'dashboard',
            name: 'Dashboard',
            icon: <FiHome className="w-5 h-5" />,
            path: '/student-dashboard'
        },
        {
            id: 'processManagement',
            name: 'Process Management',
            icon: <FiSettings className="w-5 h-5" />,
            subItems: [
                { name: 'Mock Interview', icon: <FiAward className="w-4 h-4" />, path: '/student-studentMock' },
                { name: 'Internship', icon: <FiBriefcase className="w-4 h-4" />, path: '/student-internship' },
                { name: 'Projects', icon: <FiCode className="w-4 h-4" />, path: '/student-project' },
                { name: 'Tasks', icon: <FiClipboard className="w-4 h-4" />, path: '/student-tasks' },
                { name: 'Tests', icon: <FiCheckSquare className="w-4 h-4" />, path: '/student-test' }
            ]
        }
    ];

    return (
        <div className={ `flex flex-col h-screen transition-all duration-300 ease-in-out ${ sidebarOpen ? 'w-64' : 'w-20 flex flex-col justify-center items-center' } ${ darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black' }` }>
            <div className="flex flex-col flex-1 border-r-2 shadow-sm">
                {/* Header */ }
                <div className={ `flex items-center justify-between p-4 border-b ${ darkMode ? 'border-gray-700' : 'border-gray-200' }` }>
                    { sidebarOpen && (
                        <div className="flex items-center space-x-2">
                            <div className={ `p-2 rounded-lg ${ darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white' }` }>
                                <FiCode className="w-6 h-6" />
                            </div>
                            <h1 className={ `text-xl font-bold ${ darkMode ? 'text-white' : 'text-gray-900' }` }>CodeMaster</h1>
                        </div>
                    ) }
                    <button
                        onClick={ toggleSidebar }
                        className={ `p-2 rounded-lg transition-colors ${ darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600' }` }
                    >
                        { sidebarOpen ? <FiChevronLeft className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" /> }
                    </button>
                </div>

                {/* Scrollable content */ }
                <div className="flex-1 overflow-y-auto">
                    <nav className="py-4">
                        <ul className="space-y-1 px-2">
                            { sidebarItems.map( ( item ) => (
                                <li key={ item.id } className="relative">
                                    { item.path ? (
                                        <Link
                                            to={ item.path }
                                            className={ `flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${ isActive( item.path )
                                                ? 'bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-500'
                                                : item.id === 'dashboard'
                                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                                    : `${ darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100' }`
                                                }` }
                                        >
                                            <span className={ `${ sidebarOpen ? 'mr-3' : 'mx-auto' }` }>
                                                { item.icon }
                                            </span>
                                            { sidebarOpen && <span>{ item.name }</span> }
                                        </Link>
                                    ) : (
                                        <>
                                            <button
                                                onClick={ () => toggleGroup( item.id ) }
                                                className={ `flex items-center justify-between w-full py-3 px-4 rounded-lg transition-colors duration-200 ${ openGroups[ item.id ] ? 'font-medium' : '' } ${ darkMode
                                                    ? 'text-gray-300 hover:bg-gray-700'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                    }` }
                                            >
                                                <div className="flex items-center">
                                                    <span className={ `${ sidebarOpen ? 'mr-3' : 'mx-auto' }` }>
                                                        { item.icon }
                                                    </span>
                                                    { sidebarOpen && <span>{ item.name }</span> }
                                                </div>
                                                { sidebarOpen && (
                                                    <span className={ darkMode ? "text-gray-400" : "text-gray-500" }>
                                                        { openGroups[ item.id ] ? (
                                                            <FiChevronUp className="w-4 h-4" />
                                                        ) : (
                                                            <FiChevronDown className="w-4 h-4" />
                                                        ) }
                                                    </span>
                                                ) }
                                            </button>

                                            { openGroups[ item.id ] && sidebarOpen && (
                                                <ul className={ `ml-8 border-l-2 pl-3 ${ darkMode ? 'border-gray-700' : 'border-gray-200' }` }>
                                                    { item.subItems.map( ( subItem ) => (
                                                        <li key={ subItem.name }>
                                                            <Link
                                                                to={ subItem.path }
                                                                className={ `flex items-center py-1.5 px-3 rounded-lg transition-colors duration-200 ${ isActive( subItem.path )
                                                                    ? 'bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-500'
                                                                    : darkMode
                                                                        ? 'text-gray-300 hover:bg-gray-700'
                                                                        : 'text-gray-600 hover:bg-gray-100'
                                                                    }` }
                                                            >
                                                                <span className="mr-2">{ subItem.icon }</span>
                                                                <span>{ subItem.name }</span>
                                                            </Link>
                                                        </li>
                                                    ) ) }
                                                </ul>
                                            ) }
                                        </>
                                    ) }

                                    { !sidebarOpen && !item.path && (
                                        <div className={ `absolute left-full top-1/2 -translate-y-1/2 ml-4 text-xs py-1 px-2 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10 ${ darkMode ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white' }` }>
                                            { item.name }
                                        </div>
                                    ) }
                                </li>
                            ) ) }
                        </ul>
                    </nav>
                </div>

                {/* Footer */ }
                <div className={ `p-4 border-t ${ darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50' }` }>
                    { sidebarOpen ? (
                        <div className={ `text-xs ${ darkMode ? 'text-gray-300' : 'text-gray-600' }` }>
                            <p className="font-medium">© 2023 CodeMaster Institute</p>
                            <p className={ `mt-1 ${ darkMode ? 'text-gray-400' : 'text-gray-500' }` }>All rights reserved</p>
                        </div>
                    ) : (
                        <div className={ `text-center ${ darkMode ? 'text-gray-400' : 'text-gray-500' }` }>©</div>
                    ) }
                </div>
            </div>
        </div>
    );
};

export default StudentSidenav;