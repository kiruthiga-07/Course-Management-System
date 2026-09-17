import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function StudentEnroll() {
    return (
        <>
            <PageCss href="/css/app.css" />
            <Link to="/courses" className="back-nav">
                ← Back
            </Link>
            <div className="auth-card">
                {/* ===================== ENROLLMENT FORM ===================== */}
                <div className="form-view" id="formView">
                    <svg className="auth-icon" viewBox="0 0 24 24">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 2.18l7 3.82-7 3.82-7-3.82 7-3.82zM12 18.82l-5-2.73v-4.36L12 14.5l5-2.73v4.36l-5 2.73z"></path>
                    </svg>
                    <h1>Student Enrollment</h1>
                    <span className="enroll-course-tag" id="courseTag" style={{display: "none"}}></span>
                    <p id="formSubtitle">Enter your details below to enroll.</p>
                    <form id="enrollForm">
                        <div className="form-group">
                            <label htmlFor="studentName">Student Name</label>
                            <input type="text" id="studentName" name="studentName" placeholder="Enter your full name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rollNo">Roll No</label>
                            <input type="text" id="rollNo" name="rollNo" placeholder="Enter your roll number" required />
                        </div>
                        <button type="submit" className="btn-submit">Submit</button>
                    </form>
                </div>
                {/* ===================== SUCCESS MESSAGE ===================== */}
                <div className="success-view" id="successView">
                    <svg className="success-icon" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                    </svg>
                    <h1>Successfully Submitted!</h1>
                    <p id="successMessage">Your enrollment details have been recorded.</p>
                    <div className="success-actions">
                        <a href="#" id="startLearningLink" className="btn-dashboard-link" style={{display: "none"}}>Start Learning</a>
                        <Link to="/student-dashboard" className="btn-dashboard-link btn-outline-link">
                            View Dashboard
                        </Link>
                    </div>
                </div>
            </div>
            <LegacyScript srcs={["/legacy/js/app.js"]} />
        </>
    );
}
