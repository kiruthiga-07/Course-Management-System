import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function StudentLogin() {
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
                        <div className="auth-eyebrow">Welcome Back</div>
                        <h1>Pick up exactly where you left off.</h1>
                        <p>Your enrolled courses, completed modules, and progress bars are waiting in your dashboard.</p>
                    </div>
                    <div></div>
                </div>
                <div className="auth-panel-right">
                    <div className="auth-form-wrap">
                        <Link to="/" className="auth-back">
                            ← Back to home
                        </Link>
                        <h2>Log in</h2>
                        <p className="auth-intro">Enter your registered email and password to continue.</p>
                        <form action="#" method="POST">
                            <div className="field">
                                <label htmlFor="email">Email address</label>
                                <input type="email" id="email" name="email" placeholder="you@university.edu" required />
                            </div>
                            <div className="field">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="Your password" required />
                            </div>
                            <div className="field">
                                <label htmlFor="rollNo">Roll No</label>
                                <input type="text" id="rollNo" name="rollNo" placeholder="Enter the roll number you enrolled with" required />
                            </div>
                            <div className="field-meta">
                                <Link to="/reset-password" id="forgotPasswordLink">
                                    Forgot password?
                                </Link>
                            </div>
                            <button type="submit" className="btn-auth">Login</button>
                        </form>
                        <p className="auth-foot">
                            New to EduTrack?
                            <Link to="/student-register">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <LegacyScript srcs={["/legacy/js/api.js", "/legacy/js/state.js", "/legacy/js/validation.js", "/legacy/js/ui.js", "/legacy/js/auth.js", "/legacy/js/pages/student-login.js"]} />
        </>
    );
}
