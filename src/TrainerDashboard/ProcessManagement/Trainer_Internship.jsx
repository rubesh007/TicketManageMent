import { useEffect, useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import TrainerSideBar from "../TrainerNavigation/TrainerSidebar";
import TrainerTopbar from "../TrainerNavigation/TrainerTopbar";


export const Trainer_Internship = () => {
    const [ search, setSearch ] = useState( "" );
    const [ sidebarOpen, setSidebarOpen ] = useState( true );
    const [ page, setPage ] = useState( 1 );
    const { darkMode, setDarkMode } = useTheme();
    const [ dataStore, setDataStore ] = useState( [] );

    // Load data from localStorage on component mount
    useEffect( () => {
        const savedData = localStorage.getItem( "studentinternshipDetail" );
        if ( savedData ) {
            setDataStore( JSON.parse( savedData ) );
        }
    }, [] );

    console.log("dataStore",dataStore)

    // pagination
    const usersPerPage = 5;
    const start = ( page - 1 ) * usersPerPage;
    const end = start + usersPerPage;
    const currentUsers = dataStore.slice( start, end );
    const totalPages = Math.ceil( dataStore.length / usersPerPage );

    const nextPage = () => {
        if ( page < totalPages ) setPage( page + 1 );
    };

    const prevPage = () => {
        if ( page > 1 ) setPage( page - 1 );
    };

    const filterInternshipDetail = useMemo( () => {
        if ( !search ) return currentUsers;
        return dataStore.filter( ( item ) =>
            ( item.trainer || "" ).toLowerCase().includes( search.toLowerCase() )
        );
    }, [ currentUsers, search ] );

    const toggleSidebar = () => setSidebarOpen( !sidebarOpen );


    return (
        <div className={ `flex h-screen ${ darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900' }` }>
            <TrainerSideBar darkMode={ darkMode } sidebarOpen={ sidebarOpen } setSidebarOpen={ setSidebarOpen } />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TrainerTopbar darkMode={ darkMode } toggleSidebar={ toggleSidebar } />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                                <h1 className={ `text-2xl font-bold ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                    Internship Management
                                </h1>
                                <p className={ `mt-1 ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                                    Display of Student Internship
                                </p>
                            </div>

                            <div className="flex items-center mt-4 md:mt-0">
                                <div className={ `relative ${ darkMode ? 'text-gray-400' : 'text-gray-500' }` }>
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search batches..."
                                        value={ search }
                                        onChange={ ( e ) => setSearch( e.target.value ) }
                                        className={ `pl-10 pr-4 py-2 rounded-lg text-sm w-full md:w-64 ${ darkMode
                                            ? 'bg-gray-800 border-gray-700 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                            } border focus:outline-none focus:ring-2 focus:ring-blue-500` }
                                    />
                                </div>

                                <button
                                    onClick={ () => setDarkMode( !darkMode ) }
                                    className={ `ml-3 p-2 rounded-lg ${ darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300' }` }
                                >
                                    { darkMode ? '☀️' : '🌙' }
                                </button>
                            </div>
                        </div>

                        {/* Table or Empty State */ }
                        { dataStore.length === 0 ? (
                            <div
                                className={ `rounded-xl p-8 text-center ${ darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                    } border shadow-sm` }
                            >
                                <div className="mx-auto w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-6">
                                    <FiPlus
                                        className="w-12 h-12 text-gray-500 dark:text-gray-400"
                                        onClick={ () => setAddMockBtn( true ) }
                                    />
                                </div>
                                <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                    No Internship Available
                                </h3>
                                <p className={ `mt-2 ${ darkMode ? 'text-gray-500' : 'text-gray-600' }` }>
                                    No Students have added any Intership yet.
                                </p>
                            </div>
                        ) : (
                            <div
                                className={ `rounded-xl shadow-sm overflow-hidden ${ darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                    } border` }
                            >
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className={ `${ darkMode ? 'bg-gray-700' : 'bg-gray-50' }` }>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>S.NO</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Name</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Phone</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Date Of Internship</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Batch</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Trainer</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Internship Title</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody
                                            className={ `divide-y divide-gray-200 dark:divide-gray-700 ${ darkMode ? 'bg-gray-800' : 'bg-white'
                                                }` }
                                        >
                                            { filterInternshipDetail.map( ( item, index ) => (
                                                <tr
                                                    key={ index }
                                                    className={ `${ darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50' } transition-colors` }
                                                >
                                                    <td
                                                        className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }` }
                                                    >
                                                        { index + 1 }
                                                    </td>
                                                    <td
                                                        className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }` }
                                                    >
                                                        { item.name }
                                                    </td>
                                                    <td
                                                        className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }` }
                                                    >
                                                        { item.phone }
                                                    </td>
                                                    <td
                                                        className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }` }
                                                    >
                                                        { item.doi }
                                                    </td>
                                                    <td
                                                        className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }` }
                                                    >
                                                        { item.batchcode }
                                                    </td>
                                                    <td
                                                        className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }` }
                                                    >
                                                        { item.trainer }
                                                    </td>
                                                    <td
                                                        className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }` }
                                                    >
                                                        { item.internshiptitle }
                                                    </td>
                                                </tr>
                                            ) ) }
                                        </tbody>
                                    </table>
                                </div>

                                { filterInternshipDetail.length === 0 && (
                                    <div className="py-12 text-center">
                                        <div className="mx-auto w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                                            <FiSearch className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                            No Intership found
                                        </h3>
                                        <p className={ `mt-1 ${ darkMode ? 'text-gray-500' : 'text-gray-600' }` }>
                                            Try adjusting your search query
                                        </p>
                                    </div>
                                ) }

                                <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={ prevPage }
                                        disabled={ page === 1 }
                                        className={ `px-4 py-2 rounded-md ${ darkMode
                                            ? 'text-gray-300 hover:bg-gray-700 disabled:text-gray-500'
                                            : 'text-gray-700 hover:bg-gray-200 disabled:text-gray-400'
                                            }` }
                                    >
                                        Previous
                                    </button>
                                    <span className={ `text-sm ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                                        Page { page } of { totalPages }
                                    </span>
                                    <button
                                        onClick={ nextPage }
                                        disabled={ page === totalPages }
                                        className={ `px-4 py-2 rounded-md ${ darkMode
                                            ? 'text-gray-300 hover:bg-gray-700 disabled:text-gray-500'
                                            : 'text-gray-700 hover:bg-gray-200 disabled:text-gray-400'
                                            }` }
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        ) }
                    </div>
                </main>
            </div>
        </div>
    );
};