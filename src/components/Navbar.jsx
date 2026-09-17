import { Link } from "react-router-dom";

/*
 * Covers the navbar variants that actually recur across EduTrack's pages.
 * IDs match the originals exactly (navAuthBtn, navDashboardItem,
 * adminLogoutBtn, logoutLink) since app.js looks them up by
 * document.getElementById / getElementByI to toggle visibility and wire
 * up logout — changing an id here would silently break that logic.
 */
function Navbar({ variant = "courses" }) {
    if (variant === "home") {
        return (
            <nav className="navbar">
                <div className="logo">EduTrack.</div>
                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">Reviews</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <Link to="/login-selection" className="btn btn-login">Login / Register</Link>
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
                    <li><a href="index.html#">Features</a></li>
                    <li><a href="index.html#">Reviews</a></li>
                    <li><a href="index.html#">Contact</a></li>
                </ul>
                <Link to="/login-selection" className="dashboard-logout" id="adminLogoutBtn">Logout</Link>
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
                    <li><a href="index.html#">Features</a></li>
                    <li><a href="index.html#">Reviews</a></li>
                    <li><a href="index.html#">Contact</a></li>
                    <li><Link to="/notifications">Notifications</Link></li>
                </ul>
                <Link to="/login-selection" className="dashboard-logout" id="logoutLink">Logout</Link>
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
                <li><a href="index.html#">Features</a></li>
                <li><a href="index.html#">Reviews</a></li>
                <li><a href="index.html#">Contact</a></li>
                <li id="navDashboardItem" style={{ display: "none" }}>
                    <Link to="/student-dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/notifications" style={notificationsActive ? { fontWeight: 700 } : undefined}>
                        Notifications
                    </Link>
                </li>
            </ul>
            <Link to="/login-selection" className="btn btn-login" id="navAuthBtn">Login / Register</Link>
        </nav>
    );
}

export default Navbar;
