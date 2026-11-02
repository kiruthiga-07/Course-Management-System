import { useEffect, useRef, useState } from "react";
import apiClient from "../api/apiClient";
import { createSocket } from "../api/socketClient";

function readMyId() {
    try {
        const payload = sessionStorage.getItem("token").split(".")[1];
        const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(json).sub;
    } catch (err) {
        return null;
    }
}

function Chat() {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [recipientId, setRecipientId] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");
    const recipientRef = useRef("");
    const myId = readMyId();

    useEffect(() => {
        recipientRef.current = recipientId;
    }, [recipientId]);

    useEffect(() => {
        apiClient
            .get("/messages/contacts/list")
            .then((response) => setContacts(response.data.contacts || []))
            .catch(() => setError("Unable to load contacts"));
    }, []);

    useEffect(() => {
        const client = createSocket();

        client.on("connect", () => {
            setConnected(true);
            setError("");
        });

        client.on("disconnect", () => {
            setConnected(false);
        });

        client.on("connect_error", (err) => {
            setConnected(false);
            setError(err.message);
        });

        client.on("receive_message", (data) => {
            const other = data.sender === myId ? data.recipient : data.sender;

            if (other !== recipientRef.current) return;

            setMessages((previous) =>
                previous.some((item) => item._id === data._id)
                    ? previous
                    : [...previous, data]
            );
        });

        client.connect();
        setSocket(client);

        return () => {
            client.disconnect();
        };
    }, [myId]);

    async function loadHistory(id) {
        if (!id) {
            setMessages([]);
            return;
        }

        try {
            const response = await apiClient.get(`/messages/${id}`);
            setMessages(response.data.messages);
        } catch (err) {
            setError("Unable to load message history");
        }
    }

    function selectRecipient(id) {
        setRecipientId(id);
        setError("");
        loadHistory(id);
    }

    function sendMessage(event) {
        event.preventDefault();

        if (!socket || !connected || !recipientId) return;

        socket.emit(
            "send_message",
            {
                recipientId,
                text: message
            },
            (result) => {
                if (result && result.success) {
                    setMessage("");
                } else {
                    setError((result && result.message) || "Message failed");
                }
            }
        );
    }

    const nameOf = (id) => {
        if (id === myId) return "You";
        const contact = contacts.find((item) => item.id === id);
        return contact ? contact.name : "User";
    };

    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);

    const timeOf = (value) =>
        value
            ? new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "";

    return (
        <section className="msg-panel chat-panel">
            <div className="msg-panel-head">
                <h2>Student Chat</h2>
                <span className={connected ? "msg-pill online" : "msg-pill offline"}>
                    <span className="msg-dot" />
                    {connected ? "Online" : "Offline"}
                </span>
            </div>

            {error && (
                <p className="msg-error" role="alert">
                    {error}
                </p>
            )}

            <div className="chat-contact">
                <select
                    value={recipientId}
                    onChange={(e) => selectRecipient(e.target.value)}
                >
                    <option value="">Choose who to message</option>
                    {contacts.map((contact) => (
                        <option key={contact.id} value={contact.id}>
                            {contact.name} ({contact.role})
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    className="msg-btn ghost"
                    onClick={() => loadHistory(recipientId)}
                    disabled={!recipientId}
                >
                    Load history
                </button>
            </div>

            <div className="chat-list" ref={listRef}>
                {!recipientId && (
                    <p className="msg-empty">Choose someone above to start chatting.</p>
                )}

                {recipientId && messages.length === 0 && (
                    <p className="msg-empty">No messages yet. Say hello!</p>
                )}

                {messages.map((item) => {
                    const mine = item.sender === myId;
                    return (
                        <div key={item._id} className={mine ? "bubble-row mine" : "bubble-row"}>
                            <div className={mine ? "bubble mine" : "bubble"}>
                                {!mine && <span className="bubble-name">{nameOf(item.sender)}</span>}
                                <span className="bubble-text">{item.text}</span>
                                <span className="bubble-time">{timeOf(item.createdAt)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <form className="chat-form" onSubmit={sendMessage}>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={recipientId ? "Type a message" : "Choose a person first"}
                    maxLength={2000}
                    disabled={!recipientId}
                    required
                />

                <button
                    type="submit"
                    className="msg-btn"
                    disabled={!connected || !recipientId}
                >
                    Send
                </button>
            </form>
        </section>
    );
}

export default Chat;