import { Link } from "react-router-dom";

/*
 * Mirrors the course-card markup that EduTrack.pages['courses'] in app.js
 * currently builds via innerHTML (see courseCardHTML() in app.js), so the
 * same classNames keep matching app.css.
 *
 * NOTE: the live Courses page still renders cards through app.js, because
 * that's where the real course data (admin-added/edited courses, search
 * filtering, localStorage-backed CRUD) lives — swapping it for a hardcoded
 * static list here would silently drop that functionality. This component
 * exists as the reusable building block for when course rendering is
 * ported into React state (e.g. once course data is fetched via a
 * services/ layer instead of read directly by app.js).
 */
function CourseCard({ course }) {
    const { id, badge, duration, title, description, instructor, mode, certificate, field } = course;

    return (
        <div className="course-card" data-course-id={id}>
            <div className="course-card-top">
                <span className="course-badge">{badge}</span>
                <span className="course-duration">{duration}</span>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <ul className="course-meta">
                <li>Instructor: {instructor}</li>
                <li>Mode: {mode}</li>
                <li>Certificate: {certificate}</li>
            </ul>
            <div className="course-card-actions">
                <Link
                    to={`/stu-login-enroll?course=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}&field=${encodeURIComponent(field)}`}
                    className="btn btn-primary btn-enroll"
                >
                    Enroll
                </Link>
                <Link to="/admin-schema-login" className="btn btn-edit">
                    Edit Schema
                </Link>
            </div>
        </div>
    );
}

export default CourseCard;
