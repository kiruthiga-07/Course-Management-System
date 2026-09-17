import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function AdminSchemaLogin() {
    return (
        <>
            <PageCss href="/css/app.css" />
            <div className="auth-split">
                <div className="auth-panel-left">
                    <div className="auth-brand">
                        <div className="auth-mark">ET</div>
                        <div>
                            <div className="auth-brand-name">EduTrack</div>
                            <div className="auth-brand-sub">Course & Progress System</div>
                        </div>
                    </div>
                    <div className="auth-panel-mid">
                        <div className="auth-eyebrow">Admin Console</div>
                        <h1>Oversee every course, instructor, and learner.</h1>
                        <p>Manage enrollments, publish new programs, and review platform-wide analytics from one console.</p>
                    </div>
                    <div className="auth-role-switch">
                        <Link to="/courses">
                            ← Back to Courses
                        </Link>
                    </div>
                </div>
                <div className="auth-panel-right">
                    <div className="auth-form-wrap">
                        <span className="auth-badge">Admin Console</span>
                        <h2>Admin Authentication</h2>
                        <p className="auth-intro">Enter your credentials to manage course schemas.</p>
                        <form id="adminLoginForm">
                            <div className="field">
                                <label>Admin Email</label>
                                <input type="email" id="admin-email" required placeholder="EMAIL" />
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input type="password" id="admin-pass" required placeholder="••••••••" />
                            </div>
                            <button type="submit" className="btn-auth">Authenticate & Access</button>
                        </form>
                        <div className="auth-notice">
                            <p>
                                <strong>Admin accounts are issued by EduTrack</strong>
                                — they aren't self-registered. Contact your system administrator if you need access.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <LegacyScript srcs={["/legacy/js/app.js"]} />
        </>
    );
}
