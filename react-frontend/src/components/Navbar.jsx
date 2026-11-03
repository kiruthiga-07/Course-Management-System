import { Link } from "react-router-dom";

/*
 * Covers the navbar variants that actually recur across EduTrack's pages.
 * IDs match the originals exactly (navAuthBtn, navDashboardItem,
 * adminLogoutBtn, logoutLink) since app.js looks them up by
 * document.getElementById / getElementByI to toggle visibility and wire
 * up logout — changing an id here would silently break that logic.
 */
function adminLogout() {
    localStorage.removeItem("isAdminVerified");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
}

function studentLogout() {
    localStorage.removeItem("edutrack_current_student");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
}

function Navbar({ variant = "courses" }) {
    const isAdminSession =
        sessionStorage.getItem("role") === "admin" &&
        !!sessionStorage.getItem("token") &&
        localStorage.getItem("isAdminVerified") === "true";
    const isStudentRole = sessionStorage.getItem("role") === "student";
    const hasToken = !!sessionStorage.getItem("token");

    if (variant === "home") {
        return (
            <nav className="navbar">
                <div className="logo">EduTrack.</div>
                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><Link to="/courses">Courses</Link></li>
                    {isAdminSession && <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>}
                    {isAdminSession && <li><Link to="/messages">Messages</Link></li>}
                </ul>
                {isAdminSession ? (
                    <Link to="/login-selection" className="btn btn-login" onClick={adminLogout}>Logout</Link>
                ) : (
                    <Link to="/login-selection" className="btn btn-login">Login / Register</Link>
                )}
            </nav>
        );
    }

    if (variant === "course") {
        return (
            <nav className="navbar">
                <div className="logo">EduTrack.</div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/student-dashboard">My Dashboard</Link></li>
                </ul>
                <Link to="/courses" className="btn btn-login">← Back to Courses</Link>
            </nav>
        );
    }

    if (variant === "admin") {
        return (
            <nav className="navbar">
                <div className="logo">EduTrack.</div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                    <li><Link to="/messages">Messages</Link></li>
                </ul>
                <Link to="/login-selection" className="dashboard-logout" id="adminLogoutBtn" onClick={adminLogout}>Logout</Link>
            </nav>
        );
    }

    if (variant === "student") {
        return (
            <nav className="navbar">
                <div className="logo">EduTrack.</div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/notifications">Notifications</Link></li>
                    <li><Link to="/my-learning">My Learning</Link></li>
                    <li><Link to="/messages">Messages</Link></li>
                </ul>
                <Link to="/login-selection" className="dashboard-logout" id="logoutLink" onClick={studentLogout}>Logout</Link>
            </nav>
        );
    }

    // "courses" (default) and "notifications" share the same structure;
    // only the Notifications link's weight differs.
    const notificationsActive = variant === "notifications";
    return (
        <nav className="navbar">
            <div className="logo">EduTrack.</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li id="navDashboardItem" style={{ display: "none" }}>
                    <Link to="/student-dashboard">Dashboard</Link>
                </li>
                {isAdminSession && (
                    <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                )}
                {isStudentRole && (
                    <li><Link to="/my-learning">My Learning</Link></li>
                )}
                {hasToken && (
                    <li><Link to="/messages">Messages</Link></li>
                )}
                <li>
                    <Link to="/notifications" style={notificationsActive ? { fontWeight: 700 } : undefined}>
                        Notifications
                    </Link>
                </li>
            </ul>
            {isAdminSession ? (
                <Link to="/login-selection" className="btn btn-login" onClick={adminLogout}>Logout</Link>
            ) : (
                <Link to="/login-selection" className="btn btn-login" id="navAuthBtn">Login / Register</Link>
            )}
        </nav>
    );
}

export default Navbar;