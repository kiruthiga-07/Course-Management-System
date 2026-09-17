import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Notifications() {
    return (
        <>
            <PageCss href="/css/app.css" />
            <Navbar variant="notifications" />
            <header className="dashboard-hero">
                <div className="dashboard-hero-inner">
                    <div className="dashboard-welcome">
                        <h1>Notifications</h1>
                        <p>New course alerts, enrollment confirmations, and completion certificates all in one place.</p>
                    </div>
                    <div style={{textAlign: "right"}}>
                        <span className="dashboard-role-badge">Notification Center</span>
                        <div style={{marginTop: "12px"}}>
                            <button className="mark-read-btn" id="markAllPageBtn" type="button" style={{color: "var(--gold-300)"}}>Mark all as read</button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="dashboard-body">
                {/* ===================== NEW COURSE ALERTS (always visible) ===================== */}
                <section className="dashboard-section" id="new-course-alerts">
                    <div className="dashboard-section-header">
                        <h2>
                            <svg className="dashboard-section-icon" viewBox="0 0 24 24">
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
                            </svg>
                            New Course Alerts
                        </h2>
                        <div className="notif-header-actions">
                            <span className="dashboard-count" id="countNewCourses">0 new</span>
                            <button className="mark-read-btn" id="markAllNewBtn" type="button">Mark all as read</button>
                        </div>
                    </div>
                    <div className="dashboard-panel" id="panelNewCourses">
                        <div className="dashboard-empty">
                            <svg viewBox="0 0 24 24">
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
                            </svg>
                            <p>No new course alerts right now. Check back soon!</p>
                        </div>
                    </div>
                </section>
                {/* ===================== LOGIN PROMPT (shown if no active session) ===================== */}
                <section className="dashboard-section" id="notifLoginPrompt" style={{display: "none"}}>
                    <div className="dashboard-panel" style={{padding: "32px", textAlign: "center"}}>
                        <h3 style={{marginBottom: "8px"}}>Log in to see your notifications</h3>
                        <p style={{fontSize: "0.9rem", marginBottom: "18px"}}>Enrollment confirmations and completion certificates are tied to your student account.</p>
                        <Link to="/student-login" className="btn btn-primary" style={{padding: "10px 22px", display: "inline-block"}}>
                            Login to Continue
                        </Link>
                    </div>
                </section>
                <div id="personalNotifSections" style={{display: "none"}}>
                    {/* ===================== ENROLLMENT CONFIRMATION ===================== */}
                    <section className="dashboard-section" id="enrollment-confirmation">
                        <div className="dashboard-section-header">
                            <h2>
                                <svg className="dashboard-section-icon" viewBox="0 0 24 24">
                                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 2.18l7 3.82-7 3.82-7-3.82 7-3.82zM12 18.82l-5-2.73v-4.36L12 14.5l5-2.73v4.36l-5 2.73z"></path>
                                </svg>
                                Enrollment Confirmation
                            </h2>
                            <div className="notif-header-actions">
                                <span className="dashboard-count" id="countEnrollConfirm">0 confirmations</span>
                                <button className="mark-read-btn" id="markAllEnrollBtn" type="button">Mark all as read</button>
                            </div>
                        </div>
                        <div className="dashboard-panel" id="panelEnrollConfirm">
                            <div className="dashboard-empty">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 2.18l7 3.82-7 3.82-7-3.82 7-3.82zM12 18.82l-5-2.73v-4.36L12 14.5l5-2.73v4.36l-5 2.73z"></path>
                                </svg>
                                <p>You'll see a confirmation here as soon as you enroll in a course.</p>
                            </div>
                        </div>
                    </section>
                    {/* ===================== COMPLETION CERTIFICATES ===================== */}
                    <section className="dashboard-section" id="completion-certificates">
                        <div className="dashboard-section-header">
                            <h2>
                                <svg className="dashboard-section-icon" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                                </svg>
                                Completion Certificates
                            </h2>
                            <div className="notif-header-actions">
                                <span className="dashboard-count" id="countCertificates">0 earned</span>
                                <button className="mark-read-btn" id="markAllCertBtn" type="button">Mark all as read</button>
                            </div>
                        </div>
                        <div className="dashboard-panel" id="panelCertificates">
                            <div className="dashboard-empty">
                                <svg viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                                </svg>
                                <p>Finish a course to earn your first certificate — it will show up here.</p>
                            </div>
                        </div>
                    </section>
                </div>
                {/* /#personalNotifSections */}
            </main>
            <Footer />
            <LegacyScript srcs={["/legacy/js/app.js"]} />
        </>
    );
}
