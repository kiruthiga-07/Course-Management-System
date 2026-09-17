import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminSchemaLogin from "./pages/AdminSchemaLogin";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EditCourse from "./pages/EditCourse";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LoginSelection from "./pages/LoginSelection";
import Notifications from "./pages/Notifications";
import StudentEnroll from "./pages/StudentEnroll";

/*
 * Every route is registered both "clean" (/courses) and with the original
 * .html filename (/courses.html). This isn't just cosmetic: app.js derives
 * EduTrack.currentPage from the LAST SEGMENT of window.location.pathname
 * with ".html" stripped (see the top of app.js), and several pages still
 * navigate with window.location.href = "some-page.html" (a full page
 * reload, not client-side routing). Both forms need to resolve to the
 * same component so that dispatch keeps working either way.
 */
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index.html" element={<Home />} />

            <Route path="/courses" element={<Courses />} />
            <Route path="/courses.html" element={<Courses />} />

            <Route path="/course" element={<CourseDetails />} />
            <Route path="/course.html" element={<CourseDetails />} />

            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/student-login.html" element={<StudentLogin />} />

            <Route path="/student-register" element={<StudentRegister />} />
            <Route path="/student-register.html" element={<StudentRegister />} />

            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-login.html" element={<AdminLogin />} />

            <Route path="/admin-schema-login" element={<AdminSchemaLogin />} />
            <Route path="/admin-schema-login.html" element={<AdminSchemaLogin />} />

            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/student-dashboard.html" element={<StudentDashboard />} />

            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard.html" element={<AdminDashboard />} />

            <Route path="/edit-course" element={<EditCourse />} />
            <Route path="/edit-course.html" element={<EditCourse />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-password.html" element={<ForgotPassword />} />

            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password.html" element={<ResetPassword />} />

            <Route path="/login-selection" element={<LoginSelection />} />
            <Route path="/login-selection.html" element={<LoginSelection />} />

            <Route path="/notifications" element={<Notifications />} />
            <Route path="/notifications.html" element={<Notifications />} />

            <Route path="/stu-login-enroll" element={<StudentEnroll />} />
            <Route path="/stu-login-enroll.html" element={<StudentEnroll />} />
        </Routes>
    );
}

export default App;
