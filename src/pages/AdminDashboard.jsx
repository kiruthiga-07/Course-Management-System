import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminDashboard() {
    return (
        <>
            <PageCss href="/css/app.css" />
            <Navbar variant="admin" />
            <header className="dashboard-hero">
                <div className="dashboard-hero-inner">
                    <div className="dashboard-welcome">
                        <h1>Welcome, Admin</h1>
                        <p>Manage curriculum, enrollment, and platform analytics.</p>
                    </div>
                    <span className="dashboard-role-badge">Admin Console</span>
                </div>
            </header>
            <main className="dashboard-body">
                {/* ===================== OVERVIEW STATS ===================== */}
                <div className="dashboard-grid-3">
                    <div className="dashboard-stat">
                        <h3 id="statStudents">0</h3>
                        <p>Total Students</p>
                    </div>
                    <div className="dashboard-stat">
                        <h3 id="statCourses">0</h3>
                        <p>Total Courses</p>
                    </div>
                    <div className="dashboard-stat">
                        <h3 id="statEnrollments">0</h3>
                        <p>Total Enrollments</p>
                    </div>
                </div>
                {/* ===================== CURRICULUM MANAGEMENT ===================== */}
                <section className="dashboard-section" id="curriculum">
                    <div className="dashboard-section-header">
                        <h2>
                            <svg className="dashboard-section-icon" viewBox="0 0 24 24">
                                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 2.18l7 3.82-7 3.82-7-3.82 7-3.82zM12 18.82l-5-2.73v-4.36L12 14.5l5-2.73v4.36l-5 2.73z"></path>
                            </svg>
                            Curriculum Management
                        </h2>
                        <span className="dashboard-count" id="countCourses">0 courses</span>
                    </div>
                    <div className="dashboard-panel">
                        <div className="dash-panel-toolbar">
                            <button className="btn btn-primary btn-tiny" id="openAddCourseBtn">+ Add Course</button>
                        </div>
                        <div id="curriculumPanelBody">
                            <div className="dashboard-empty">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                                </svg>
                                <p>No courses have been added yet. Newly created courses will appear here.</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ===================== STUDENT ENROLLMENT ===================== */}
                <section className="dashboard-section" id="enrollment">
                    <div className="dashboard-section-header">
                        <h2>
                            <svg className="dashboard-section-icon" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                            </svg>
                            Student Enrollment
                        </h2>
                        <span className="dashboard-count" id="countStudents">0 students</span>
                    </div>
                    <div className="dashboard-panel" id="enrollmentPanelBody">
                        <div className="dashboard-empty">
                            <svg viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                            </svg>
                            <p>No students have enrolled yet. Enrollment records will be listed here.</p>
                        </div>
                    </div>
                </section>
                {/* ===================== PLATFORM ANALYTICS ===================== */}
                <section className="dashboard-section" id="analytics">
                    <div className="dashboard-section-header">
                        <h2>
                            <svg className="dashboard-section-icon" viewBox="0 0 24 24">
                                <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"></path>
                            </svg>
                            Platform Analytics
                        </h2>
                        <span className="dashboard-count" id="analyticsCount">No data</span>
                    </div>
                    <div className="dashboard-panel" id="analyticsPanelBody">
                        <div className="dashboard-empty">
                            <svg viewBox="0 0 24 24">
                                <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"></path>
                            </svg>
                            <p>Analytics will populate once there is platform activity to report on.</p>
                        </div>
                    </div>
                </section>
            </main>
            {/* ===================== ADD / EDIT COURSE MODAL ===================== */}
            <div className="course-form-overlay" id="courseFormOverlay">
                <div className="course-form-card">
                    <h3 id="courseFormTitle">Add New Course</h3>
                    <form id="courseForm">
                        <input type="hidden" id="courseFormId" />
                        <div className="course-form-grid">
                            <div className="full-width">
                                <label htmlFor="courseFormTitleInput">Course Title</label>
                                <input type="text" id="courseFormTitleInput" required placeholder="e.g. Advanced React Patterns" />
                            </div>
                            <div>
                                <label htmlFor="courseFormField">Field</label>
                                <select id="courseFormField" required></select>
                            </div>
                            <div>
                                <label htmlFor="courseFormBadge">Level</label>
                                <select id="courseFormBadge" required></select>
                            </div>
                            <div>
                                <label htmlFor="courseFormDuration">Duration</label>
                                <input type="text" id="courseFormDuration" required placeholder="e.g. 10 Weeks" />
                            </div>
                            <div>
                                <label htmlFor="courseFormInstructor">Instructor</label>
                                <input type="text" id="courseFormInstructor" required placeholder="e.g. Dr. A. Sharma" />
                            </div>
                            <div>
                                <label htmlFor="courseFormMode">Mode</label>
                                <select id="courseFormMode" required></select>
                            </div>
                            <div>
                                <label htmlFor="courseFormCertificate">Certificate</label>
                                <select id="courseFormCertificate" required></select>
                            </div>
                            <div className="full-width">
                                <label htmlFor="courseFormDescription">Description</label>
                                <textarea id="courseFormDescription" rows="3" required placeholder="Short course description"></textarea>
                            </div>
                        </div>
                        <div className="course-form-actions">
                            <button type="button" className="btn btn-secondary" id="cancelCourseFormBtn">Cancel</button>
                            <button type="submit" className="btn btn-primary" id="saveCourseFormBtn">Save Course</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
            <LegacyScript srcs={["/legacy/js/app.js"]} />
        </>
    );
}
