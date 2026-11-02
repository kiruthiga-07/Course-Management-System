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

    return (
        <section>
            <h2>Student Chat</h2>

            <p>Connection: {connected ? "Online" : "Offline"}</p>

            {error && <p role="alert">{error}</p>}

            <form onSubmit={sendMessage}>
                <select
                    value={recipientId}
                    onChange={(e) => selectRecipient(e.target.value)}
                    required
                >
                    <option value="">Choose who to message</option>
                    {contacts.map((contact) => (
                        <option key={contact.id} value={contact.id}>
                            {contact.name} ({contact.role})
                        </option>
                    ))}
                </select>

                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    maxLength={2000}
                    required
                />

                <button type="submit" disabled={!connected || !recipientId}>
                    Send
                </button>

                <button
                    type="button"
                    onClick={() => loadHistory(recipientId)}
                    disabled={!recipientId}
                >
                    Load Chat History
                </button>
            </form>

            <h3>Messages</h3>

            {messages.length === 0 && <p>No messages yet.</p>}

            {messages.map((item) => (
                <p key={item._id}>
                    <strong>{nameOf(item.sender)}:</strong> {item.text}
                </p>
            ))}
        </section>
    );
}

export default Chat;