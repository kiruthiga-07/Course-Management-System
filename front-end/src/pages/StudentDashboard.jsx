import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function StudentDashboard() {
    return (
        <>
            <PageCss href="/css/app.css" />
            <Navbar variant="student" />
            <header className="dashboard-hero">
                <div className="dashboard-hero-inner">
                    <div className="dashboard-welcome">
                        <h1 id="welcomeHeading">Welcome, Student</h1>
                        <p id="welcomeSub">Here's an overview of your learning journey.</p>
                        <Link to="/courses" className="btn btn-primary" style={{marginTop: "14px", display: "inline-block", padding: "10px 22px"}}>
                            Browse Courses & Enroll
                        </Link>
                    </div>
                    <div style={{textAlign: "right"}}>
                        <span className="dashboard-role-badge">Student Portal</span>
                        <div>
                            <a href="#" id="switchStudentLink" style={{display: "none", color: "var(--gold-300)", fontSize: "0.8rem", marginTop: "10px"}}>Not you? Switch student</a>
                        </div>
                    </div>
                </div>
            </header>
            <main className="dashboard-body">
                {/* ===================== STUDENT LOOKUP (shown if no active session) ===================== */}
                <section className="dashboard-section" id="lookupSection" style={{display: "none"}}>
                    <div className="dashboard-panel" style={{padding: "32px"}}>
                        <h3 style={{marginBottom: "8px"}}>View Your Dashboard</h3>
                        <p style={{fontSize: "0.9rem", marginBottom: "18px"}}>Enter the roll number you used while enrolling to load your courses.</p>
                        <form id="lookupForm" style={{display: "flex", gap: "12px", flexWrap: "wrap"}}>
                            <input type="text" id="lookupRoll" placeholder="Enter your roll number" required style={{flex: "1", minWidth: "200px", padding: "12px 14px", border: "1.5px solid var(--border-color)", borderRadius: "4px", fontFamily: "inherit", fontSize: "0.95rem", background: "var(--ivory)", outline: "none"}} />
                            <button type="submit" className="btn btn-primary">View Dashboard</button>
                        </form>
                    </div>
                </section>
                <div id="dashboardContent">
                    {/* ===================== LEARNING PROCESS ===================== */}
                    <section className="dashboard-section" id="learning-process">
                        <div className="dashboard-section-header">
                            <h2>
                                <svg className="dashboard-section-icon" viewBox="0 0 24 24">
                                    <path d="M13 3v6h8V3h-8zM3 13v8h8v-8H3zm10 8h8v-8h-8v8zM3 3v6h8V3H3z"></path>
                                </svg>
                                Learning Process
                            </h2>
                            <span className="dashboard-count" id="countInProgress">0 in progress</span>
                        </div>
                        <div className="dashboard-panel" id="panelInProgress">
                            <div className="dashboard-empty">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                                </svg>
                                <p>No learning activity yet. Once you start a course, your progress will appear here.</p>
                            </div>
                        </div>
                    </section>
                    {/* ===================== MY COURSES ===================== */}
                    <section className="dashboard-section" id="my-courses">
                        <div className="dashboard-section-header">
                            <h2>
                                <svg className="dashboard-section-icon" viewBox="0 0 24 24">
                                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 2.18l7 3.82-7 3.82-7-3.82 7-3.82zM12 18.82l-5-2.73v-4.36L12 14.5l5-2.73v4.36l-5 2.73z"></path>
                                </svg>
                                My Courses
                            </h2>
                            <span className="dashboard-count" id="countMyCourses">0 enrolled</span>
                        </div>
                        <div className="dashboard-panel" id="panelMyCourses">
                            <div className="dashboard-empty">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 2.18l7 3.82-7 3.82-7-3.82 7-3.82zM12 18.82l-5-2.73v-4.36L12 14.5l5-2.73v4.36l-5 2.73z"></path>
                                </svg>
                                <p>You haven't enrolled in any courses yet. Browse the catalog to get started.</p>
                            </div>
                        </div>
                    </section>
                    {/* ===================== COMPLETED COURSES ===================== */}
                    <section className="dashboard-section" id="completed-courses">
                        <div className="dashboard-section-header">
                            <h2>
                                <svg className="dashboard-section-icon" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                                </svg>
                                Completed Courses
                            </h2>
                            <span className="dashboard-count" id="countCompleted">0 completed</span>
                        </div>
                        <div className="dashboard-panel" id="panelCompleted">
                            <div className="dashboard-empty">
                                <svg viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                                </svg>
                                <p>No completed courses yet. Finished courses and certificates will be listed here.</p>
                            </div>
                        </div>
                    </section>
                </div>
                {/* /#dashboardContent */}
            </main>
            <Footer />
            <LegacyScript srcs={["/legacy/js/app.js"]} />
        </>
    );
}
