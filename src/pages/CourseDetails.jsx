import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CourseDetails() {
    return (
        <>
            <PageCss href="/css/app.css" />
            <Navbar variant="course" />
            {/* ===================== COURSE NOT FOUND ===================== */}
            <div id="notFoundState" style={{display: "none", maxWidth: "600px", margin: "80px auto", textAlign: "center", padding: "0 20px"}}>
                <h2 style={{marginBottom: "12px"}}>Course not found</h2>
                <p style={{marginBottom: "24px"}}>We couldn't find the course you were looking for.</p>
                <Link to="/courses" className="btn btn-primary">
                    Browse Courses
                </Link>
            </div>
            <div id="courseRoot" style={{display: "none"}}>
                <header className="course-hero">
                    <div className="course-hero-inner">
                        <span className="course-badge" id="courseBadge">Beginner</span>
                        <h1 id="courseTitle">Course Title</h1>
                        <p id="courseDescription">Course description goes here.</p>
                        <div className="course-hero-meta">
                            <span id="metaInstructor">Instructor</span>
                            <span id="metaDuration">Duration</span>
                            <span id="metaMode">Mode</span>
                            <span id="metaField">Field</span>
                        </div>
                    </div>
                </header>
                <div className="course-content-body">
                    <div className="course-main">
                        {/* Shown when the visitor has not enrolled in this course yet */}
                        <div className="enroll-required-banner" id="enrollBanner" style={{display: "none"}}>
                            You're not enrolled in this course yet.
                            <a href="#" id="enrollNowLink">Enroll now</a>
                            to unlock the modules below and track your progress.
                        </div>
                        <div id="modulesContainer"></div>
                    </div>
                    <aside className="course-sidebar">
                        <div className="sidebar-card">
                            <h4>Your Progress</h4>
                            <div className="sidebar-progress-value" id="progressValue">0%</div>
                            <div className="progress-track">
                                <div className="progress-fill" id="progressFillBar" style={{width: "0%"}}></div>
                            </div>
                            <div className="progress-label">
                                <span id="progressModulesLabel">0 of 0 modules completed</span>
                            </div>
                        </div>
                        <div className="sidebar-card" id="enrollmentStatusCard">
                            <h4>Course Info</h4>
                            <div className="sidebar-meta-row">
                                <span>Instructor</span>
                                <span id="sideInstructor">—</span>
                            </div>
                            <div className="sidebar-meta-row">
                                <span>Duration</span>
                                <span id="sideDuration">—</span>
                            </div>
                            <div className="sidebar-meta-row">
                                <span>Mode</span>
                                <span id="sideMode">—</span>
                            </div>
                            <div className="sidebar-meta-row">
                                <span>Certificate</span>
                                <span id="sideCertificate">—</span>
                            </div>
                        </div>
                        <div className="sidebar-card" id="actionCard">{/* Filled dynamically: enrolled / not-enrolled / completed states */}</div>
                    </aside>
                </div>
            </div>
            <Footer />
            <LegacyScript srcs={["https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js", "/legacy/js/app.js"]} />
        </>
    );
}
