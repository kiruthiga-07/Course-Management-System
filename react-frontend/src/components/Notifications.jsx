import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { createSocket } from "../api/socketClient";

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        let active = true;

        apiClient
            .get("/notifications")
            .then((response) => {
                if (active) {
                    setNotifications(response.data.notifications);
                }
            })
            .catch(console.error);

        const socket = createSocket();

        socket.on("new_notification", (notification) => {
            setNotifications((previous) => [notification, ...previous]);
        });

        socket.connect();

        return () => {
            active = false;
            socket.disconnect();
        };
    }, []);

    async function markRead(id) {
        await apiClient.patch(`/notifications/${id}/read`);

        setNotifications((previous) =>
            previous.map((item) =>
                item._id === id ? { ...item, isRead: true } : item
            )
        );
    }

    const unread = notifications.filter((item) => !item.isRead).length;

    return (
        <section className="msg-panel note-panel">
            <div className="msg-panel-head">
                <h2>Notifications</h2>
                {unread > 0 && <span className="msg-badge">{unread} new</span>}
            </div>

            <div className="note-list">
                {notifications.length === 0 && (
                    <p className="msg-empty">No notifications yet.</p>
                )}

                {notifications.map((item) => (
                    <div
                        key={item._id}
                        className={item.isRead ? "note-item" : "note-item unread"}
                    >
                        <span className="note-dot" />
                        <div className="note-body">
                            <p>{item.message}</p>
                            <small>{new Date(item.createdAt).toLocaleString()}</small>
                        </div>

                        {!item.isRead && (
                            <button
                                className="msg-btn ghost small"
                                onClick={() => markRead(item._id)}
                            >
                                Mark read
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Notifications;