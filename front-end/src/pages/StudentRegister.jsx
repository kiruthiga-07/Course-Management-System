import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function StudentRegister() {
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
                        <div className="auth-eyebrow">Get Started</div>
                        <h1>Begin your academic journey today.</h1>
                        <p>Create your student account to enroll in courses, track your progress, and earn certifications.</p>
                    </div>
                    <div></div>
                </div>
                <div className="auth-panel-right">
                    <div className="auth-form-wrap">
                        <Link to="/" className="auth-back">
                            ← Back to home
                        </Link>
                        <div className="auth-badge">Student</div>
                        <h2>Create account</h2>
                        <p className="auth-intro">Fill in your details to set up your student profile.</p>
                        <form action="#" method="POST">
                            <div className="field">
                                <label htmlFor="full-name">Full name</label>
                                <input type="text" id="full-name" name="full_name" placeholder="John Doe" required />
                            </div>
                            <div className="field-row">
                                <div className="field">
                                    <label htmlFor="student-id">Student ID / Roll No</label>
                                    <input type="text" id="student-id" name="student_id" placeholder="STU-00482" required />
                                    <span className="field-hint">You'll use this as your Roll No when logging in.</span>
                                </div>
                                <div className="field">
                                    <label htmlFor="program">Program</label>
                                    <select id="program" name="program" required>
                                        <option value="" selected disabled>Select program</option>
                                        <option value="python">Python Programming</option>
                                        <option value="fullstack">Full Stack Development</option>
                                        <option value="ai">Artificial Intelligence</option>
                                        <option value="cybersecurity">Cyber Security</option>
                                    </select>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="email">Email address</label>
                                <input type="email" id="email" name="email" placeholder="you@university.edu" required />
                            </div>
                            <div className="field-row">
                                <div className="field">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" placeholder="Create a password" required />
                                </div>
                                <div className="field">
                                    <label htmlFor="confirm-password">Confirm password</label>
                                    <input type="password" id="confirm-password" name="confirm_password" placeholder="Repeat password" required />
                                </div>
                            </div>
                            <button type="submit" className="btn-auth">Create account</button>
                        </form>
                        <p className="auth-foot">
                            Already have an account?
                            <Link to="/student-login">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <LegacyScript srcs={["/legacy/js/api.js", "/legacy/js/state.js", "/legacy/js/validation.js", "/legacy/js/ui.js", "/legacy/js/auth.js", "/legacy/js/pages/student-register.js"]} />
        </>
    );
}
