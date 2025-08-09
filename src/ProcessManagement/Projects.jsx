import { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import SideBar from "../components/layout/SideBar";
import Topbar from "../components/layout/Topbar";
import { useTheme } from "../context/ThemeContext";

// Generate 4-digit random ID
const generateRandomId = () => {
    return Math.floor( 1000 + Math.random() * 9000 );
};

export const Project = () => {
    const [ addProjectBtn, setAddProjectBtn ] = useState( false );
    const [ edit, setEdit ] = useState( null );
    const [ search, setSearch ] = useState( "" );
    const [ sidebarOpen, setSidebarOpen ] = useState( true );
    const [ page, setPage ] = useState( 1 );
    const [ project, setProject ] = useState( {
        id: "",
        date: "",
        name: "",
        batchcode: "",
        projecttitle: "",
        trainer: "",
        status: "",
        email: "",
        review: "",
        projectCompletDate: ""
    } );

    const { darkMode, setDarkMode } = useTheme();
    const [ dataStore, setDataStore ] = useState( [] );

    // Load data from localStorage on component mount
    useEffect( () => {
        const savedData = localStorage.getItem( "studentprojectDetails" );
        if ( savedData ) {
            setDataStore( JSON.parse( savedData ) );
        }
    }, [] );

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

    const handleProjectInput = ( e ) => {
        const { name, value } = e.target;
        setProject( { ...project, [ name ]: value } );
    };

    const handleProjectSubmit = ( e ) => {
        e.preventDefault();
        const { date, name, batchcode, email, projecttitle, trainer, status } = project;

        if ( date && name && batchcode && projecttitle && email && status && trainer ) {
            const projectData = {
                ...project,
                id: edit !== null ? project.id : generateRandomId()
            };

            let updatedData;
            if ( edit !== null ) {
                updatedData = [ ...dataStore ];
                updatedData[ edit ] = projectData;
            } else {
                updatedData = [ ...dataStore, projectData ];
            }

            setDataStore( updatedData );
            localStorage.setItem( "studentprojectDetails", JSON.stringify( updatedData ) );

            setAddProjectBtn( false );
            setEdit( null );
            setProject( {
                id: "",
                date: "",
                name: "",
                batchcode: "",
                projecttitle: "",
                trainer: "",
                status: "",
                email: "",
                review: "",
                projectCompletDate: ""
            } );
        } else {
            alert( "Please fill all required fields" );
        }
    };

    const handleDelete = ( indexDelete ) => {
        const filtered = dataStore.filter( ( _, index ) => index !== indexDelete );
        setDataStore( filtered );
        localStorage.setItem( "studentprojectDetails", JSON.stringify( filtered ) );
    };

    const handleEdit = ( i ) => {
        setProject( dataStore[ i ] );
        setEdit( i );
        setAddProjectBtn( true );
    };

    const filterProject = useMemo( () => {
        if ( !search ) return currentUsers;
        return dataStore.filter( ( item ) =>
            item.name.toLowerCase().includes( search.toLowerCase() ) ||
            item.batchcode.toLowerCase().includes( search.toLowerCase() )
        );
    }, [ currentUsers, search ] );

    const toggleSidebar = () => setSidebarOpen( !sidebarOpen );

    return (
        <div className={ `flex h-screen ${ darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900' }` }>
            <SideBar darkMode={ darkMode } sidebarOpen={ sidebarOpen } setSidebarOpen={ setSidebarOpen } />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar darkMode={ darkMode } toggleSidebar={ toggleSidebar } />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                                <h1 className={ `text-2xl font-bold ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                    Project Management
                                </h1>
                                <p className={ `mt-1 ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                                    Create and Manage Project's
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
                                    onClick={ setAddProjectBtn }
                                    className={ `ml-3 flex items-center py-2 px-4 rounded-lg transition-colors ${ darkMode
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white' }` }
                                >
                                    <FiPlus className="mr-2" />
                                    Add Intership
                                </button>

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
                                        onClick={ () => setAddProjectBtn( true ) }
                                    />
                                </div>
                                <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                    No projects added yet
                                </h3>
                                <p className={ `mt-2 ${ darkMode ? 'text-gray-500' : 'text-gray-600' }` }>
                                    You haven't added any projects yet. Get started by adding one!
                                </p>
                                <button
                                    onClick={ () => setAddProjectBtn( true ) }
                                    className={ `mt-6 flex items-center py-2 px-6 rounded-lg mx-auto ${ darkMode
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }` }
                                >
                                    <FiPlus className="mr-2" />
                                    Add Project Details
                                </button>
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
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Date</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Name</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Batch Code</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Email</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Project Title</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Trainer</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Status</span>
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody
                                            className={ `divide-y divide-gray-200 dark:divide-gray-700 ${ darkMode ? 'bg-gray-800' : 'bg-white'
                                                }` }
                                        >
                                            { filterProject.map( ( item, index ) => (
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
                                                        { item.date }
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
                                                        { item.batchcode }
                                                    </td>
                                                    <td
                                                        className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }` }
                                                    >
                                                        { item.email }
                                                    </td>
                                                    <td
                                                        className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }` }
                                                    >
                                                        { item.projecttitle }
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
                                                        { item.status }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <button
                                                                onClick={ () => handleEdit( start + index ) }
                                                                className={ `p-2 rounded-lg ${ darkMode
                                                                    ? 'text-blue-400 hover:bg-gray-700'
                                                                    : 'text-blue-600 hover:bg-blue-50'
                                                                    }` }
                                                            >
                                                                <FiEdit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={ () => handleDelete( start + index ) }
                                                                className={ `p-2 rounded-lg ${ darkMode
                                                                    ? 'text-red-400 hover:bg-gray-700'
                                                                    : 'text-red-600 hover:bg-red-50'
                                                                    }` }
                                                            >
                                                                <FiTrash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) ) }
                                        </tbody>
                                    </table>
                                </div>

                                { filterProject.length === 0 && (
                                    <div className="py-12 text-center">
                                        <div className="mx-auto w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                                            <FiSearch className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                            No projects found
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


                {/* MODAL */ }
                { addProjectBtn && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className={ `rounded-xl shadow-lg w-full max-w-4xl ${ darkMode ? 'bg-gray-800' : 'bg-white' }` }>
                            <div className="flex justify-between items-center p-4 border-b">
                                <h3 className={ `text-lg font-medium ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                    { edit !== null ? "Edit Project" : "Add New Project" }
                                </h3>
                                <button
                                    onClick={ () => {
                                        setAddProjectBtn( false );
                                        setEdit( null );
                                        setProject( {
                                            id: "",
                                            date: "",
                                            name: "",
                                            batchcode: "",
                                            projecttitle: "",
                                            trainer: "",
                                            status: "",
                                            email: "",
                                            review: "",
                                            projectCompletDate: ""
                                        } );
                                    } }
                                    className={ `p-1 rounded-full ${ darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
                                        }` }
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={ handleProjectSubmit } className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label htmlFor="date" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={ project.date }
                                            onChange={ handleProjectInput }
                                            required
                                            className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }` }
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="name" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={ project.name }
                                            onChange={ handleProjectInput }
                                            required
                                            placeholder="Enter Name"
                                            className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }` }
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="batchcode" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                            Batch Code
                                        </label>
                                        <input
                                            type="text"
                                            id="batchcode"
                                            name="batchcode"
                                            value={ project.batchcode }
                                            onChange={ handleProjectInput }
                                            required
                                            placeholder="Enter Batch Code"
                                            className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }` }
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="email" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={ project.email }
                                            onChange={ handleProjectInput }
                                            required
                                            placeholder="Enter Email"
                                            className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }` }
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="projecttitle" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                            Project Title
                                        </label>
                                        <input
                                            type="text"
                                            id="projecttitle"
                                            name="projecttitle"
                                            value={ project.projecttitle }
                                            onChange={ handleProjectInput }
                                            required
                                            placeholder="Enter Project Title"
                                            className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }` }
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="trainer" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                            Trainer
                                        </label>
                                        <select
                                            id="trainer"
                                            name="trainer"
                                            value={ project.trainer }
                                            onChange={ handleProjectInput }
                                            required
                                            className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }` }
                                        >
                                            <option value="">-- Select Trainer --</option>
                                            <option value="Ramesh">Ramesh</option>
                                            <option value="Karthik">Karthik</option>
                                            <option value="Divya">Divya</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="status" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={ project.status }
                                            onChange={ handleProjectInput }
                                            required
                                            className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }` }
                                        >
                                            <option value="">-- Select Status --</option>
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>

                                    { project.status === "completed" && (
                                        <>
                                            <div className="space-y-1">
                                                <label htmlFor="review" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Project Review
                                                </label>
                                                <textarea
                                                    id="review"
                                                    name="review"
                                                    value={ project.review }
                                                    onChange={ handleProjectInput }
                                                    placeholder="Enter Project Review"
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label htmlFor="projectCompletDate" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Completion Date
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    id="projectCompletDate"
                                                    name="projectCompletDate"
                                                    value={ project.projectCompletDate }
                                                    onChange={ handleProjectInput }
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                />
                                            </div>
                                        </>
                                    ) }
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={ () => {
                                            setAddProjectBtn( false );
                                            setEdit( null );
                                            setProject( {
                                                id: "",
                                                date: "",
                                                name: "",
                                                batchcode: "",
                                                projecttitle: "",
                                                trainer: "",
                                                status: "",
                                                email: "",
                                                review: "",
                                                projectCompletDate: ""
                                            } );
                                        } }
                                        className={ `px-4 py-2 rounded-md ${ darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
                                            }` }
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={ `px-4 py-2 rounded-md ${ darkMode
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }` }
                                    >
                                        { edit !== null ? "Update" : "Save" }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) }
            </div>
        </div>
    );
};