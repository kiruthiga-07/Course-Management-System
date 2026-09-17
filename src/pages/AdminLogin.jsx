import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function AdminLogin() {
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
                    <div></div>
                </div>
                <div className="auth-panel-right">
                    <div className="auth-form-wrap">
                        <Link to="/" className="auth-back">
                            ← Back to home
                        </Link>
                        <h2>Log in</h2>
                        <p className="auth-intro">Enter your administrator credentials to access the console.</p>
                        <form id="adminLoginForm" action="#" method="POST">
                            <div className="field">
                                <label htmlFor="email">Work email</label>
                                <input type="email" id="email" name="email" placeholder="you@edutrack.com" required />
                            </div>
                            <div className="field">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="Your password" required />
                            </div>
                            <div className="field-meta">
                                <Link to="/forgot-password">
                                    Forgot password?
                                </Link>
                            </div>
                            <button type="submit" className="btn-auth">Login</button>
                        </form>
                        <div className="auth-notice">
                            <p>
                                <strong>Admin accounts are issued by EduTrack</strong>
                                — they aren't self-registered. If you're part of the staff, contact your platform administrator to have an account created or to reset access.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <LegacyScript srcs={["/legacy/js/app.js"]} />
        </>
    );
}
