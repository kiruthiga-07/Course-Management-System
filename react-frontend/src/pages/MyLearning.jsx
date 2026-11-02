import { useState } from "react";
import PageCss from "../components/PageCss";
import BodyClass from "../components/BodyClass";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MyCourses from "../components/MyCourses";
import MyLearningProgress from "../components/MyLearningProgress";

export default function MyLearning() {
    const isStudent = sessionStorage.getItem("role") === "student";
    const [version, setVersion] = useState(0);

    return (
        <>
            <PageCss href="/css/app.css" />
            <BodyClass />
            <Navbar variant="student" />
            <main style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
                {isStudent ? (
                    <>
                        <MyLearningProgress key={version} />
                        <MyCourses onChange={() => setVersion((value) => value + 1)} />
                    </>
                ) : (
                    <p>Please log in as a student to see your courses and progress.</p>
                )}
            </main>
            <Footer />
        </>
    );
}