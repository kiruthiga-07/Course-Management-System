import { createContext, useContext, useEffect, useState } from "react";

/*
 * EduTrack's real session state already lives in localStorage, written by
 * the legacy js/api.js and js/auth.js files:
 *   - "edutrack_current_student"  -> the logged-in student record (JSON)
 *   - "isAdminVerified"           -> "true" once an admin has logged in
 *
 * This context does NOT introduce a second, parallel auth system — it just
 * mirrors those same keys into React state, refreshed on every route change,
 * so new React components (nav highlighting, route guards, etc.) can read
 * session state without duplicating or conflicting with the legacy logic.
 * Logging in/out is still done by the existing js/auth.js code.
 */
const STUDENT_KEY = "edutrack_current_student";
const ADMIN_KEY = "isAdminVerified";

const AuthContext = createContext(null);

function readStudent() {
    const raw = localStorage.getItem(STUDENT_KEY);
    if (!raw) {
        return null;
    }
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function readAdmin() {
    return localStorage.getItem(ADMIN_KEY) === "true";
}

export function AuthProvider({ children }) {
    const [loggedInStudent, setLoggedInStudent] = useState(readStudent);
    const [isAdminVerified, setIsAdminVerified] = useState(readAdmin);

    function refresh() {
        setLoggedInStudent(readStudent());
        setIsAdminVerified(readAdmin());
    }

    useEffect(() => {
        window.addEventListener("storage", refresh);
        window.addEventListener("load", refresh);
        document.addEventListener("DOMContentLoaded", refresh);
        return () => {
            window.removeEventListener("storage", refresh);
            window.removeEventListener("load", refresh);
            document.removeEventListener("DOMContentLoaded", refresh);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ loggedInStudent, isAdminVerified, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
