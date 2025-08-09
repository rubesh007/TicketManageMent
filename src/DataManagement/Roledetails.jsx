import { useContext, useEffect, useState } from "react";
import { FiEdit2, FiSearch } from "react-icons/fi";
import SideBar from "../components/layout/SideBar";
import Topbar from "../components/layout/Topbar";
import { RoleContext } from "../DataManagement/RoleContext";

const Roledetails = () => {
  const [ darkMode, setDarkMode ] = useState( false );
  const [ sidebarOpen, setSidebarOpen ] = useState( true );
  const [ searchTerm, setSearchTerm ] = useState( "" );
  const { roledata, setRoleData } = useContext( RoleContext );
  const [ showModal, setShowModal ] = useState( false );
  const toggleSidebar = () => setSidebarOpen( !sidebarOpen );
  // default role get to localStore
  const getRoleDash = localStorage.getItem( 'defaulRoleDash' );
  const checkRoleDash = getRoleDash ? JSON.parse( getRoleDash ) : null;

  // the roleDetail store to localStore and roledata
  const [ roleDetail, setRoleDetail ] = useState( [
    {
      role: "Admin",
      status: checkRoleDash === "Admin" ? "Active" : "Inactive",

    },
    {
      role: "Trainer",
      status: checkRoleDash === "Trainer" ? "Active" : "Inactive",

    },
    {
      role: "Student",
      status: checkRoleDash === "Student" ? "Active" : "Inactive",

    }
  ] );

  useEffect( () => {
    const storeData = localStorage.getItem( "roleDetail" );
    if ( storeData ) {
      setRoleData( JSON.parse( storeData ) );
    } else {
      setRoleData( roleDetail );
      localStorage.setItem( "roleDetail", JSON.stringify( roleDetail ) );
    }

  }, [ checkRoleDash ] );


  const handleEdit = ( index ) => {
    if ( checkRoleDash === "Admin" ) {
      if ( index !== 0 ) {
        const updated = [ ...roledata ];
        const currentStatus = updated[ index ].status;
        updated[ index ] = {
          ...roledata[ index ],
          status: currentStatus === "Active" ? "Inactive" : "Active"
        };

        setRoleData( updated );
        localStorage.setItem( "roleDetail", JSON.stringify( updated ) );
      } else {
        alert( `We Can't Change Inactive Because You are Admin, Change Others` );
      }
    } else {
      alert( `Trainer and Student We Can't Do Any Action` );
    }
  };


  // Filtered search results
  const filteredDetails = Array.isArray( roledata )
    ? roledata.filter( ( item ) =>
      item.role.toLowerCase().includes( searchTerm.toLowerCase() ) ||
      item.status.toLowerCase().includes( searchTerm.toLowerCase() )
    )
    : [];

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
                  Role Management
                </h1>
                <p className={ `mt-1 ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                  Display and manage Role
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

                {/* <button
                  onClick={ handleAdd }
                  className={ `ml-3 flex items-center py-2 px-4 rounded-lg transition-colors ${ darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }` }
                >
                  <FiPlus className="mr-2" />
                  Add Role
                </button> */}

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

            <div className={ `rounded-xl shadow-sm overflow-hidden ${ darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200' } border` }>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={ `${ darkMode ? 'bg-gray-700' : 'bg-gray-50' }` }>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>S.NO</span>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        <span className={ darkMode ? 'text-gray-300' : 'text-gray-600' }>Role Name</span>
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
                    { filteredDetails.map( ( item, index ) => (
                      <tr key={ index } className={ `${ darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50' } transition-colors` }>
                        <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ index + 1 }</td>
                        <td className={ `px-6 py-4 whitespace-nowrap text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>{ item.role }</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={ `px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${ item.status === 'Active'
                              ? 'bg-gray-800 text-white'
                              : item.status === 'Inactive'
                                ? 'bg-blue-800 text-blue-300 dark:bg-blue-800/30 dark:text-blue-400'
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
                  <h3 className={ `text-lg font-medium ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                    No Roles found
                  </h3>
                  <p className={ `mt-1 ${ darkMode ? 'text-gray-500' : 'text-gray-600' }` }>
                    Try adjusting your search query
                  </p>
                </div>
              )
              }

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Roledetails;