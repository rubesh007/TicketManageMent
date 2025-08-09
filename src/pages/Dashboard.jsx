// src/pages/Dashboard.jsx
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import SideBar from '../components/layout/SideBar';
import Topbar from '../components/layout/Topbar';

// Register Chart.js components
ChartJS.register( ArcElement, Tooltip, Legend );

// Dashboard Component
const Dashboard = () => {
    const [ darkMode, setDarkMode ] = useState( false );
    const [ sidebarOpen, setSidebarOpen ] = useState( true );

    // Course data cards
    const courses = [
        { id: 1, title: 'Web Fundamentals', students: 320, progress: 75 },
        { id: 2, title: 'JavaScript Mastery', students: 280, progress: 68 },
        { id: 3, title: 'React & Redux', students: 420, progress: 82 },
        { id: 4, title: 'Node.js Backend', students: 350, progress: 70 },
        { id: 5, title: 'Database Systems', students: 310, progress: 65 },
        { id: 6, title: 'DevOps Practices', students: 240, progress: 58 },
        { id: 7, title: 'Cloud Deployment', students: 180, progress: 45 },
        { id: 8, title: 'Capstone Projects', students: 150, progress: 40 },
    ];

    // Pie chart data
    const pieData = {
        labels: [ 'Completed', 'In Progress', 'Not Started' ],
        datasets: [
            {
                data: [ 35, 45, 20 ],
                backgroundColor: [
                    darkMode ? '#4ade80' : '#22c55e',
                    darkMode ? '#60a5fa' : '#3b82f6',
                    darkMode ? '#94a3b8' : '#cbd5e1',
                ],
                borderColor: darkMode ? '#1e293b' : '#f1f5f9',
                borderWidth: 1,
            },
        ],
    };

    const toggleSidebar = () => {
        setSidebarOpen( !sidebarOpen );
    };

    return (
        <div className={ `flex h-screen ${ darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900' }` }>
            <SideBar
                darkMode={ darkMode }
                sidebarOpen={ sidebarOpen }
                setSidebarOpen={ setSidebarOpen }
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar
                    darkMode={ darkMode }
                    toggleSidebar={ toggleSidebar }
                />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <h1 className={ `text-2xl font-bold ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                FullStack Institute Dashboard
                            </h1>
                            <div className="flex items-center space-x-2 mt-2 md:mt-0">
                                <span className={ `text-sm ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                                    Enrollment Status
                                </span>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <button
                                    onClick={ () => setDarkMode( !darkMode ) }
                                    className={ `ml-4 p-2 rounded-lg ${ darkMode ? 'bg-gray-700' : 'bg-gray-200' }` }
                                >
                                    { darkMode ? '☀️' : '🌙' }
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */ }
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            { [
                                { title: 'Total Students', value: '2,150', change: '+12%' },
                                { title: 'Active Courses', value: '24', change: '+3' },
                                { title: 'Completion Rate', value: '78%', change: '+5%' },
                                { title: 'Avg. Placement', value: '92%', change: '+2%' },
                            ].map( ( stat, index ) => (
                                <div
                                    key={ index }
                                    className={ `p-5 rounded-xl shadow transition-all duration-300 ${ darkMode
                                        ? 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                                        : 'bg-white border border-gray-200 hover:border-gray-300'
                                        }` }
                                >
                                    <p className={ `text-sm ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                                        { stat.title }
                                    </p>
                                    <div className="flex items-end justify-between mt-2">
                                        <h3 className={ `text-2xl font-bold ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                            { stat.value }
                                        </h3>
                                        <span className="text-sm font-medium text-green-500">{ stat.change }</span>
                                    </div>
                                </div>
                            ) ) }
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Course Cards */ }
                            <div className="lg:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    { courses.map( ( course ) => (
                                        <div
                                            key={ course.id }
                                            className={ `p-5 rounded-xl shadow transition-all duration-300 ${ darkMode
                                                ? 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                                                : 'bg-white border border-gray-200 hover:border-gray-300'
                                                }` }
                                        >
                                            <div className="flex justify-between items-start">
                                                <h3 className={ `font-semibold ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                                    { course.title }
                                                </h3>
                                                <span
                                                    className={ `text-sm px-2 py-1 rounded-full transition-colors ${ darkMode
                                                        ? 'bg-gray-700 text-gray-300'
                                                        : 'bg-gray-100 text-gray-700'
                                                        }` }
                                                >
                                                    { course.students } students
                                                </span>
                                            </div>

                                            <div className="mt-4">
                                                <div className="flex justify-between mb-1">
                                                    <span className={ `text-sm ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                                                        Completion
                                                    </span>
                                                    <span className={ `text-sm font-medium ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                                        { course.progress }%
                                                    </span>
                                                </div>
                                                <div className={ `w-full rounded-full h-2 ${ darkMode ? 'bg-gray-700' : 'bg-gray-200' }` }>
                                                    <div
                                                        className="bg-blue-500 h-2 rounded-full transition-all duration-700"
                                                        style={ { width: `${ course.progress }%` } }
                                                    ></div>
                                                </div>
                                            </div>

                                            <button
                                                className={ `mt-4 w-full py-2 rounded-lg text-sm font-medium transition-colors ${ darkMode
                                                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                                    }` }
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    ) ) }
                                </div>
                            </div>

                            {/* Pie Chart Section */ }
                            <div>
                                <div
                                    className={ `p-5 rounded-xl shadow h-full transition-all duration-300 ${ darkMode
                                        ? 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                                        : 'bg-white border border-gray-200 hover:border-gray-300'
                                        }` }
                                >
                                    <h3 className={ `font-semibold mb-4 ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                        Course Completion Status
                                    </h3>

                                    <div className="h-64 flex items-center justify-center">
                                        <Pie
                                            data={ pieData }
                                            options={ {
                                                plugins: {
                                                    legend: {
                                                        labels: {
                                                            color: darkMode ? '#e2e8f0' : '#334155',
                                                            font: {
                                                                size: 14
                                                            }
                                                        }
                                                    }
                                                },
                                                maintainAspectRatio: false
                                            } }
                                        />
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        { [
                                            { label: 'Completed Courses', value: '35%', color: 'bg-green-500' },
                                            { label: 'In Progress', value: '45%', color: 'bg-blue-500' },
                                            { label: 'Not Started', value: '20%', color: 'bg-gray-400' },
                                        ].map( ( item, index ) => (
                                            <div key={ index } className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className={ `w-3 h-3 rounded-full ${ item.color }` }></div>
                                                    <span className={ `ml-2 text-sm ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                        { item.label }
                                                    </span>
                                                </div>
                                                <span className={ `font-medium ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                                    { item.value }
                                                </span>
                                            </div>
                                        ) ) }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */ }
                        <div
                            className={ `p-5 rounded-xl shadow transition-all duration-300 ${ darkMode
                                ? 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                                : 'bg-white border border-gray-200 hover:border-gray-300'
                                }` }
                        >
                            <h3 className={ `font-semibold mb-4 ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                Recent Student Activity
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr
                                            className={ `border-b ${ darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'
                                                }` }
                                        >
                                            <th className="py-2 px-4 text-left">Student</th>
                                            <th className="py-2 px-4 text-left">Course</th>
                                            <th className="py-2 px-4 text-left">Progress</th>
                                            <th className="py-2 px-4 text-left">Last Activity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { [
                                            { name: 'Alex Johnson', course: 'React & Redux', progress: 92, date: '2 hours ago' },
                                            { name: 'Maria Garcia', course: 'Node.js Backend', progress: 78, date: '5 hours ago' },
                                            { name: 'Samuel Chen', course: 'Database Systems', progress: 85, date: 'Yesterday' },
                                            { name: 'Emma Wilson', course: 'JavaScript Mastery', progress: 95, date: 'Yesterday' },
                                        ].map( ( student, index ) => (
                                            <tr
                                                key={ index }
                                                className={ `border-b ${ darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'
                                                    }` }
                                            >
                                                <td className={ `py-3 px-4 ${ darkMode ? 'text-white' : 'text-gray-900' }` }>
                                                    { student.name }
                                                </td>
                                                <td className={ `py-3 px-4 ${ darkMode ? 'text-gray-300' : 'text-gray-700' }` }>
                                                    { student.course }
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                                        <div
                                                            className="bg-blue-500 h-2 rounded-full transition-all duration-700"
                                                            style={ { width: `${ student.progress }%` } }
                                                        ></div>
                                                    </div>
                                                </td>
                                                <td className={ `py-3 px-4 ${ darkMode ? 'text-gray-400' : 'text-gray-600' }` }>
                                                    { student.date }
                                                </td>
                                            </tr>
                                        ) ) }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;