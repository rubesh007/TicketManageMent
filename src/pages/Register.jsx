import { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export const Register = () => {
    const navigate = useNavigate();
    const { controlDash, setControlDash, initialRole, setInitialRole } = useTheme();

    // Main register form state
    const [ register, setRegister ] = useState( {
        role: '',
        email: '',
        password: ''
    } );

    // Trainer/student validation states
    const [ reVaild, setReVaild ] = useState( false );
    const [ displayTrainerStudent, setDisplayTrainerStudent ] = useState( false );
    const [ role, setRole ] = useState( { updateRole: '' } );
    const [ random, setRandom ] = useState( null );

    // Trainer and student forms
    const [ trainer, setTrainer ] = useState( {
        role: '',
        email: '',
        password: ''
    } );

    const [ student, setStudent ] = useState( {
        role: '',
        email: '',
        password: ''
    } );

    // Admin OTP states
    const [ adminPassword, setAdminPassword ] = useState( { password: '' } );
    const [ randumNumber, setRandomNumber ] = useState( '' );

    const handleInputs = ( e ) => {
        const { name, value } = e.target;
        setRegister( { ...register, [ name ]: value } );
    };

    const handleRegisterSubmit = ( e ) => {
        e.preventDefault();

        if ( register.role && register.email && register.password !== '' ) {
            const initialUser = { ...initialRole, register };
            setInitialRole( initialUser );
            localStorage.setItem( 'currentUserRole', JSON.stringify( initialUser ) );

            if ( register.role === 'admin' ) {
                toast.success( 'Successfully Registered Admin' );
            } else if ( register.role === 'trainer' ) {
                toast.success( 'Successfully Registered Trainer' );
            } else if ( register.role === 'student' ) {
                toast.success( 'Successfully Registered Student' );
            } else {
                toast.error( 'Invalid Role with Email and Password' );
            }
        } else {
            toast.error( 'Please enter Role, Email and Password' );
        }

        setRegister( { role: '', email: '', password: '' } );
    };

    // Trainer/student input handlers
    const handleTrainerInput = ( e ) => {
        const { name, value } = e.target;
        setTrainer( { ...trainer, [ name ]: value } );
    };

    const handleStudentInput = ( e ) => {
        const { name, value } = e.target;
        setStudent( { ...student, [ name ]: value } );
    };

    const handleChangeRe_valid = ( e ) => {
        const { name, value } = e.target;
        setRole( { ...role, [ name ]: value } );
    };

    useEffect( () => {
        if ( role.updateRole === 'trainer' || role.updateRole === 'student' ) {
            setTimeout( () => { setReVaild( !reVaild ); }, 2000 );
        } else if ( role.updateRole === 'null' ) {
            setReVaild( false );
        }
    }, [ role ] );

    // Admin password check
    const hndleCheckAdminPass = ( e ) => {
        const { name, value } = e.target;
        setAdminPassword( { ...adminPassword, [ name ]: value } );
    };

    const handleCheckPasswordAdmin = () => {
        const checkPassword = localStorage.getItem( "adminRegister" );
        const checkvalue = checkPassword ? JSON.parse( checkPassword ) : controlDash;

        if ( adminPassword.password !== '' ) {
            if ( checkvalue[ 0 ].password === adminPassword.password ) {
                setRandom( 900000 );
                toast.success( 'Password verified. OTP generated.' );
            } else {
                toast.error( 'Invalid Password' );
            }
        } else {
            toast.error( 'Please enter Admin Password' );
        }
    };

    // Random number generation
    const randomNum = ( values ) => {
        if ( role.updateRole === 'trainer' || role.updateRole === 'student' ) {
            return Math.floor( 100000 + Math.random() * values );
        }
    };

    const generateRandomNumber = useMemo( () => {
        return randomNum( random );
    }, [ random, controlDash ] );

    const handleCheckOTP = ( num ) => {
        if ( Number( num ) === Number( randumNumber ) ) {
            setDisplayTrainerStudent( !displayTrainerStudent );
            toast.success( 'OTP verified successfully' );
        } else {
            toast.error( 'Invalid OTP' );
        }
    };

    // Trainer/student registration
    const handleTrainerRegister = () => {
        if ( controlDash[ 1 ].role === trainer.role && trainer.email && trainer.password !== '' ) {
            const updateControlTrainer = [ ...controlDash ];
            updateControlTrainer[ 1 ] = {
                ...updateControlTrainer[ 1 ],
                role: trainer.role,
                email: trainer.email,
                password: trainer.password
            };

            setControlDash( updateControlTrainer );
            localStorage.setItem( 'adminRegister', JSON.stringify( updateControlTrainer ) );
            setTimeout( () => { setReVaild( !reVaild ); }, 1000 );
            toast.success( 'Trainer credentials updated successfully' );
        } else {
            toast.error( 'Invalid Email or password for Trainer' );
        }
    };

    const handleStudentRegister = () => {
        if ( controlDash[ 2 ].role === student.role && student.email && student.password !== '' ) {
            const updateControlStudent = [ ...controlDash ];
            updateControlStudent[ 2 ] = {
                ...updateControlStudent[ 2 ],
                role: student.role,
                email: student.email,
                password: student.password
            };
            setControlDash( updateControlStudent );
            localStorage.setItem( 'adminRegister', JSON.stringify( updateControlStudent ) );
            setTimeout( () => { setReVaild( !reVaild ); }, 1000 );
            toast.success( 'Student credentials updated successfully' );
        } else {
            toast.error( 'Invalid Email or password for Student' );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster
                position="top-center"
                toastOptions={ {
                    duration: 3000,
                    style: {
                        fontSize: '14px',
                    },
                } }
            />

            { !reVaild ? (
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Register Form</h1>
                    </div>

                    <form onSubmit={ handleRegisterSubmit } className="space-y-6">
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                name="role"
                                id="role"
                                value={ register.role }
                                onChange={ handleInputs }
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="trainer">Trainer</option>
                                <option value="student">Student</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={ register.email }
                                onChange={ handleInputs }
                                placeholder="Enter Username"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={ register.password }
                                onChange={ handleInputs }
                                placeholder="Enter Password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Register
                            </button>
                        </div>
                        <div>

                            <button
                                onClick={ () => { navigate( '/' ); } }
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    { register.role === 'admin' && (
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Create trainer/student credentials:
                                <select
                                    name="updateRole"
                                    onChange={ handleChangeRe_valid }
                                    className="mt-1 ml-2 inline-block px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="null">Click</option>
                                    <option value="trainer">Trainer</option>
                                    <option value="student">Student</option>
                                </select>
                            </label>
                        </div>
                    ) }
                </div>
            ) : (
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
                    { !displayTrainerStudent ? (
                        <div className="space-y-6">
                            <h1 className="text-xl font-bold text-center text-gray-800">Admin Verification</h1>

                            <div>
                                <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700">
                                    Admin Password:
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="adminPassword"
                                    value={ adminPassword.password }
                                    onChange={ hndleCheckAdminPass }
                                    placeholder="Enter Admin Password"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={ handleCheckPasswordAdmin }
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Verify Password
                            </button>

                            { random && (
                                <>
                                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                                        <p className="text-sm text-gray-600">Admin OTP: <span className="font-mono font-bold">{ generateRandomNumber }</span></p>
                                    </div>

                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Enter Your OTP"
                                            onChange={ ( e ) => { setRandomNumber( e.target.value ); } }
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={ () => { handleCheckOTP( generateRandomNumber ); } }
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Verify OTP
                                    </button>
                                </>
                            ) }
                        </div>
                    ) : (
                        <div>
                            { role.updateRole === 'trainer' ? (
                                <div className="space-y-6">
                                    <h1 className="text-xl font-bold text-center text-gray-800">Trainer Credentials</h1>

                                    <div>
                                        <label htmlFor="trainerRole" className="block text-sm font-medium text-gray-700">Role</label>
                                        <select
                                            name="role"
                                            id="trainerRole"
                                            value={ trainer.role }
                                            onChange={ handleTrainerInput }
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                                        >
                                            <option value="">Select Role</option>
                                            <option value="trainer">Trainer</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="trainerEmail" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            id="trainerEmail"
                                            placeholder="Enter Trainer Email"
                                            name="email"
                                            value={ trainer.email }
                                            onChange={ handleTrainerInput }
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="trainerPassword" className="block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            id="trainerPassword"
                                            placeholder="Enter Trainer Password"
                                            name="password"
                                            value={ trainer.password }
                                            onChange={ handleTrainerInput }
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <button
                                        onClick={ handleTrainerRegister }
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Update Trainer
                                    </button>
                                </div>
                            ) : role.updateRole === 'student' ? (
                                <div className="space-y-6">
                                    <h1 className="text-xl font-bold text-center text-gray-800">Student Credentials</h1>

                                    <div>
                                        <label htmlFor="studentRole" className="block text-sm font-medium text-gray-700">Role</label>
                                        <select
                                            name="role"
                                            id="studentRole"
                                            value={ student.role }
                                            onChange={ handleStudentInput }
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                                        >
                                            <option value="">Select Role</option>
                                            <option value="student">Student</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            id="studentEmail"
                                            placeholder="Enter Student Email"
                                            name="email"
                                            value={ student.email }
                                            onChange={ handleStudentInput }
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="studentPassword" className="block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            id="studentPassword"
                                            placeholder="Enter Student Password"
                                            name="password"
                                            value={ student.password }
                                            onChange={ handleStudentInput }
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <button
                                        onClick={ handleStudentRegister }
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Update Student
                                    </button>
                                </div>
                            ) : null }
                        </div>
                    ) }
                </div>
            ) }
        </div>
    );
};