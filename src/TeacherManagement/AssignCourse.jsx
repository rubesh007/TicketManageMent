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

const AssignCourse = () => {
    const [ trainer, setTrainer ] = useState( [] );
    const [ course, setCourse ] = useState( [] );
    const [ batch, setBatch ] = useState( [] );
    const [ category, setCategory ] = useState( [] );
    const [ showCourseDropdown, setShowCourseDropdown ] = useState( false );
    const [ showBatchDropdown, setshowBatchDropdown ] = useState( false );
    const [ showCategoryDropdown, setshowCategoryDropdown ] = useState( false );
    const [ formData, setFormData ] = useState( { teachername: "", coursename: [], batchname: "", categoryname: "" } );
    const [ editIndex, setEditIndex ] = useState( null );
    const [ showModal, setShowModal ] = useState( false );
    const [ searchTerm, setSearchTerm ] = useState( "" );
    const [ darkMode, setDarkMode ] = useState( false );
    const [ sidebarOpen, setSidebarOpen ] = useState( true );
    const [ assignments, setAssignments ] = useState( [] );


    const toggleSidebar = () => setSidebarOpen( !sidebarOpen );

    // 🧠 Load from localStorage on mount
    useEffect( () => {
        const teacherData = JSON.parse( localStorage.getItem( "TeacherDetails" ) || "[]" );
        const courseData = JSON.parse( localStorage.getItem( "CourseDetails" ) || "[]" );
        const batchData = JSON.parse( localStorage.getItem( "BatchDetails" ) || "[]" );
        const categoryData = JSON.parse( localStorage.getItem( "CategoryDetails" ) || "[]" );
        const existingAssignments = JSON.parse( localStorage.getItem( "AssignCourse" ) || "[]" );
        setTrainer( teacherData );
        setCourse( courseData );
        setBatch( batchData );
        setCategory( categoryData );
        setAssignments( existingAssignments );

    }, [] );

    console.log( "assignments", assignments );

    // 📝 handle input changes
    const
        handleChange = ( e ) => {
            const { name, value } = e.target;
            setFormData( ( prev ) => ( { ...prev, [ name ]: value } ) );
        };

    // 📝 handle Select changes
    const handleCourseToggle = ( coursename ) => {
        setFormData( ( prevForm ) => {
            const isSelected = prevForm.coursename.includes( coursename );
            const updatedCourses = isSelected
                ? prevForm.coursename.filter( ( c ) => c !== coursename )
                : [ ...prevForm.coursename, coursename ];

            return { ...prevForm, coursename: updatedCourses };
        } );
    };


    // 💾 add or update batch
    const handleSubmit = ( e ) => {
        e.preventDefault();
        const updated = [ ...assignments ];

        if ( editIndex !== null ) {
            updated[ editIndex ] = formData;
        } else {
            updated.push( formData );
        }

        setAssignments( updated );
        localStorage.setItem( "AssignCourse", JSON.stringify( updated ) );

        setFormData( { teachername: "", coursename: [], batchname: "", categoryname: "" } );
        setEditIndex( null );
        setShowModal( false );
    };
    // ✏️ edit
    const handleEdit = ( index ) => {
        setFormData( assignments[ index ] );
        setEditIndex( index );
        setShowModal( true );
    };

    // ❌ delete
    const handleDelete = ( index ) => {
        const updated = assignments.filter( ( _, i ) => i !== index );
        setAssignments( updated );
        localStorage.setItem( "AssignCourse", JSON.stringify( updated ) );
    };

    // ➕ add
    const handleAdd = () => {
        setFormData( { teachername: "", coursename: [], batchname: "", categoryname: "" } );
        setEditIndex( null );
        setShowModal( true );
    };

    // ❌ close modal
    const handleCloseModal = () => {
        setShowModal( false );
        setEditIndex( null );
        setFormData( { teachername: "", coursename: [], batchname: "", categoryname: "" } );
    };

    // 🔍 Filtered search results
    const filteredDetails = assignments.filter( ( batch ) =>
    ( batch.teachername?.toLowerCase().includes( searchTerm.toLowerCase() ) ||
        batch.coursename?.join( " , " ).toLowerCase().includes( searchTerm.toLowerCase() ) ||
        batch.batchname?.toLowerCase().includes( searchTerm.toLowerCase() ) ||
        batch.categoryname?.toLowerCase().includes( searchTerm.toLowerCase() )
    ) );


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
                                    Assign Course
                                </h1>
                                <p className={ `mt-1 ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                                    Create and Assign Courses
                                </p>
                            </div>

                            <div className="flex items-center mt-4 md:mt-0">
                                <div className={ `relative ${ darkMode ? 'text-gray-400' : 'text-gray-500' }` }>
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search category..."
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
                                    Assign Course
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
                        { assignments.length === 0 ? (
                            <div className={ `rounded-xl p-8 text-center ${ darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200' } border shadow-sm` }>
                                <div className="mx-auto w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-6">
                                    <FiPlus className="w-12 h-12 text-gray-500 dark:text-gray-400" onClick={ handleAdd } />
                                </div>
                                <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                    No Couses Assigned yet
                                </h3>
                                <p className={ `mt-2 ${ darkMode ? 'text-gray-500' : 'text-gray-600' }` }>
                                    You haven't assigned any course yet. Get started by assigning one!
                                </p>
                                <button
                                    onClick={ handleAdd }
                                    className={ `mt-6 flex items-center py-2 px-6 rounded-lg mx-auto ${ darkMode
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white' }` }
                                >
                                    <FiPlus className="mr-2" />
                                    Assign Course
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
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Teacher Name</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Course</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Batch</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Category</span>
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className={ `divide-y divide-gray-200 dark:divide-gray-700 ${ darkMode ? 'bg-gray-800' : 'bg-white' }` }>
                                            { filteredDetails.map( ( item, index ) => (
                                                <tr key={ index } className={ `${ darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50' } transition-colors` }>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ index + 1 }</td>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ item.teachername }</td>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ item.coursename.join( " , " ) }</td>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ item.batchname }</td>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ item.categoryname }</td>
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

                                { filteredDetails.length === 0 && (
                                    <div className="py-12 text-center">
                                        <div className="mx-auto w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                                            <FiSearch className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>No Matches found</h3>
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
                                            { editIndex !== null ? "Edit Assigned Course" : "Assign New Course" }
                                        </h3>
                                        <button
                                            onClick={ handleCloseModal }
                                            className={ `p-1 rounded-full ${ darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500' }` }
                                        >
                                            <FiX className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <form onSubmit={ handleSubmit } className="p-6">
                                        <div className="max-h-[70vh] overflow-y-auto pr-4 -mr-4">

                                            <div className="mb-6">
                                                <label htmlFor="coursename" className={ `block mb-2 text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Teacher Name
                                                </label>
                                                <select
                                                    id="teachername"a
                                                    name="teachername"
                                                    value={ formData.teachername }
                                                    onChange={ handleChange }
                                                    required
                                                    className={ `w-full px-4 py-2 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900' }` }
                                                >
                                                    <option value="" disabled>Select Teacher</option>
                                                    { trainer.map( ( item, index ) => (
                                                        <option key={ index } value={ item.teachername }>
                                                            { item.teachername }
                                                        </option>
                                                    ) ) }
                                                </select>
                                            </div>

                                            <div className="mb-6 relative">
                                                <label className={ `block mb-2 text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Select Courses
                                                </label>

                                                {/* Custom Select Trigger */ }
                                                <div
                                                    onClick={ () => setShowCourseDropdown( !showCourseDropdown ) }
                                                    className={ `w-full px-4 py-3 rounded-lg border cursor-pointer flex items-center justify-between transition-all duration-200 ${ darkMode
                                                        ? 'bg-gray-800 border-gray-600 hover:border-gray-500 text-gray-200'
                                                        : 'bg-white border-gray-300 hover:border-gray-400 text-gray-800'
                                                        } ${ showCourseDropdown ? ( darkMode ? 'ring-2 ring-blue-500/50' : 'ring-2 ring-blue-400/50' ) : '' }` }
                                                >
                                                    <span className={ `truncate ${ formData.coursename.length === 0 ? ( darkMode ? 'text-gray-400' : 'text-gray-500' ) : '' }` }>
                                                        { formData.coursename.length > 0 ? formData.coursename.join( ", " ) : "Select Courses" }
                                                    </span>
                                                    <svg
                                                        className={ `w-5 h-5 ml-2 transition-transform duration-200 ${ showCourseDropdown ? 'rotate-180' : ''
                                                            } ${ darkMode ? 'text-gray-400' : 'text-gray-500' }` }
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>

                                                {/* Dropdown Menu */ }
                                                { showCourseDropdown && (
                                                    <div
                                                        className={ `absolute z-10 mt-1 w-full rounded-lg shadow-lg overflow-hidden transition-all duration-200 transform origin-top ${ darkMode ? 'bg-gray-800 border border-gray-600 shadow-xl' : 'bg-white border border-gray-200 shadow-md'
                                                            }` }
                                                    >
                                                        <ul className="max-h-60 overflow-auto py-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                                                            { course
                                                                .filter( item => item.status === "Active" )
                                                                .map( ( item, index ) => (
                                                                    <li
                                                                        key={ index }
                                                                        className={ `px-4 py-2.5 transition-colors duration-150 ${ darkMode
                                                                            ? 'hover:bg-gray-700/80 active:bg-gray-700'
                                                                            : 'hover:bg-gray-50 active:bg-gray-100'
                                                                            }` }
                                                                    >
                                                                        <label className="flex items-center space-x-3 cursor-pointer">
                                                                            <div
                                                                                className={ `flex-shrink-0 flex items-center justify-center h-5 w-5 rounded border transition-colors ${ formData.coursename.includes( item.coursename )
                                                                                    ? darkMode
                                                                                        ? 'bg-blue-600 border-blue-600'
                                                                                        : 'bg-blue-500 border-blue-500'
                                                                                    : darkMode
                                                                                        ? 'border-gray-500 hover:border-gray-400'
                                                                                        : 'border-gray-400 hover:border-gray-500'
                                                                                    }` }
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={ formData.coursename.includes( item.coursename ) }
                                                                                    onChange={ () => handleCourseToggle( item.coursename ) }
                                                                                    className="hidden"
                                                                                />
                                                                                { formData.coursename.includes( item.coursename ) && (
                                                                                    <svg
                                                                                        className="h-3.5 w-3.5 text-white"
                                                                                        viewBox="0 0 20 20"
                                                                                        fill="currentColor"
                                                                                    >
                                                                                        <path
                                                                                            fillRule="evenodd"
                                                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                            clipRule="evenodd"
                                                                                        />
                                                                                    </svg>
                                                                                ) }
                                                                            </div>
                                                                            <span className={ `text-sm flex-1 ${ darkMode ? 'text-gray-200' : 'text-gray-800'
                                                                                }` }>
                                                                                { item.coursename }
                                                                            </span>
                                                                        </label>
                                                                    </li>
                                                                ) ) }
                                                        </ul>
                                                    </div>
                                                ) }
                                            </div>

                                            <div className="mb-6 relative">
                                                <label className={ `block mb-2 text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Batch Name
                                                </label>

                                                {/* Custom Select Trigger */ }
                                                <div
                                                    onClick={ () => setshowBatchDropdown( !showBatchDropdown ) }
                                                    className={ `w-full px-4 py-3 rounded-lg border cursor-pointer flex items-center justify-between transition-all duration-200 ${ darkMode
                                                        ? 'bg-gray-800 border-gray-600 hover:border-gray-500 text-gray-200'
                                                        : 'bg-white border-gray-300 hover:border-gray-400 text-gray-800'
                                                        } ${ showBatchDropdown ? ( darkMode ? 'ring-2 ring-blue-500/50' : 'ring-2 ring-blue-400/50' ) : '' }` }
                                                >
                                                    <span className={ `truncate ${ !formData.batchname ? ( darkMode ? 'text-gray-400' : 'text-gray-500' ) : '' }` }>
                                                        { formData.batchname || "Select Batch" }
                                                    </span>
                                                    <svg
                                                        className={ `w-5 h-5 ml-2 transition-transform duration-200 ${ showBatchDropdown ? 'rotate-180' : ''
                                                            } ${ darkMode ? 'text-gray-400' : 'text-gray-500' }` }
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>

                                                {/* Dropdown Menu */ }
                                                { showBatchDropdown && (
                                                    <div
                                                        className={ `absolute z-10 mt-1 w-full rounded-lg shadow-lg overflow-hidden transition-all duration-200 transform origin-top ${ darkMode ? 'bg-gray-800 border border-gray-600 shadow-xl' : 'bg-white border border-gray-200 shadow-md'
                                                            }` }
                                                    >
                                                        <ul className="max-h-60 overflow-auto py-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                                                            { batch
                                                                .filter( item => item.status === "Active" )
                                                                .map( ( item, index ) => (
                                                                    <li
                                                                        key={ index }
                                                                        onClick={ () => {
                                                                            setFormData( prev => ( { ...prev, batchname: item.batchname } ) );
                                                                            setshowBatchDropdown( false );
                                                                        } }
                                                                        className={ `px-4 py-2.5 cursor-pointer transition-colors duration-150 ${ darkMode
                                                                            ? 'hover:bg-gray-700/80 active:bg-gray-700 text-gray-200'
                                                                            : 'hover:bg-gray-50 active:bg-gray-100 text-gray-800'
                                                                            }` }
                                                                    >
                                                                        { item.batchname }
                                                                    </li>
                                                                ) ) }
                                                        </ul>
                                                    </div>
                                                ) }
                                            </div>

                                            <div className="mb-6 relative">
                                                <label className={ `block mb-2 text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Category
                                                </label>

                                                {/* Custom Select Trigger */ }
                                                <div
                                                    onClick={ () => setshowCategoryDropdown( !showCategoryDropdown ) }
                                                    className={ `w-full px-4 py-3 rounded-lg border cursor-pointer flex items-center justify-between transition-all duration-200 ${ darkMode
                                                        ? 'bg-gray-800 border-gray-600 hover:border-gray-500 text-gray-200'
                                                        : 'bg-white border-gray-300 hover:border-gray-400 text-gray-800'
                                                        } ${ showCategoryDropdown ? ( darkMode ? 'ring-2 ring-blue-500/50' : 'ring-2 ring-blue-400/50' ) : '' }` }
                                                >
                                                    <span className={ `truncate ${ !formData.categoryname ? ( darkMode ? 'text-gray-400' : 'text-gray-500' ) : '' }` }>
                                                        { formData.categoryname || "Select Category" }
                                                    </span>
                                                    <svg
                                                        className={ `w-5 h-5 ml-2 transition-transform duration-200 ${ showCategoryDropdown ? 'rotate-180' : ''
                                                            } ${ darkMode ? 'text-gray-400' : 'text-gray-500' }` }
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>

                                                {/* Dropdown Menu */ }
                                                { showCategoryDropdown && (
                                                    <div
                                                        className={ `absolute z-10 mt-1 w-full rounded-lg shadow-lg overflow-hidden transition-all duration-200 transform origin-top ${ darkMode ? 'bg-gray-800 border border-gray-600 shadow-xl' : 'bg-white border border-gray-200 shadow-md'
                                                            }` }
                                                    >
                                                        <ul className="max-h-60 overflow-auto py-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                                                            { category
                                                                .filter( item => item.status === "Active" )
                                                                .map( ( item, index ) => (
                                                                    <li
                                                                        key={ index }
                                                                        onClick={ () => {
                                                                            setFormData( prev => ( { ...prev, categoryname: item.categoryname } ) );
                                                                            setshowCategoryDropdown( false );
                                                                        } }
                                                                        className={ `px-4 py-2.5 cursor-pointer transition-colors duration-150 ${ darkMode
                                                                            ? 'hover:bg-gray-700/80 active:bg-gray-700 text-gray-200'
                                                                            : 'hover:bg-gray-50 active:bg-gray-100 text-gray-800'
                                                                            }` }
                                                                    >
                                                                        { item.categoryname }
                                                                    </li>
                                                                ) ) }
                                                        </ul>
                                                    </div>
                                                ) }
                                            </div>

                                            <div className="flex justify-end space-x-3">
                                                <button type="button" onClick={ handleCloseModal } className={ `px-4 py-2 rounded-lg ${ darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200' }` }>
                                                    Cancel
                                                </button>
                                                <button type="submit" className={ `px-4 py-2 rounded-lg ${ darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white' }` }>
                                                    { editIndex !== null ? "Update" : "Save" }
                                                </button>
                                            </div>
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

export default AssignCourse;
