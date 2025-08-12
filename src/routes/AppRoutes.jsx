import { Route, Routes } from "react-router-dom";

// Admin
import AddBatch from "../DataManagement/AddBatch";
import AddCategory from "../DataManagement/AddCategory";
import Addcourse from "../DataManagement/AddCourse";
import Roledetails from "../DataManagement/Roledetails";
import Dashboard from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { Internship } from "../ProcessManagement/InternShip";
import { MockInterview } from "../ProcessManagement/MockInterview";
import { Project } from "../ProcessManagement/Projects";
import { AddTest } from "../ProcessManagement/Test";
import AddStudent from "../StudentManagement/AddStudent";
import Enrollment from "../StudentManagement/Enrollment";
import AddTeacher from "../TeacherManagement/AddTeacher";
import AssignCourse from "../TeacherManagement/AssignCourse";

// Student
import { Student_Internship } from "../StudentDashboard/Student_Intenship";
import { Student_MockInterview } from "../StudentDashboard/Student_MockInterview";
import { Student_Project } from "../StudentDashboard/Student_Project";
import { Student_AddTest } from "../StudentDashboard/Student_Test";
import StudentDashboard from "../StudentDashboard/StudentDashboard";

// Trainer
import RegisterStudent from "../StudentManagement/RegisterStudent";
import { Trainer_Internship } from "../TrainerDashboard/ProcessManagement/Trainer_Internship";
import { Trainer_MockInterview } from "../TrainerDashboard/ProcessManagement/Trainer_MockInterview";
import { Trainer_Project } from "../TrainerDashboard/ProcessManagement/Trainer_Project";
import Trainer_Addstudent from "../TrainerDashboard/StudentManagement/Trainer_Addstudent";
import Trainer_Enrollment from "../TrainerDashboard/StudentManagement/Trainer_Enrollment";
import { default as Trainerdashboard } from "../TrainerDashboard/Trainerdashboard";
import { Trainer_Attendance } from "../TrainerDashboard/StudentManagement/Trainer_Attendance";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Admin */}
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-batch" element={<AddBatch />} />
            <Route path="/add-course" element={<Addcourse />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/add-role" element={<Roledetails />} />
            <Route path="/add-teacher" element={<AddTeacher />} />
            <Route path="/assign-courses" element={<AssignCourse />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/add-enrollment" element={<Enrollment />} />
            <Route path="/student-Register" element={<RegisterStudent />} />
            <Route path="/add-mock-interview" element={<MockInterview />} />
            <Route path="/add-internship" element={<Internship />} />
            <Route path="/add-projects" element={<Project />} />
            <Route path="/add-tasks" element={<Dashboard />} />
            <Route path="/add-tests" element={<AddTest />} />

            {/* Trainer */}
            <Route path="/trainer-dashboard" element={<Trainerdashboard />} />
            <Route path="/trainer/add-student" element={<Trainer_Addstudent />} />
            <Route path="/trainer/enrollments" element={<Trainer_Enrollment />} />
            <Route path="/trainer/student-Attendence" element={<Trainer_Attendance />} />
            <Route path="/trainer/student-progress" element={<Trainerdashboard />} />
            <Route path="/trainer/mock-interview" element={<Trainer_MockInterview />} />
            <Route path="/trainer/internship" element={<Trainer_Internship />} />
            <Route path="/trainer/projects" element={<Trainer_Project />} />
            <Route path="/trainer/tasks" element={<Trainerdashboard />} />
            <Route path="/trainer/tests" element={<Trainerdashboard />} />

            {/* Student */}
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/student-studentMock" element={<Student_MockInterview />} />
            <Route path="/student-internship" element={<Student_Internship />} />
            <Route path="/student-project" element={<Student_Project />} />
            <Route path="/student-test" element={<Student_AddTest />} />
            <Route path="/student-tasks" element={<StudentDashboard />} />
        </Routes>
    );
};

export default AppRoutes;
