import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function ForgotPassword() {
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
                        <div className="auth-eyebrow">Recovery</div>
                        <h1>Let's get you back in.</h1>
                        <p>Enter the email address associated with your account, and we'll send you instructions to reset your password.</p>
                    </div>
                </div>
                <div className="auth-panel-right">
                    <div className="auth-form-wrap">
                        <Link to="/login-selection" className="auth-back">
                            ← Back to login
                        </Link>
                        <h2>Reset password</h2>
                        <form action="reset-password.html" method="GET">
                            <div className="field">
                                <label htmlFor="email">Email address</label>
                                <input type="email" id="email" name="email" placeholder="you@university.edu" required />
                            </div>
                            <button type="submit" className="btn-auth">Send Reset Link</button>
                        </form>
                    </div>
                </div>
            </div>
            <LegacyScript srcs={["/legacy/js/app.js"]} />
        </>
    );
}
