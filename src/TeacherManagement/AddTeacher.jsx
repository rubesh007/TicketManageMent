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

const generateRandomId = () => {
    return Math.floor( 1000 + Math.random() * 9000 );
};

const AddTeacher = () => {
    const [ trainer, setTrainer ] = useState( [] );
    const [ formData, setFormData ] = useState( { trainerid: "", teachername: "", email: "", mobile: "", gender: "", qualification: "", role: "Trainer", image: null, status: "" } );
    const [ previewImage, setPreviewImage ] = useState( null );
    const [ editIndex, setEditIndex ] = useState( null );
    const [ showModal, setShowModal ] = useState( false );
    const [ searchTerm, setSearchTerm ] = useState( "" );
    const [ darkMode, setDarkMode ] = useState( false );
    const [ sidebarOpen, setSidebarOpen ] = useState( true );

    const toggleSidebar = () => setSidebarOpen( !sidebarOpen );

    // 🧠 Load from localStorage on mount
    useEffect( () => {
        const stored = localStorage.getItem( "TeacherDetails" );
        if ( stored ) {
            const storage = JSON.parse( stored );
            setTrainer( storage );
        }
    }, [] );
    console.log( trainer );

    // 📝 handle input changes
    const handleChange = ( e ) => {
        const { name, value } = e.target;
        setFormData( ( prev ) => ( { ...prev, [ name ]: value } ) );
    };

    // 💾 add or update batch
    const handleSubmit = ( e ) => {
        e.preventDefault();
        const updated = [ ...trainer ];

        if ( editIndex !== null ) {
            updated[ editIndex ] = formData;
        } else {
            const newtrainer = { ...formData, trainerid: generateRandomId() };
            updated.push( newtrainer );
        }

        setTrainer( updated );
        localStorage.setItem( "TeacherDetails", JSON.stringify( updated ) );
        setFormData( { trainerid: "", teachername: "", email: "", mobile: "", gender: "", qualification: "", role: "Trainer", image: "", status: "" } );
        setEditIndex( null );
        setShowModal( false );

    };

    // ✏️ edit
    const handleEdit = ( index ) => {
        setFormData( trainer[ index ] );
        setEditIndex( index );
        setShowModal( true );
    };

    // ❌ delete
    const handleDelete = ( index ) => {
        const updated = trainer.filter( ( _, i ) => i !== index );
        setTrainer( updated );
        localStorage.setItem( "TeacherDetails", JSON.stringify( updated ) );
    };

    // ➕ add
    const handleAdd = () => {
        setFormData( { trainerid: "", teachername: "", email: "", mobile: "", gender: "", qualification: "", role: "Trainer", image: "", status: "" } );
        setEditIndex( null );
        setShowModal( true );
    };

    // ❌ close modal
    const handleCloseModal = () => {
        setShowModal( false );
        setEditIndex( null );
        setFormData( { teachername: "", email: "", mobile: "", gender: "", qualification: "", role: "Trainer", image: "", status: "" } );
    };

    // 🔍 Filtered search results
    const filteredTeachers = trainer.filter( ( batch ) =>
        ( batch.teachername?.toLowerCase() || "" ).includes( searchTerm.toLowerCase() ) ||
        ( batch.gender?.toLowerCase() || "" ).includes( searchTerm.toLowerCase() ) ||
        ( batch.qualification?.toLowerCase() || "" ).includes( searchTerm.toLowerCase() ) ||
        ( batch.status?.toLowerCase() || "" ).includes( searchTerm.toLowerCase() )
    );


    // Image upload
    const handleImageChange = ( e ) => {
        const file = e.target.files[ 0 ];
        if ( file ) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData( prev => ( {
                    ...prev,
                    image: reader.result // Store as base64 string
                } ) );
            };
            reader.readAsDataURL( file );
        }
    };

    return (
        <div className={ `flex h-screen ${ darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900 ' }` }>
            <SideBar darkMode={ darkMode } sidebarOpen={ sidebarOpen } setSidebarOpen={ setSidebarOpen } />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar darkMode={ darkMode } toggleSidebar={ toggleSidebar } />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                                <h1 className={ `text-2xl font-bold ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                    Teacher Management
                                </h1>
                                <p className={ `mt-1 ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                                    Create and manage training teacher's
                                </p>
                            </div>

                            <div className="flex items-center mt-4 md:mt-0">
                                <div className={ `relative ${ darkMode ? 'text-gray-400' : 'text-gray-500' }` }>
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search teacher..."
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
                                    Add Teacher
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
                        { trainer.length === 0 ? (
                            <div className={ `rounded-xl p-8 text-center ${ darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200' } border shadow-sm` }>
                                <div className="mx-auto w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-6">
                                    <FiPlus className="w-12 h-12 text-gray-500 dark:text-gray-400" onClick={ handleAdd } />
                                </div>
                                <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                    No Teacher details created yet
                                </h3>
                                <p className={ `mt-2 ${ darkMode ? 'text-gray-500' : 'text-gray-600' }` }>
                                    You haven't added any teachers yet. Get started by adding one!
                                </p>
                                <button
                                    onClick={ handleAdd }
                                    className={ `mt-6 flex items-center py-2 px-6 rounded-lg mx-auto ${ darkMode
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white' }` }
                                >
                                    <FiPlus className="mr-2" />
                                    Create Teacher
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
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Email</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Mobile Number</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Gender</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Qualification</span>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                    <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Image</span>
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
                                            { filteredTeachers.map( ( item, index ) => (
                                                <tr key={ index } className={ `${ darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50' } transition-colors` }>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ index + 1 }</td>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ item.teachername }</td>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ item.email }</td>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ item.mobile }</td>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ item.gender }</td>
                                                    <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ item.qualification }</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        { item.image && (
                                                            <div className="w-10 h-10 cursor-pointer">
                                                                <img
                                                                    src={ item.image }
                                                                    alt="Preview"
                                                                    onClick={ () => setPreviewImage( item.image ) }
                                                                    className="h-10 w-10 rounded-full object-cover border hover:scale-105 transition-transform"
                                                                />
                                                            </div>
                                                        ) }
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={ `px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${ item.status === 'Active'
                                                                ? 'bg-gray-800 text-white'
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

                                { filteredTeachers.length === 0 && (
                                    <div className="py-12 text-center">
                                        <div className="mx-auto w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                                            <FiSearch className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>No Teacher's found</h3>
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
                                            { editIndex !== null ? "Edit Teacher" : "Add New Teacher" }
                                        </h3>
                                        <button
                                            onClick={ handleCloseModal }
                                            className={ `p-1 rounded-full ${ darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500' }` }
                                        >
                                            <FiX className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <form onSubmit={ handleSubmit } className="p-6">
                                        {/* Add this wrapper div with max-height and overflow-y-auto */ }
                                        <div className="max-h-[70vh] overflow-y-auto pr-3 -mr-3">
                                            <div>
                                                <input type="number" hidden />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="teachername" className={ `block mb-2 text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Teacher Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="teachername"
                                                    name="teachername"
                                                    value={ formData.teachername }
                                                    onChange={ handleChange }
                                                    required
                                                    placeholder="Enter Teacher Name"
                                                    className={ `w-full px-4 py-2 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900' }` }
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email" className={ `block mb-2 text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
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
                                                    className={ `w-full px-4 py-2 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900' }` }
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="mobile" className={ `block mb-2 text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Mobile Number
                                                </label>
                                                <input
                                                    type="number"
                                                    id="mobile"
                                                    name="mobile"
                                                    value={ formData.mobile }
                                                    onChange={ handleChange }
                                                    required
                                                    placeholder="Enter Mobile"
                                                    className={ `w-full px-4 py-2 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900' }` }
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="gender" className={ `block mb-2 text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Gender
                                                </label>
                                                <input
                                                    type="text"
                                                    id="gender"
                                                    name="gender"
                                                    value={ formData.gender }
                                                    onChange={ handleChange }
                                                    required
                                                    placeholder="Enter Gender"
                                                    className={ `w-full px-4 py-2 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900' }` }
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="qualification" className={ `block mb-2 text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
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
                                                    className={ `w-full px-4 py-2 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900' }` }
                                                />
                                            </div>
                                            <div className="mb-6">
                                                <label htmlFor="image" className={ `block mb-2 text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    Profile Image
                                                </label>

                                                <div className="flex items-center space-x-4">
                                                    {/* Image Preview */ }
                                                    { formData.image ? (
                                                        <div className="relative">
                                                            <img
                                                                src={ formData.image }
                                                                alt="Preview"
                                                                className="w-24 h-24 rounded-lg object-cover border-2 border-dashed border-gray-300 dark:border-gray-600"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={ () => setFormData( { ...formData, image: null } ) }
                                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                            >
                                                                <FiX className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className={ `border-2 border-dashed rounded-lg w-24 h-24 flex items-center justify-center ${ darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-100' }` }>
                                                            <FiPlus className={ `w-8 h-8 ${ darkMode ? 'text-gray-500' : 'text-gray-400' }` } />
                                                        </div>
                                                    ) }

                                                    {/* Upload Area */ }
                                                    <div className="flex-1">
                                                        <input
                                                            type="file"
                                                            id="image"
                                                            name="image"
                                                            accept="image/*"
                                                            onChange={ handleImageChange }
                                                            className="hidden"
                                                        />

                                                        <label
                                                            htmlFor="image"
                                                            className={ `block w-full cursor-pointer py-3 px-4 rounded-lg border transition-all duration-200 ${ darkMode
                                                                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 text-gray-300'
                                                                : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'
                                                                }` }
                                                        >
                                                            <div className="flex items-center justify-center space-x-2">
                                                                <FiPlus className="w-5 h-5" />
                                                                <span className="text-sm font-medium">
                                                                    { formData.image ? 'Change Image' : 'Upload Image' }
                                                                </span>
                                                            </div>
                                                        </label>

                                                        <p className={ `mt-2 text-xs ${ darkMode ? 'text-gray-500' : 'text-gray-500' }` }>
                                                            JPG, PNG or GIF (Max 2MB)
                                                        </p>
                                                    </div>
                                                </div>
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
                                                </select>
                                            </div>
                                        </div> {/* End of scrollable container */ }

                                        {/* Keep buttons outside the scrollable area */ }
                                        <div className="flex justify-end space-x-3 mt-4">
                                            <button
                                                type="button"
                                                onClick={ handleCloseModal }
                                                className={ `px-4 py-2 rounded-lg ${ darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200' }` }
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className={ `px-4 py-2 rounded-lg ${ darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white' }` }
                                            >
                                                { editIndex !== null ? "Update" : "Save" }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ) }

                        {/* Image preview */ }
                        { previewImage && (
                            < div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/80 dark:bg-black/90">
                                {/* Main Container */ }
                                <div className="relative max-w-[90vw] w-auto max-h-[90vh] h-auto">

                                    {/* Image with Frame */ }
                                    <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-200/50 dark:ring-gray-700/50">
                                        {/* Actual Image */ }
                                        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                                            <img
                                                src={ previewImage }
                                                alt="Preview"
                                                className="max-w-[80vw] max-h-[80vh] object-contain"
                                            />
                                        </div>
                                    </div>

                                    {/* Close Button */ }
                                    <button className="absolute -top-3 -right-3 z-20 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-105 transition-transform duration-200" onClick={ () => setPreviewImage( null ) }>
                                        <svg className="w-5 h-5 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    {/* Footer Instruction */ }
                                    <div className="absolute bottom-4 left-0 right-0 text-center">
                                        <span className="inline-block px-3 py-1 rounded-full bg-black/50 dark:bg-white/20 text-xs text-white dark:text-gray-300">
                                            Click outside to close
                                        </span>
                                    </div>
                                </div>
                            </div>

                        ) }
                    </div>
                </main>
            </div >
        </div >
    );
};

export default AddTeacher;
