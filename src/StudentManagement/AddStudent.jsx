import { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import SideBar from "../components/layout/SideBar";
import Topbar from "../components/layout/Topbar";

const generateRandomId = () => {
    return Math.floor( 1000 + Math.random() * 9000 );
};
const AddStudent = () => {
    const [ students, setStudents ] = useState( [] );
    const [ formData, setFormData ] = useState( {
        id: "",
        name: "",
        phone: "",
        yop: "",
        qualification: "",
        trainer: "",
        course: "",
        email: "",
    } );
    const [ editIndex, setEditIndex ] = useState( null );
    const [ showModal, setShowModal ] = useState( false );
    const [ searchTerm, setSearchTerm ] = useState( "" );
    const [ darkMode, setDarkMode ] = useState( false );
    const [ sidebarOpen, setSidebarOpen ] = useState( true );
    const [ assignments, setAssignments ] = useState( [] );



    const toggleSidebar = () => setSidebarOpen( !sidebarOpen );

    // Load from localStorage on mount
    useEffect( () => {

        const stored = JSON.parse( localStorage.getItem( "studentDetail" ) || "[]" );
        const existingAssignments = JSON.parse( localStorage.getItem( "AssignCourse" ) || "[]" );
        setStudents( stored );
        setAssignments( existingAssignments );

    }, [] );

    // Handle input changes
    const handleChange = ( e ) => {
        const { name, value } = e.target;
        setFormData( ( prev ) => ( { ...prev, [ name ]: value } ) );
    };

    // Add or update student
    const handleSubmit = ( e ) => {
        e.preventDefault();

        const updated = [ ...students ];

        if ( editIndex !== null ) {
            updated[ editIndex ] = formData;

        } else {
            const newStudent = { ...formData, id: generateRandomId() };
            updated.push( newStudent );

        }

        setStudents( updated );
        localStorage.setItem( "studentDetail", JSON.stringify( updated ) );
        setFormData( {
            id: "",
            name: "",
            phone: "",
            yop: "",
            qualification: "",
            trainer: "",
            course: "",
            email: "",
            role: ""
        } );
        setEditIndex( null );
        setShowModal( false );
    };

    // Edit student
    const handleEdit = ( index ) => {
        setFormData( students[ index ] );
        setEditIndex( index );
        setShowModal( true );
    };

    // Delete student
    const handleDelete = ( index ) => {
        const updated = students.filter( ( _, i ) => i !== index );
        setStudents( updated );
        localStorage.setItem( "studentDetail", JSON.stringify( updated ) );
    };

    // Add new student
    const handleAdd = () => {
        setFormData( {
            id: "",
            name: "",
            phone: "",
            yop: "",
            qualification: "",
            trainer: "",
            course: "",
            email: "",
            role: "Student"
        } );
        setEditIndex( null );
        setShowModal( true );
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal( false );
        setEditIndex( null );
        setFormData( {
            id: "",
            name: "",
            phone: "",
            yop: "",
            qualification: "",
            trainer: "",
            course: "",
            email: "",
            role: "Student"
        } );
    };

    // Filtered search results
    const filteredStudents = useMemo( () => {
        if ( !searchTerm ) return students;
        return students.filter( ( student ) =>
            Object.values( student ).some(
                ( value ) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes( searchTerm.toLowerCase() )
            )
        );
    }, [ students, searchTerm ] );

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
                                    Student Management
                                </h1>
                                <p className={ `mt-1 ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                                    Create and manage student records
                                </p>
                            </div>

                            <div className="flex items-center mt-4 md:mt-0">
                                <div className={ `relative ${ darkMode ? 'text-gray-400' : 'text-gray-500' }` }>
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search students..."
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
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }` }
                                >
                                    <FiPlus className="mr-2" />
                                    Add Student
                                </button>

                                <button
                                    onClick={ () => setDarkMode( !darkMode ) }
                                    className={ `ml-3 p-2 rounded-lg ${ darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                                        }` }
                                >
                                    { darkMode ? '☀️' : '🌙' }
                                </button>
                            </div>
                        </div>

                        {/* Table or Empty State */ }
                        { students.length === 0 ? (
                            <div
                                className={ `rounded-xl p-8 text-center ${ darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                    } border shadow-sm` }
                            >
                                <div className="mx-auto w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-6">
                                    <FiPlus
                                        className="w-12 h-12 text-gray-500 dark:text-gray-400"
                                        onClick={ handleAdd }
                                    />
                                </div>
                                <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                    No students added yet
                                </h3>
                                <p className={ `mt-2 ${ darkMode ? 'text-gray-500' : 'text-gray-600' }` }>
                                    You haven't added any students yet. Get started by adding one!
                                </p>
                                <button
                                    onClick={ handleAdd }
                                    className={ `mt-6 flex items-center py-2 px-6 rounded-lg mx-auto ${ darkMode
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }` }
                                >
                                    <FiPlus className="mr-2" />
                                    Add Student
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
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Name</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Email</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Phone</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Batch</span>
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
                                            { filteredStudents.map( ( item, index ) => (
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
                                                        { item.email }
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
                                                        { item.course }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <button
                                                                onClick={ () => handleEdit( index ) }
                                                                className={ `p-2 rounded-lg ${ darkMode
                                                                    ? 'text-blue-400 hover:bg-gray-700'
                                                                    : 'text-blue-600 hover:bg-blue-50'
                                                                    }` }
                                                            >
                                                                <FiEdit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={ () => handleDelete( index ) }
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

                                { filteredStudents.length === 0 && (
                                    <div className="py-12 text-center">
                                        <div className="mx-auto w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                                            <FiSearch className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                            No students found
                                        </h3>
                                        <p className={ `mt-1 ${ darkMode ? 'text-gray-500' : 'text-gray-600' }` }>
                                            Try adjusting your search query
                                        </p>
                                    </div>
                                ) }
                            </div>
                        ) }

                        {/* MODAL */ }
                        { showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                <div className={ `rounded-xl shadow-lg w-full max-w-4xl ${ darkMode ? 'bg-gray-800' : 'bg-white' }` }>
                                    <div className="flex justify-between items-center p-4 border-b">
                                        <h3 className={ `text-lg font-medium ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                            { editIndex !== null ? "Edit Student" : "Add New Student" }
                                        </h3>
                                        <button
                                            onClick={ handleCloseModal }
                                            className={ `p-1 rounded-full ${ darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500' }` }
                                        >
                                            <FiX className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <form onSubmit={ handleSubmit } className="p-6 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Name Field */ }
                                            <div className="space-y-1">
                                                <label htmlFor="name" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={ formData.name }
                                                    onChange={ handleChange }
                                                    required
                                                    placeholder="Enter Name"
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                />
                                            </div>

                                            {/* Email Field */ }
                                            <div className="space-y-1">
                                                <label htmlFor="email" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={ formData.email }
                                                    onChange={ handleChange }
                                                    required
                                                    placeholder="Enter Email"
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                />
                                            </div>

                                            {/* Phone Field */ }
                                            <div className="space-y-1">
                                                <label htmlFor="phone" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={ formData.phone }
                                                    onChange={ handleChange }
                                                    required
                                                    placeholder="Enter Phone"
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                />
                                            </div>

                                            {/* Year of Passing Field */ }
                                            <div className="space-y-1">
                                                <label htmlFor="yop" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Year of Passing
                                                </label>
                                                <input
                                                    type="text"
                                                    id="yop"
                                                    name="yop"
                                                    value={ formData.yop }
                                                    onChange={ handleChange }
                                                    required
                                                    placeholder="Enter Year of Passing"
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                />
                                            </div>

                                            {/* Qualification Field */ }
                                            <div className="space-y-1">
                                                <label htmlFor="qualification" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Qualification
                                                </label>
                                                <input
                                                    type="text"
                                                    id="qualification"
                                                    name="qualification"
                                                    value={ formData.qualification }
                                                    onChange={ handleChange }
                                                    required
                                                    placeholder="Enter Qualification"
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                />
                                            </div>

                                            {/* Trainer Select Field */ }
                                            <div className="space-y-1">
                                                <label htmlFor="trainer" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Trainer
                                                </label>
                                                <select
                                                    id="trainer"
                                                    name="trainer"
                                                    value={ formData.trainer }
                                                    onChange={ ( e ) => { handleChange( e ); } }
                                                    required
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                >
                                                    <option value="" disabled>Select Trainer</option>
                                                    { assignments.map( ( item, index ) => (
                                                        <option key={ index } value={ item.teachername }>
                                                            { item.teachername }
                                                        </option>
                                                    ) ) }
                                                </select>
                                            </div>

                                            {/* Course Select Field */ }
                                            <div className="space-y-1">
                                                <label htmlFor="course" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Batch
                                                </label>
                                                <select
                                                    id="course"
                                                    name="course"
                                                    value={ formData.course }
                                                    onChange={ handleChange }
                                                    required
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                >
                                                    <option value="" disabled>Select Batch</option>
                                                    { assignments
                                                        .filter( item => formData.trainer === item.teachername )
                                                        .map( ( item, index ) => (
                                                            <option key={ index } value={ item.batchname }>
                                                                { item.batchname }
                                                            </option>
                                                        ) ) }
                                                </select>
                                            </div>

                                            {/* Action Buttons */ }
                                            <div className="flex justify-end space-x-3 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={ handleCloseModal }
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

export default AddStudent;