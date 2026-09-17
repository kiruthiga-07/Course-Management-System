import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function EditCourse() {
    return (
        <>
            <PageCss href="/css/app.css" />
            <div className="admin-topbar">
                <div className="logo">EduTrack Admin</div>
                <div className="admin-topbar-actions">
                    <Link to="/courses">
                        ← Back to Courses
                    </Link>
                    <a href="#" id="logoutLink">Log out</a>
                </div>
            </div>
            <div className="edit-page-container">
                <aside className="course-sidebar">
                    <h3>Courses</h3>
                    <button type="button" id="addCourseBtn" className="btn btn-primary btn-add-course">+ Add New Course</button>
                    <div id="courseListByField"></div>
                </aside>
                <main className="schema-editor">
                    <h2 id="editorTitle">Add New Course</h2>
                    <p className="editor-subtitle" id="editorSubtitle">Fill in the details below and save to publish it on the Courses page.</p>
                    <form className="course-form" id="courseForm">
                        <input type="hidden" id="course-id" value="" />
                        <div className="field">
                            <label>Field</label>
                            <select id="course-field" required></select>
                        </div>
                        <div className="field">
                            <label>Course Title</label>
                            <input type="text" id="course-title" required placeholder="e.g. AI Fundamentals" />
                        </div>
                        <div className="form-row">
                            <div className="field">
                                <label>Level</label>
                                <select id="course-badge" required></select>
                            </div>
                            <div className="field">
                                <label>Duration</label>
                                <input type="text" id="course-duration" required placeholder="e.g. 10 Weeks" />
                            </div>
                        </div>
                        <div className="field">
                            <label>Description</label>
                            <textarea id="course-description" required placeholder="Short description of the course"></textarea>
                        </div>
                        <div className="form-row">
                            <div className="field">
                                <label>Instructor</label>
                                <input type="text" id="course-instructor" required placeholder="e.g. Dr. R. Menon" />
                            </div>
                            <div className="field">
                                <label>Mode</label>
                                <select id="course-mode" required></select>
                            </div>
                        </div>
                        <div className="field">
                            <label>Certificate</label>
                            <select id="course-certificate" required></select>
                        </div>
                        <div className="modules-section">
                            <h3>Module Content</h3>
                            <p className="modules-section-hint">
                                Each module shown to students has a Photo, a Video and a Theory part. Everything here is
                        optional — leave a field blank and EduTrack will fall back to sensible auto-generated
                        content for this course's field.
                            </p>
                            <div id="modulesEditor"></div>
                            <button type="button" id="addModuleBtn" className="btn btn-outline" style={{marginBottom: "1rem"}}>+ Add Module</button>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary" id="saveBtn">Save Course</button>
                            <button type="button" className="btn btn-outline" id="deleteBtn" style={{display: "none"}}>Delete Course</button>
                            <button type="button" className="btn btn-secondary" id="cancelBtn">Reset</button>
                        </div>
                        <div className="save-toast" id="saveToast"></div>
                    </form>
                </main>
            </div>
            <LegacyScript srcs={["/legacy/js/app.js"]} />
        </>
    );
}
