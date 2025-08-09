import { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import StudentSidenav from "./StudentNavigation/StudentSidenav";
import StudentTopnav from "./StudentNavigation/StudentTopnav";

// Generate 4-digit random ID
const generateRandomId = () => {
  return Math.floor( 1000 + Math.random() * 9000 );
};

export const Student_AddTest = () => {
  const [ addTestBtn, setAddTestBtn ] = useState( false );
  const [ edit, setEdit ] = useState( null );
  const [ search, setSearch ] = useState( "" );
  const [ sidebarOpen, setSidebarOpen ] = useState( true );
  const [ page, setPage ] = useState( 1 );
  const [ testDetail, setTestDetail ] = useState( {
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

  const { darkMode, setDarkMode } = useTheme();
  const [ dataStore, setDataStore ] = useState( [] );
  const [ assignments, setAssignments ] = useState( [] );

  // Load data from localStorage on component mount
  useEffect( () => {
    const savedData = localStorage.getItem( "studentTestDetail" );
    const savedAssignments = localStorage.getItem( "AssignCourse" );

    if ( savedData ) {
      setDataStore( JSON.parse( savedData ) );
    }
    if ( savedAssignments ) {
      setAssignments( JSON.parse( savedAssignments ) );
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

  const handleTestInput = ( e ) => {
    const { name, value } = e.target;
    setTestDetail( { ...testDetail, [ name ]: value } );
  };

  const handleSubmit = ( e ) => {
    e.preventDefault();
    const { name, phone, yop, qualification, trainer, course, email } = testDetail;

    if ( name && phone && yop && qualification && trainer && course && email ) {
      const testData = {
        ...testDetail,
        id: edit !== null ? testDetail.id : generateRandomId() // Keep existing ID when editing
      };

      let updatedData;
      if ( edit !== null ) {
        updatedData = [ ...dataStore ];
        updatedData[ edit ] = testData;
      } else {
        updatedData = [ ...dataStore, testData ];
      }

      setDataStore( updatedData );
      localStorage.setItem( "studentTestDetail", JSON.stringify( updatedData ) );

      setAddTestBtn( false );
      setEdit( null );
      setTestDetail( {
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
    } else {
      alert( "Please fill all the fields" );
    }
  };

  const handleDelete = ( indexDelete ) => {
    const filtered = dataStore.filter( ( _, index ) => index !== indexDelete );
    setDataStore( filtered );
    localStorage.setItem( "studentTestDetail", JSON.stringify( filtered ) );
  };

  const handleEdit = ( i ) => {
    setTestDetail( dataStore[ i ] );
    setEdit( i );
    setAddTestBtn( true );
  };

  const filterTestDetail = useMemo( () => {
    if ( !search ) return currentUsers;
    return dataStore.filter( ( item ) =>
      ( item.name || "" ).toLowerCase().includes( search.toLowerCase() )
    );
  }, [ currentUsers, search ] );

  const toggleSidebar = () => setSidebarOpen( !sidebarOpen );

  return (
    <div className={ `flex h-screen ${ darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900' }` }>
      <StudentSidenav darkMode={ darkMode } sidebarOpen={ sidebarOpen } setSidebarOpen={ setSidebarOpen } />

      <div className="flex-1 flex flex-col overflow-hidden">
        <StudentTopnav darkMode={ darkMode } toggleSidebar={ toggleSidebar } />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className={ `text-2xl font-bold ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                  Test Management
                </h1>
                <p className={ `mt-1 ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                  Create and Manage Test
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
                  onClick={ setAddTestBtn }
                  className={ `ml-3 flex items-center py-2 px-4 rounded-lg transition-colors ${ darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white' }` }
                >
                  <FiPlus className="mr-2" />
                  Add Test
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
                    onClick={ () => setAddTestBtn( true ) }
                  />
                </div>
                <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                  No Test added yet
                </h3>
                <p className={ `mt-2 ${ darkMode ? 'text-gray-500' : 'text-gray-600' }` }>
                  You haven't added any Test yet. Get started by adding one!
                </p>
                <button
                  onClick={ () => setAddTestBtn( true ) }
                  className={ `mt-6 flex items-center py-2 px-6 rounded-lg mx-auto ${ darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }` }
                >
                  <FiPlus className="mr-2" />
                  Add Test
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
                      { filterTestDetail.map( ( item, index ) => (
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

                { filterTestDetail.length === 0 && (
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
        { addTestBtn && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={ `rounded-xl shadow-lg w-full max-w-4xl ${ darkMode ? 'bg-gray-800' : 'bg-white' }` }>
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className={ `text-lg font-medium ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                  { edit !== null ? "Edit Student" : "Add New Student" }
                </h3>
                <button
                  onClick={ () => {
                    setAddTestBtn( false );
                    setEdit( null );
                    setTestDetail( {
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
                  } }
                  className={ `p-1 rounded-full ${ darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
                    }` }
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={ handleSubmit } className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={ testDetail.name }
                      onChange={ handleTestInput }
                      required
                      placeholder="Enter Name"
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
                      value={ testDetail.email }
                      onChange={ handleTestInput }
                      required
                      placeholder="Enter Email"
                      className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                        }` }
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={ testDetail.phone }
                      onChange={ handleTestInput }
                      required
                      placeholder="Enter Phone"
                      className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                        }` }
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="yop" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                      Year of Passout
                    </label>
                    <input
                      type="text"
                      id="yop"
                      name="yop"
                      value={ testDetail.yop }
                      onChange={ handleTestInput }
                      required
                      placeholder="Enter Year of Passout"
                      className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                        }` }
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="qualification" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                      Qualification
                    </label>
                    <input
                      type="text"
                      id="qualification"
                      name="qualification"
                      value={ testDetail.qualification }
                      onChange={ handleTestInput }
                      required
                      placeholder="Enter Qualification"
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
                      value={ testDetail.trainer }
                      onChange={ handleTestInput }
                      required
                      className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                        }` }
                    >
                      <option value="">-- Select Trainer --</option>
                      { assignments.map( ( item, index ) => (
                        <option key={ index } value={ item.teachername }>
                          { item.teachername }
                        </option>
                      ) ) }
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="course" className={ `block text-sm font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                      Course
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={ testDetail.course }
                      onChange={ handleTestInput }
                      required
                      className={ `w-full px-3 py-2 rounded-md border ${ darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                        }` }
                    >
                      <option value="">-- Select Batch --</option>
                      { assignments
                        .filter( item => testDetail.trainer === item.teachername )
                        .map( ( item, index ) => (
                          <option key={ index } value={ item.batchname }>
                            { item.batchname }
                          </option>
                        ) ) }
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={ () => {
                      setAddTestBtn( false );
                      setEdit( null );
                      setTestDetail( {
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