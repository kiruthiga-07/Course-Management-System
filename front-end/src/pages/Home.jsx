import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <>
            <PageCss href="/css/app.css" />
            <Navbar variant="home" />
            <header className="hero">
                <div className="hero-text">
                    <h1>Elevate Your Academic Journey</h1>
                    <p>A comprehensive student course management platform. Enroll in programs, monitor your learning progress, and achieve your goals.</p>
                    <div className="hero-btns" style={{marginTop: "20px"}}>
                        <Link to="/student-login" className="btn btn-secondary">
                            Access Student Portal
                        </Link>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" alt="Student Progress Graphic" />
                </div>
            </header>
            <section className="stats">
                <div className="stat-card">
                    <h2>1,000+</h2>
                    <p>Active Students</p>
                </div>
                <div className="stat-card">
                    <h2>150+</h2>
                    <p>Certified Courses</p>
                </div>
                <div className="stat-card">
                    <h2>50+</h2>
                    <p>Expert Instructors</p>
                </div>
                <div className="stat-card">
                    <h2>95%</h2>
                    <p>Success Rate</p>
                </div>
            </section>
            <section className="courses">
                <div className="section-header">
                    <h2 className="section-title">Popular Programs</h2>
                    <p className="section-subtitle">Discover our most highly-rated curriculum paths designed for modern professionals.</p>
                </div>
                <div className="course-grid">
                    <div className="course-card">
                        <h3>Python Programming</h3>
                        <p>Master Python from fundamental scripts to advanced enterprise applications.</p>
                    </div>
                    <div className="course-card">
                        <h3>Full Stack Development</h3>
                        <p>Comprehensive training in HTML, CSS, JavaScript, React & Node.js architectures.</p>
                    </div>
                    <div className="course-card">
                        <h3>Artificial Intelligence</h3>
                        <p>Introduction to machine learning models, neural networks, and smart systems.</p>
                    </div>
                    <div className="course-card">
                        <h3>Cyber Security</h3>
                        <p>Learn network defense, cryptography, and enterprise application security protocols.</p>
                    </div>
                </div>
            </section>
            <section className="features">
                <div className="section-header">
                    <h2 className="section-title">Platform Capabilities</h2>
                    <p className="section-subtitle">Everything you need to manage your education efficiently.</p>
                </div>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <line x1="19" y1="8" x2="19" y2="14"></line>
                                <line x1="22" y1="11" x2="16" y2="11"></line>
                            </svg>
                        </div>
                        <h3>Streamlined Enrollment</h3>
                        <p>Register and integrate into active courses with a frictionless onboarding process.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="20" x2="18" y2="10"></line>
                                <line x1="12" y1="20" x2="12" y2="4"></line>
                                <line x1="6" y1="20" x2="6" y2="14"></line>
                            </svg>
                        </div>
                        <h3>Progress Analytics</h3>
                        <p>Monitor your course completion status with real-time data dashboards.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="8" r="7"></circle>
                                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                            </svg>
                        </div>
                        <h3>Verified Certifications</h3>
                        <p>Earn industry-recognized certificates upon successful course completion.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                        </div>
                        <h3>Industry Faculty</h3>
                        <p>Receive instruction and mentorship from experienced corporate professionals.</p>
                    </div>
                </div>
            </section>
            <section className="testimonials">
                <div className="section-header">
                    <h2 className="section-title">Student Success Stories</h2>
                    <p className="section-subtitle">Hear from our community of learners who have transformed their careers.</p>
                </div>
                <div className="testimonial-grid">
                    <div className="testimonial-card">
                        <p className="review-text">"EduTrack's progress analytics kept me accountable. The Full Stack curriculum was exactly what I needed to transition into my new role as a Junior Developer."</p>
                        <div className="reviewer">
                            <div className="reviewer-avatar">
                                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=James-Smith&backgroundColor=e3ece7" alt="James Smith" />
                            </div>
                            <div className="reviewer-info">
                                <h4>James Smith</h4>
                                <p>Software Engineer</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <p className="review-text">"The frictionless enrollment and expert faculty made learning Cyber Security a breeze. I earned my certification and immediately secured a promotion."</p>
                        <div className="reviewer">
                            <div className="reviewer-avatar">
                                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Anita-Lopez&backgroundColor=f0e6d6" alt="Anita Lopez" />
                            </div>
                            <div className="reviewer-info">
                                <h4>Anita Lopez</h4>
                                <p>Security Analyst</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <p className="review-text">"A truly professional platform. The dashboard is clean, the courses are well-structured, and having all my learning materials in one place saved me hours."</p>
                        <div className="reviewer">
                            <div className="reviewer-avatar">
                                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=David-Kim&backgroundColor=e3ece7" alt="David Kim" />
                            </div>
                            <div className="reviewer-info">
                                <h4>David Kim</h4>
                                <p>Data Scientist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="cta">
                <div className="cta-content">
                    <h2>Ready to advance your career?</h2>
                    <p>Join thousands of professionals and students currently upgrading their skill sets.</p>
                    <Link to="/student-register" className="btn btn-cta">
                        Create Your Account
                    </Link>
                </div>
            </section>
            <Footer />
            <LegacyScript srcs={["/legacy/js/app.js"]} />
        </>
    );
}
