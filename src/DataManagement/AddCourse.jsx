import { useEffect, useState } from "react";
import {
    FiEdit2,
    FiPlus,
    FiSearch,
    FiTrash2,
    FiX
} from "react-icons/fi";
import SideBar from "../components/layout/SideBar";
import Topbar from "../components/layout/Topbar";

const Addcourse = () => {
    const [ course, setcourse ] = useState( [] );
    const [ formData, setFormData ] = useState( { coursename: "", coursefees: "", status: "" } );
    const [ editIndex, setEditIndex ] = useState( null );
    const [ showModal, setShowModal ] = useState( false );
    const [ searchTerm, setSearchTerm ] = useState( "" );
    const [ darkMode, setDarkMode ] = useState( false );
    const [ sidebarOpen, setSidebarOpen ] = useState( true );

    const toggleSidebar = () => setSidebarOpen( !sidebarOpen );

    // 🧠 Load from localStorage on mount
    useEffect( () => {
        const stored = localStorage.getItem( "CourseDetails" );
        if ( stored ) {
            const storage = JSON.parse( stored );
            setcourse( storage );
        }
    }, [] );

    // 📝 handle input changes
    const handleChange = ( e ) => {
        const { name, value } = e.target;
        setFormData( ( prev ) => ( { ...prev, [ name ]: value } ) );
    };

    // 💾 add or update batch
    const handleSubmit = ( e ) => {
        e.preventDefault();
        const updated = [ ...course ];

        if ( editIndex !== null ) {
            updated[ editIndex ] = formData;
        } else {
            updated.push( formData );
        }

        setcourse( updated );
        localStorage.setItem( "CourseDetails", JSON.stringify( updated ) );
        setFormData( { coursename: "", coursefees: "", status: "" } );
        setEditIndex( null );
        setShowModal( false );
    };

    // ✏️ edit
    const handleEdit = ( index ) => {
        setFormData( course[ index ] );
        setEditIndex( index );
        setShowModal( true );
    };

    // ❌ delete
    const handleDelete = ( index ) => {
        const updated = course.filter( ( _, i ) => i !== index );
        setcourse( updated );
        localStorage.setItem( "CourseDetails", JSON.stringify( updated ) );
    };

    // ➕ add
    const handleAdd = () => {
        setFormData( { coursename: "", coursefees: "", status: "" } );
        setEditIndex( null );
        setShowModal( true );
    };

    // ❌ close modal
    const handleCloseModal = () => {
        setShowModal( false );
        setEditIndex( null );
        setFormData( { coursename: "", coursefees: "", status: "" } );
    };

    // 🔍 Filtered search results
    const filteredCourses = course.filter(
        ( batch ) =>
            batch.coursename.toLowerCase().includes( searchTerm.toLowerCase() ) ||
            batch.coursefees.toLowerCase().includes( searchTerm.toLowerCase() ) ||
            batch.status.toLowerCase().includes( searchTerm.toLowerCase() )
    );

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
                                    Course Management
                                </h1>
                                <p className={ `mt-1 ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                                    Create and manage training courses
                                </p>
                            </div>

                            <div className="flex items-center mt-4 md:mt-0">
                                <div className={ `relative ${ darkMode ? 'text-gray-400' : 'text-gray-500' }` }>
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search courses..."
                                        value={ searchTerm }
                                        onChange={ ( e ) => setSearchTerm( e.target.value ) }
                                        className={ `pl-10 pr-4 py-2 rounded-lg text-sm w-full md:w-64 ${ darkMode
                                            ? 'bg-gray-800 border-gray-700 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                            } border focus:outline-none focus:ring-2 focus:ring-blue-500` }
                                    />
                                </div>

                                <button
                                    onClick={ handleAdd }
                                    className={ `ml-3 flex items-center py-2 px-4 rounded-lg transition-colors ${ darkMode
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white' }` }
                                >
                                    <FiPlus className="mr-2" />
                                    Add Course
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
                        { course.length === 0 ? (
                            <div className={ `rounded-xl p-8 text-center ${ darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200' } border shadow-sm` }>
                                <div className="mx-auto w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-6">
                                    <FiPlus className="w-12 h-12 text-gray-500 dark:text-gray-400" onClick={ handleAdd } />
                                </div>
                                <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                    No courses created yet
                                </h3>
                                <p className={ `mt-2 ${ darkMode ? 'text-gray-500' : 'text-gray-600' }` }>
                                    You haven't added any course yet. Get started by adding one!
                                </p>
                                <button
                                    onClick={ handleAdd }
                                    className={ `mt-6 flex items-center py-2 px-6 rounded-lg mx-auto ${ darkMode
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white' }` }
                                >
                                    <FiPlus className="mr-2" />
                                    Create Course
                                </button>
                            </div>
                        ) : (
                            <div className={ `rounded-xl shadow-sm overflow-hidden ${ darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200' } border` }>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className={ `${ darkMode ? 'bg-gray-700' : 'bg-gray-50' }` }>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>S.NO</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Course Name</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Course Fees</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Status</span>
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className={ `divide-y divide-gray-200 dark:divide-gray-700 ${ darkMode ? 'bg-gray-800' : 'bg-white' }` }>
                                            { filteredCourses.map( ( item, index ) => (
                                                <tr key={ index } className={ `${ darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50' } transition-colors` }>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ index + 1 }</td>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ item.coursename }</td>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ item.coursefees }</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={ `px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${ item.status === 'Active'
                                                                ? 'bg-gray-800 text-white'
                                                                : item.status === 'Completed'
                                                                    ? 'bg-blue-800 text-blue-300 dark:bg-blue-800/30 dark:text-blue-400'
                                                                    : item.status === 'Upcoming'
                                                                        ? 'bg-yellow-800 text-yellow-400 dark:bg-yellow-800/30 dark:text-yellow-500'
                                                                        : 'bg-red-400 text-red-800 dark:bg-red-800/30 dark:text-red-500'
                                                            }` }>
                                                            { item.status }
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <button onClick={ () => handleEdit( index ) } className={ `p-2 rounded-lg ${ darkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-600 hover:bg-blue-50' }` }>
                                                                <FiEdit2 className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={ () => handleDelete( index ) } className={ `p-2 rounded-lg ${ darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50' }` }>
                                                                <FiTrash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) ) }
                                        </tbody>
                                    </table>
                                </div>

                                { filteredCourses.length === 0 && (
                                    <div className="py-12 text-center">
                                        <div className="mx-auto w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                                            <FiSearch className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>No courses found</h3>
                                        <p className={ `mt-1 ${ darkMode ? 'text-gray-500' : 'text-gray-600' }` }>Try adjusting your search query</p>
                                    </div>
                                ) }
                            </div>
                        ) }

                        {/* MODAL */ }
                        { showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                <div className={ `rounded-xl shadow-lg w-full max-w-md ${ darkMode ? 'bg-gray-800' : 'bg-white' }` }>
                                    <div className="flex justify-between items-center p-4 border-b">
                                        <h3 className={ `text-lg font-medium ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                            { editIndex !== null ? "Edit Course" : "Add New Course" }
                                        </h3>
                                        <button
                                            onClick={ handleCloseModal }
                                            className={ `p-1 rounded-full ${ darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500' }` }
                                        >
                                            <FiX className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <form onSubmit={ handleSubmit } className="p-6">
                                        <div className="mb-5">
                                            <label htmlFor="coursename" className={ `block mb-2 text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                Course Name
                                            </label>
                                            <input
                                                type="text"
                                                id="coursename"
                                                name="coursename"
                                                value={ formData.coursename }
                                                onChange={ handleChange }
                                                required
                                                placeholder="Enter Course Name"
                                                className={ `w-full px-4 py-2 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900' }` }
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="coursefees" className={ `block mb-2 text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                Course Fees
                                            </label>
                                            <input
                                                type="text"
                                                id="coursefees"
                                                name="coursefees"
                                                value={ formData.coursefees }
                                                onChange={ handleChange }
                                                required
                                                placeholder="Enter Course Fees"
                                                className={ `w-full px-4 py-2 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900' }` }
                                            />
                                        </div>

                                        <div className="mb-6">
                                            <label htmlFor="status" className={ `block mb-2 text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={ formData.status }
                                                onChange={ handleChange }
                                                required
                                                className={ `w-full px-4 py-2 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900' }` }
                                            >
                                                <option value="">Select Status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Upcoming">Upcoming</option>
                                            </select>
                                        </div>

                                        <div className="flex justify-end space-x-3">
                                            <button type="button" onClick={ handleCloseModal } className={ `px-4 py-2 rounded-lg ${ darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200' }` }>
                                                Cancel
                                            </button>
                                            <button type="submit" className={ `px-4 py-2 rounded-lg ${ darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white' }` }>
                                                { editIndex !== null ? "Update" : "Save" }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ) }
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Addcourse;
