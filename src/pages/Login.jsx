import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const Login = () => {

  const roledetails = localStorage.getItem( "roleDetail" );
  const roleCheck = roledetails ? JSON.parse( roledetails ) : null;
  const navigate = useNavigate();

  // default role
  const [ controlRoleDash, setControlRoleDash ] = useState( '' );



  const [ login, setLogin ] = useState( {
    username: '',
    password: '',
    role1: roleCheck === null ? "Admin" : roleCheck[ 0 ].role,
    role2: roleCheck === null ? "Trainer" : roleCheck[ 1 ].role,
    role3: roleCheck === null ? "Student" : roleCheck[ 2 ].role
  } );
  const [ user, setuser ] = useState(
    [
      { role: "Admin", userName: "admin@gmail.com", password: "admin" },
    ] );

  useEffect( () => {
    // Student Login
    const studentlogins = JSON.parse( localStorage.getItem( 'studentDetail' ) || "[]" );
    console.log( "studentlogins", studentlogins );

    const studentUsers = studentlogins.map( item => ( {
      id: item.id,
      role: item.role,
      userName: item.email,
      password: item.email,
      name: item.name,
      phone: item.phone,
      yop: item.yop,
      qualification: item.qualification,
      trainer: item.trainer,
      course: item.course
    } ) );

    setuser( ( prevUser ) => [ ...prevUser, ...studentUsers ] );

    // Student Login
    const trainerlogins = JSON.parse( localStorage.getItem( 'TeacherDetails' ) || "[]" );
    console.log( "trainerlogins", trainerlogins );

    const TrainerUSer = trainerlogins.map( item => ( {
      id: item.trainerid,
      userName: item.email,
      password: item.email,
      name: item.teachername,
      phone: item.mobile,
      image: item.image,
      gender: item.gender,
      qualification: item.qualification,
      role: item.role,
    } ) );
    setuser( ( prevUser ) => [ ...prevUser, ...TrainerUSer ] );

  }, [] );

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    setLogin( { ...login, [ name ]: value } );

  };

  const handleCheck = ( e ) => {
    e.preventDefault();

    const matchedUser = user.find(
      ( item ) =>
        item.userName.toLowerCase() === login.username.toLowerCase() &&
        item.password.toLowerCase() === login.password.toLowerCase()
    );
    console.log( "matchedUser", matchedUser );


    if ( matchedUser ) {
      if ( matchedUser.role === "Admin" ) {
        handleAdmin();
      } else if ( matchedUser.role === "Trainer" ) {
        handleTrainer();
      } else if ( matchedUser.role === "Student" ) {
        handleStudent();
      }
    } else {
      toast.error( "Invalid username or password" );
    }
  };


  const handleAdmin = () => {
    const userAdminCheck = user.find( ( item ) => item.userName === login.username && item.password === login.password );
    if ( userAdminCheck ) {
      toast.success( 'Successfully Logined Admin' );
      setTimeout( () => { navigate( "/dashboard" ); }, 1000 );
      //default role store to local store
      const admin = "Admin";
      setControlRoleDash( admin );
      localStorage.setItem( 'defaulRoleDash', JSON.stringify( admin ) );
    } else {
      toast.error( "Invaild Admin username and Password" );
    }
  };
  const handleTrainer = () => {
    const userTrainerCheck = user.find( ( item ) =>
      item.userName.toLowerCase() === login.username.toLowerCase() &&
      item.password.toLowerCase() === login.password.toLowerCase() );

    if ( userTrainerCheck ) {
      toast.success( 'Successfully Logined Trainer' );
      setTimeout( () => { navigate( "/trainer-dashboard" ); }, 1000 );

      //default role store to local store
      const trainer = userTrainerCheck.role;
      setControlRoleDash( trainer );
      localStorage.setItem( 'defaulRoleDash', JSON.stringify( trainer ) );
      localStorage.setItem( 'currentuser', JSON.stringify( userTrainerCheck ) );
    } else {
      toast.error( "Invaild Trainer username and Password" );
    }
  };
  const handleStudent = () => {
    const userStudentCheck = user.find( ( item ) =>
      item.userName.toLowerCase() === login.username.toLowerCase() &&
      item.password.toLowerCase() === login.password.toLowerCase() );

    if ( userStudentCheck ) {
      toast.success( 'Successfully Logined Student' );
      setTimeout( () => { navigate( "/student-dashboard" ); }, 1000 );

      // default role store to local store
      const student = userStudentCheck.role;
      setControlRoleDash( student );
      localStorage.setItem( 'defaulRoleDash', JSON.stringify( user.role ) );
      localStorage.setItem( "currentuser", JSON.stringify( userStudentCheck ) );

    } else {
      toast.error( "Invaild Student username and Password" );
    }
  };

  return (

    <>
   <div 
  style={{
    backgroundImage: "url('/banner/sddefault.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh"
  }}
  className="flex flex-col justify-center py-12 sm:px-6 lg:px-8"
>
  <Toaster
    position="top-center"
    toastOptions={{
      duration: 3000,
      style: { fontSize: '14px' },
    }}
  />
  <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-lg shadow-lg bg-opacity-90">
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Sign in to your account
    </h2>

    <form className="space-y-6 mt-8" onSubmit={handleCheck}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          User Name
        </label>
        <input
          id="username"
          name="username"
          type="email"
          required
          value={login.username}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter your username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={login.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Sign in
      </button>
    </form>

    <div className="mt-6 text-center">
      <button
        onClick={() => { navigate('/register'); }}
        className="w-full py-2 px-4 border rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Register a new account
      </button>
    </div>
  </div>
</div>

    </>
  );
};

