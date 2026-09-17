import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function LoginSelection() {
    return (
        <div className="selection-page">
            <PageCss href="/css/app.css" />
            <Link to="/" className="back-nav">
                ← Back to Home
            </Link>
            <div className="selection-header">
                <h1>Welcome Back</h1>
                <p>Choose your portal to continue</p>
            </div>
            <div className="selection-grid">
                <div className="card">
                    <svg className="card-icon" viewBox="0 0 24 24">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 2.18l7 3.82-7 3.82-7-3.82 7-3.82zM12 18.82l-5-2.73v-4.36L12 14.5l5-2.73v4.36l-5 2.73z"></path>
                    </svg>
                    <h2>Student Portal</h2>
                    <p>Access your enrolled courses, monitor your learning progress, and manage your tasks.</p>
                    <Link to="/student-login" className="btn-select">
                        Student Login
                    </Link>
                    <Link to="/student-register" className="btn-select btn-register">
                        Student Registration
                    </Link>
                </div>
                <div className="card">
                    <svg className="card-icon" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                    <h2>Admin Console</h2>
                    <p>Manage curriculum, oversee student enrollment, and access global platform analytics.</p>
                    <Link to="/admin-login" className="btn-select">
                        Admin Login
                    </Link>
                </div>
            </div>
            <LegacyScript srcs={["/legacy/js/app.js"]} />
        </div>
    );
}
