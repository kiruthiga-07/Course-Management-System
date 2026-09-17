import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Courses() {
    return (
        <>
            <PageCss href="/css/app.css" />
            <Navbar variant="courses" />
            <header className="page-hero">
                <div className="page-hero-content">
                    <h1>Explore Our Programs</h1>
                    <p>Browse certified courses across every major discipline and find the right path for your career.</p>
                </div>
            </header>
            <div className="field-nav">
                <a href="#ai" className="field-nav-link">Artificial Intelligence</a>
                <a href="#ml" className="field-nav-link">Machine Learning</a>
                <a href="#data-science" className="field-nav-link">Data Science</a>
                <a href="#cyber-security" className="field-nav-link">Cyber Security</a>
                <a href="#web-dev" className="field-nav-link">Web Development</a>
                <a href="#cloud" className="field-nav-link">Cloud Computing</a>
            </div>
            <div className="courses-search-wrap">
                <div className="courses-search-bar">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="7"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" id="courseSearchInput" placeholder="Search courses by title, instructor, or keyword..." />
                </div>
                <p id="noSearchResults" style={{display: "none", textAlign: "center", color: "var(--text-muted)", marginTop: "18px"}}>No courses match your search. Try a different keyword.</p>
            </div>
            {/* ===================== ARTIFICIAL INTELLIGENCE ===================== */}
            <section className="course-field" id="ai">
                <div className="section-header">
                    <h2 className="section-title">Artificial Intelligence</h2>
                    <p className="section-subtitle">Design intelligent systems that reason, learn, and adapt.</p>
                </div>
                <div className="course-grid" data-field="ai"></div>
            </section>
            {/* ===================== MACHINE LEARNING ===================== */}
            <section className="course-field course-field-alt" id="ml">
                <div className="section-header">
                    <h2 className="section-title">Machine Learning</h2>
                    <p className="section-subtitle">Turn data into predictions with statistical and algorithmic models.</p>
                </div>
                <div className="course-grid" data-field="ml"></div>
            </section>
            {/* ===================== DATA SCIENCE ===================== */}
            <section className="course-field" id="data-science">
                <div className="section-header">
                    <h2 className="section-title">Data Science</h2>
                    <p className="section-subtitle">Extract insights from raw data using statistics and visualization.</p>
                </div>
                <div className="course-grid" data-field="data-science"></div>
            </section>
            {/* ===================== CYBER SECURITY ===================== */}
            <section className="course-field course-field-alt" id="cyber-security">
                <div className="section-header">
                    <h2 className="section-title">Cyber Security</h2>
                    <p className="section-subtitle">Defend systems, networks, and data against modern threats.</p>
                </div>
                <div className="course-grid" data-field="cyber-security"></div>
            </section>
            {/* ===================== WEB DEVELOPMENT ===================== */}
            <section className="course-field" id="web-dev">
                <div className="section-header">
                    <h2 className="section-title">Web Development</h2>
                    <p className="section-subtitle">Build modern, responsive web applications end to end.</p>
                </div>
                <div className="course-grid" data-field="web-dev"></div>
            </section>
            {/* ===================== CLOUD COMPUTING ===================== */}
            <section className="course-field course-field-alt" id="cloud">
                <div className="section-header">
                    <h2 className="section-title">Cloud Computing</h2>
                    <p className="section-subtitle">Design, deploy, and scale infrastructure on modern cloud platforms.</p>
                </div>
                <div className="course-grid" data-field="cloud"></div>
            </section>
            <Footer />
            <LegacyScript srcs={["/legacy/js/app.js"]} />
        </>
    );
}
