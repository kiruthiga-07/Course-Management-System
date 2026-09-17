import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function ResetPassword() {
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
                        <div className="auth-eyebrow">Security</div>
                        <h1>Set a new password</h1>
                        <p>Ensure your new password is secure and unique to protect your account information.</p>
                    </div>
                </div>
                <div className="auth-panel-right">
                    <div className="auth-form-wrap">
                        <h2>New Password</h2>
                        <form action="student-login.html" method="POST">
                            <div className="field">
                                <label htmlFor="email">Email address</label>
                                <input type="email" id="email" name="email" placeholder="you@university.edu" required />
                            </div>
                            <div className="field">
                                <label htmlFor="password">New Password</label>
                                <input type="password" id="password" name="password" placeholder="Create a new password" required />
                            </div>
                            <div className="field">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input type="password" id="confirm-password" name="confirm_password" placeholder="Repeat new password" required />
                            </div>
                            <button type="submit" className="btn-auth">Update Password</button>
                        </form>
                    </div>
                </div>
            </div>
            <LegacyScript srcs={["/legacy/js/api.js", "/legacy/js/state.js", "/legacy/js/validation.js", "/legacy/js/ui.js", "/legacy/js/auth.js", "/legacy/js/pages/reset-password.js"]} />
        </>
    );
}
