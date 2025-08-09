import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import SideBar from "../components/layout/SideBar";
import Topbar from "../components/layout/Topbar";


const Enrollment = () => {
    const [ enrollments, setEnrollments ] = useState( [] );
    const [ formData, setFormData ] = useState( {
        id: "",
        studentname: "",
        course: "",
        coursefees: "",
        feespaid: "",
        feespending: ""
    } );
    const [ editIndex, setEditIndex ] = useState( null );
    const [ showModal, setShowModal ] = useState( false );
    const [ searchTerm, setSearchTerm ] = useState( "" );
    const [ darkMode, setDarkMode ] = useState( false );
    const [ sidebarOpen, setSidebarOpen ] = useState( true );
    const [ studentname, setStudentname ] = useState( [] );
    const [ coursefeesList, setCoursefeesList ] = useState( [] );

    const toggleSidebar = () => setSidebarOpen( !sidebarOpen );

    // ID generation
    const GenerateID = () => {
        const stored = JSON.parse( localStorage.getItem( "Enrollments" ) || "[]" );
        let newId;

        do {
            newId = Math.floor( 1000 + Math.random() * 9000 ); // Generates a 4-digit number
        } while ( stored.some( item => item.id === newId ) ); // Check if ID already exists

        return newId;
    };

    // Load from localStorage on mount
    useEffect( () => {
        const stored = JSON.parse( localStorage.getItem( "Enrollments" ) || "[]" );
        const Name = JSON.parse( localStorage.getItem( 'studentDetail' ) || '[]' );
        const studentcoursefees = JSON.parse( localStorage.getItem( 'CourseDetails' ) || '[]' );

        setEnrollments( stored );
        setStudentname( Name );
        setCoursefeesList( studentcoursefees );
    }, [] );

    // Handle input changes
    const handleChange = ( e ) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [ name ]: value };

        if ( name === "studentname" ) {
            const student = studentname.find( item => item.name === value );
            const course = student?.course || "";
            updatedData.course = course;

            const courseFee = coursefeesList.find(
                item => item.coursename.trim().toLowerCase() === course.trim().toLowerCase()
            );

            updatedData.coursefees = courseFee?.coursefees || "";
            updatedData.feespaid = ""; // Reset fees paid when student changes
            updatedData.feespending = ""; // Clear pending when student changes
        }

        if ( name === "feespaid" ) {
            const coursefees = parseFloat( updatedData.coursefees ) || 0;
            const feespaid = parseFloat( value ) || 0;

            if ( feespaid > coursefees ) {
                toast.error( "Fees paid cannot exceed course fees!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                } );
                return;
            }

            // Only calculate pending when feespaid has a value
            updatedData.feespending = value ? ( coursefees - feespaid ).toString() : "";
        }

        setFormData( updatedData );
    };
    // Add or update enrollment
    const handleSubmit = ( e ) => {
        e.preventDefault();
        const updated = [ ...enrollments ];

        if ( editIndex !== null ) {
            updated[ editIndex ] = formData;
        } else {
            const newEntry = { ...formData, id: GenerateID() };
            updated.push( newEntry );
        }

        setEnrollments( updated );
        localStorage.setItem( "Enrollments", JSON.stringify( updated ) );
        setFormData( {
            id: "",
            studentname: "",
            course: "",
            coursefees: "",
            feespaid: "",
            feespending: ""
        } );
        setEditIndex( null );
        setShowModal( false );
    };

    // Edit enrollment
    const handleEdit = ( index ) => {
        setFormData( enrollments[ index ] );
        setEditIndex( index );
        setShowModal( true );
    };

    // Delete enrollment
    const handleDelete = ( index ) => {
        const updated = enrollments.filter( ( _, i ) => i !== index );
        setEnrollments( updated );
        localStorage.setItem( "Enrollments", JSON.stringify( updated ) );
    };

    // Add new enrollment
    const handleAdd = () => {
        setFormData( {
            id: "",
            studentname: "",
            course: "",
            coursefees: "",
            feespaid: "",
            feespending: ""
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
            studentname: "",
            course: "",
            coursefees: "",
            feespaid: "",
            feespending: ""
        } );
    };

    // Filtered search results
    const filteredEnrollments = useMemo( () => {
        if ( !searchTerm ) return enrollments;
        return enrollments.filter( ( enrollment ) =>
            Object.values( enrollments ).some(
                ( value ) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes( searchTerm.toLowerCase() )
            ) );
    }, [ enrollments, searchTerm ] );

    return (
        <div className={ `flex h-screen ${ darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900' }` }>
            <ToastContainer
                position="top-right"
                autoClose={ 3000 }
                hideProgressBar={ false }
                newestOnTop={ false }
                closeOnClick
                rtl={ false }
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={ darkMode ? "dark" : "light" }
            />
            <SideBar darkMode={ darkMode } sidebarOpen={ sidebarOpen } setSidebarOpen={ setSidebarOpen } />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar darkMode={ darkMode } toggleSidebar={ toggleSidebar } />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                                <h1 className={ `text-2xl font-bold ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                    Enrollment Management
                                </h1>
                                <p className={ `mt-1 ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                                    Create and manage Enrollments
                                </p>
                            </div>

                            <div className="flex items-center mt-4 md:mt-0">
                                <div className={ `relative ${ darkMode ? 'text-gray-400' : 'text-gray-500' }` }>
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search Enrollments..."
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
                                    Add Enrollment
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
                        { enrollments.length === 0 ? (
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
                                    No enrollments added yet
                                </h3>
                                <p className={ `mt-2 ${ darkMode ? 'text-gray-500' : 'text-gray-600' }` }>
                                    You haven't added any enrollments yet. Get started by adding one!
                                </p>
                                <button
                                    onClick={ handleAdd }
                                    className={ `mt-6 flex items-center py-2 px-6 rounded-lg mx-auto ${ darkMode
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }` }
                                >
                                    <FiPlus className="mr-2" />
                                    Add Enrollment
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
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Student Name</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Course</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Course Fees</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Fees Paid</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Fees Pending</span>
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
                                            { filteredEnrollments.map( ( item, index ) => (
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
                                                        { item.studentname }
                                                    </td>
                                                    <td
                                                        className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }` }
                                                    >
                                                        { item.course }
                                                    </td>
                                                    <td
                                                        className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }` }
                                                    >
                                                        { item.coursefees }
                                                    </td>
                                                    <td
                                                        className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }` }
                                                    >
                                                        { item.feespaid }
                                                    </td>
                                                    <td
                                                        className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }` }
                                                    >
                                                        { item.feespending }
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

                                { filteredEnrollments.length === 0 && (
                                    <div className="py-12 text-center">
                                        <div className="mx-auto w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                                            <FiSearch className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                            No enrollments found
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
                                            { editIndex !== null ? "Edit Enrollment" : "Add New Enrollment" }
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
                                            {/* Student Name Field */ }
                                            <div className="space-y-1">
                                                <label htmlFor="studentname" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Student Name
                                                </label>
                                                <select
                                                    id="studentname"
                                                    name="studentname"
                                                    value={ formData.studentname }
                                                    onChange={ handleChange }
                                                    required
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                >
                                                    <option value="" disabled>Select Student</option>
                                                    { studentname.map( ( item, index ) => (
                                                        <option key={ index } value={ item.name }>
                                                            { item.name }
                                                        </option>
                                                    ) ) }
                                                </select>
                                            </div>

                                            {/* Course Field */ }
                                            <div className="space-y-1">
                                                <label htmlFor="course" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Course
                                                </label>
                                                <input
                                                    type="text"
                                                    id="course"
                                                    name="course"
                                                    value={ formData.course }
                                                    readOnly
                                                    required
                                                    placeholder="Course"
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                />
                                            </div>

                                            {/* Course Fees Field */ }
                                            <div className="space-y-1">
                                                <label htmlFor="coursefees" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Course Fees
                                                </label>
                                                <input
                                                    type="number"
                                                    id="coursefees"
                                                    name="coursefees"
                                                    value={ formData.coursefees }
                                                    readOnly
                                                    required
                                                    placeholder="Course Fees"
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                />
                                            </div>

                                            {/* Fees Paid Field */ }
                                            <div className="space-y-1">
                                                <label htmlFor="feespaid" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Fees Paid
                                                </label>
                                                <input
                                                    type="number"
                                                    id="feespaid"
                                                    name="feespaid"
                                                    value={ formData.feespaid }
                                                    onChange={ handleChange }
                                                    required
                                                    placeholder="Fees Paid"
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                />
                                            </div>

                                            {/* Fees Pending Field */ }
                                            <div className="space-y-1">
                                                <label htmlFor="feespending" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Fees Pending
                                                </label>
                                                <input
                                                    type="number"
                                                    id="feespending"
                                                    name="feespending"
                                                    value={ formData.feespending }
                                                    readOnly
                                                    required
                                                    placeholder="Fees Pending"
                                                    className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                        }` }
                                                />
                                            </div>

                                            {/* Action Buttons */ }
                                            <div className="flex justify-end space-x-3 pt-4 col-span-2">
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

export default Enrollment;