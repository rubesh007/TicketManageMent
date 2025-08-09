import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import TrainerSideBar from "../TrainerNavigation/TrainerSidebar";
import TrainerTopbar from "../TrainerNavigation/TrainerTopbar";




export const Trainer_Attendance = () => {
    // destructure the sutudent details


    // store the Attendance    
    const [ attendanceStore, setAttendanceStore ] = useState( [] );

    // default role get to localStore
    const getRoleDash = localStorage.getItem( 'defaulRoleDash' );
    const controllers = getRoleDash ? JSON.parse( getRoleDash ) : null;

    // form data user fill out form keys
    const [ batch, setBatch ] = useState( [] );
    const [ studentAttendance, setStudentAttendance ] = useState( [] );

    // student Attendence
    const [ attendenList, setAttendenList ] = useState( {
        batch: '',
        trainer: '',
        studentPresent: [],
        studentAbsent: [],
        date: ''

    } );

    // usestate
    const [ editIndex, setEditIndex ] = useState( null );
    const [ showModal, setShowModal ] = useState( false );
    const [ searchTerm, setSearchTerm ] = useState( "" );
    const [ darkMode, setDarkMode ] = useState( false );
    const [ sidebarOpen, setSidebarOpen ] = useState( true );
    const [ assignments, setAssignments ] = useState( [] );



    // toggle sidebar 
    const toggleSidebar = () => setSidebarOpen( !sidebarOpen );

    // Load from localStorage get to batch and student

    useEffect( () => {
        const batchList = localStorage.getItem( 'AssignCourse' );
        const checkBatchList = batchList ? JSON.parse( batchList ) : [];
        setBatch( checkBatchList );
        const studentAttendanceList = localStorage.getItem( 'studentDetail' );
        const checkStudentAttendanceList = studentAttendanceList ? JSON.parse( studentAttendanceList ) : [];
        setStudentAttendance( checkStudentAttendanceList );
    }, [] );



    // Handle input changes
    const handleAttendanceChange = ( e ) => {
        const { name, value } = e.target;
        setAttendenList( { ...attendenList, [ name ]: value } );
    };


    const handleAttendanceSubmit = ( e ) => {
        e.preventDefault();
        const getTrainerBatchName = batch.find( ( item ) => item.teachername === attendenList.trainer && item.batchname === attendenList.batch );

        //get all student 
        const allStudent = studentAttendance.filter( item =>
            item.trainer === attendenList.trainer &&
            item.course === attendenList.batch ).map( ( item ) => item.name );

        // set absent Student
        const absentStudent = allStudent.filter( ( name ) => !attendenList.studentPresent.includes( name ) );
        const todayDate = new Date().toISOString().split( 'T' )[ 0 ];

        if ( attendenList.trainer !== "" && attendenList.batch !== '' ) {
            if ( getTrainerBatchName ) {

                const newAttandances = { ...attendenList, studentAbsent: absentStudent, date: todayDate };
                toast.success( 'Successfully Save' );
                alert( 'Successfully Save' );
                const attendancecheck = [ ...attendanceStore, newAttandances ];
                setAttendanceStore( attendancecheck );
                localStorage.setItem( 'studentAttendance', JSON.stringify( attendancecheck ) );

                setAttendenList( {
                    batch: '',
                    trainer: '',
                    studentPresent: [],
                    studentAbsent: [],
                    date: ''
                } );
            }
        } else {
            alert( 'Fill All Feilds' );
            toast.error( 'Fill All Feilds' );
        }
    };

    const handleCheckBox = ( e, studentName ) => {
        const isChecked = e.target.checked;

        setAttendenList( prev => {
            const updatedPresent = isChecked
                ? [ ...prev.studentPresent, studentName ] : '';

            return {
                ...prev,
                studentPresent: updatedPresent
            };
        } );


    };

    //Attendance Btn
    const AttendanceBtn = () => {
        setShowModal( true );
    };
    // close modalss
    const handleCloseModal = () => {
        setShowModal( false );
        setEditIndex( null );
        setFormData( {
            name: "",
            phone: "",
            yop: "",
            qualification: "",
            trainer: "",
            course: "",
            email: "",
            status: "",
            role: "Student"
        } );
    };

    //to lowercase
    const toLower = studentAttendance.filter(
        item =>
            item.trainer?.toLowerCase() === attendenList.trainer.toLowerCase() &&
            item.batch?.toLowerCase() === attendenList.batch.toLowerCase()
    );

    // Filtered search results

    const StudentSearch = studentAttendance.filter( ( item ) =>
        item.trainer === attendenList.trainer &&
        item.course === attendenList.batch
    );

    // filter the student using search
    const filteredStudents = useMemo( () => {
        if ( !searchTerm ) return StudentSearch;
        return StudentSearch.filter( ( item ) => {
            return item.name.toLowerCase().includes( searchTerm.toLowerCase() );
        } );
    }, [ StudentSearch, searchTerm ] );




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
                                    Student Attendance
                                </h1>
                                <p className={ `mt-1 ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                                    Create and manage student attendance records
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

                                {/* darkmode */ }
                                <button
                                    onClick={ () => setDarkMode( !darkMode ) }
                                    className={ `ml-3 p-2 rounded-lg ${ darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                                        }` }
                                >
                                    { darkMode ? '☀️' : '🌙' }
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <div className={ `rounded-xl shadow-sm overflow-hidden ${ darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200' } border` }>
                                <div className="flex justify-between items-center p-4 border-b">
                                    <h3 className={ `text-lg font-medium ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                        Attendance
                                    </h3>
                                </div>

                                <form onSubmit={ handleAttendanceSubmit } className="p-6 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        {/* trainer feilds */ }
                                        <div className="space-y-1">
                                            <label htmlFor="name" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                Trainer
                                            </label>

                                            <select
                                                name='trainer'
                                                id='trainer'
                                                value={ attendenList.trainer }
                                                onChange={ handleAttendanceChange }
                                                className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                    ? 'bg-gray-700 border-gray-600 text-white'
                                                    : 'bg-white border-gray-300 text-gray-900'
                                                    }` }>
                                                <option value="" disabled>Select Trainer</option>
                                                {
                                                    batch.map( ( item, index ) => (
                                                        <option key={ index } className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                            ? 'bg-gray-700 border-gray-600 text-white'
                                                            : 'bg-white border-gray-300 text-gray-900'
                                                            }` } value={ item.teachername }>{ item.teachername }</option>
                                                    ) )
                                                }
                                            </select>
                                        </div>


                                        {/* Batch Field */ }
                                        <div className="space-y-1">
                                            <label htmlFor="name" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                Batch
                                            </label>

                                            <select
                                                name='batch'
                                                id='batch'
                                                value={ attendenList.batch }
                                                onChange={ handleAttendanceChange }
                                                className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                    ? 'bg-gray-700 border-gray-600 text-white'
                                                    : 'bg-white border-gray-300 text-gray-900'
                                                    }` }>
                                                <option value="" disabled>Select Batch</option>
                                                {
                                                    batch.filter( item => ( attendenList.trainer === item.teachername ) )
                                                        .map( ( item, index ) => (
                                                            <option key={ index } className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                                }` } value={ item.batchname }>{ item.batchname }</option>
                                                        ) )
                                                }
                                            </select>
                                        </div>

                                        {/* checkBok */ }
                                        <div className="space-y-1">
                                            <label className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                Attendance (Present Students)
                                            </label>

                                            { filteredStudents.length !== 0 ?
                                                <div className="space-y-2 max-h-48 overflow-y-auto border p-2 rounded-md">
                                                    {
                                                        filteredStudents
                                                            .map( ( item, index ) => (
                                                                <div key={ index } className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={ `student-${ index }` }
                                                                        value={ item.name }
                                                                        checked={ attendenList.studentPresent.includes( item.name ) }
                                                                        className="mr-5"
                                                                        placeholder="Student Attendance"
                                                                        onChange={ ( e ) => { handleCheckBox( e, item.name ); } }
                                                                    />
                                                                    <label htmlFor={ `student-${ index }` } className={ darkMode ? 'text-white' : 'text-gray-800' }>
                                                                        { item.name }
                                                                    </label>
                                                                </div>
                                                            ) )
                                                    }
                                                </div>

                                                : <div className="space-y-2 max-h-48 overflow-y-auto border p-2 rounded-md">

                                                    <div className="flex items-center">
                                                        <input
                                                            type="text"
                                                            id={ `noStudentFound` }
                                                            className="mr-5"
                                                        />
                                                        <label htmlFor={ `noStudentFound` } className={ darkMode ? 'text-red-500' : 'text-red-500' }>
                                                            Student Not Found
                                                        </label>
                                                    </div>
                                                </div> }

                                        </div>


                                    </div>

                                    {/* submit Button */ }
                                    <div className="flex justify-center space-x-3 pt-4">
                                        <button
                                            type="submit"
                                            className={ `px-4 py-2 rounded-md ${ darkMode
                                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                }` }
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};




