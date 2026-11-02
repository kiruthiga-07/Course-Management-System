import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function MyCourses({ onChange }) {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchMyCourses() {
            try {
                const response = await apiClient.get("/enrollments/my-courses");
                setEnrollments(response.data.enrollments);
            } catch (err) {
                setError("Unable to load enrolled courses");
            } finally {
                setLoading(false);
            }
        }

        fetchMyCourses();
    }, []);

    const handleUnenroll = async (courseId) => {
        const confirmed = window.confirm(
            "Are you sure you want to unenroll from this course?"
        );

        if (!confirmed) return;

        try {
            await apiClient.delete(`/enrollments/${courseId}`);

            setEnrollments((previous) =>
                previous.filter((enrollment) => enrollment.course?._id !== courseId)
            );

            alert("Successfully unenrolled from the course!");

            if (onChange) {
                onChange();
            }
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Unable to unenroll from this course"
            );
        }
    };

    if (loading) {
        return <p>Loading enrolled courses...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>My Enrolled Courses</h2>

            {enrollments.length === 0 ? (
                <p>You haven't enrolled in any courses yet.</p>
            ) : (
                <div>
                    {enrollments.map((enrollment) => (
                        <div key={enrollment._id}>
                            <h3>{enrollment.course?.title || "Course unavailable"}</h3>

                            <p>Status: {enrollment.status}</p>

                            <p>
                                Enrolled on:{" "}
                                {new Date(enrollment.enrolledAt).toLocaleDateString()}
                            </p>

                            <button
                                onClick={() => handleUnenroll(enrollment.course._id)}
                                disabled={!enrollment.course}
                            >
                                Unenroll
                            </button>

                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyCourses;