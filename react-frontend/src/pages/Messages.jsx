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
            <header className="msg-hero">
                <h1>Messages</h1>
                <p>Chat with other students and get live notifications.</p>
            </header>
            <main className="msg-page">
                {loggedIn ? (
                    <>
                        <Notifications />
                        <Chat />
                    </>
                ) : (
                    <p className="msg-empty">Please log in to use chat and notifications.</p>
                )}
            </main>
            <Footer />
        </>
    );
}