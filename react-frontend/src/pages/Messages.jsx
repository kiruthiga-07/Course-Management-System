import PageCss from "../components/PageCss";
import BodyClass from "../components/BodyClass";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chat from "../components/Chat";
import Notifications from "../components/Notifications";

export default function Messages() {
    const loggedIn = !!sessionStorage.getItem("token");

    return (
        <>
            <PageCss href="/css/app.css" />
            <BodyClass />
            <Navbar variant="student" />
            <main style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
                {loggedIn ? (
                    <>
                        <Notifications />
                        <Chat />
                    </>
                ) : (
                    <p>Please log in to use chat and notifications.</p>
                )}
            </main>
            <Footer />
        </>
    );
}