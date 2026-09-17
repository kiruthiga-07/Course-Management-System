import { useEffect, useRef } from "react";

/*
 * Bridges the existing EduTrack vanilla-JS files into the React DOM.
 *
 * `srcs` is an ordered list of script URLs. They are loaded one at a
 * time, in order (matching the original <script> tag order in each
 * .html file), and only after the LAST one finishes do we dispatch
 * DOMContentLoaded / load — the events the legacy scripts listen for
 * before touching the page's DOM.
 *
 * A single `src` prop is also accepted for convenience.
 */
function LegacyScript({ src, srcs, module = false }) {
    const started = useRef(false);

    useEffect(() => {
        // React StrictMode runs effects twice in development; make sure
        // the legacy scripts for this page only ever run once per mount.
        if (started.current) {
            return;
        }
        started.current = true;

        const list = srcs && srcs.length ? srcs : src ? [src] : [];
        const loaded = [];

        function loadNext(index) {
            if (index >= list.length) {
                document.dispatchEvent(new Event("DOMContentLoaded"));
                window.dispatchEvent(new Event("load"));
                return;
            }
            const url = list[index];
            const script = document.createElement("script");
            script.src = url;
            script.type = module ? "module" : "text/javascript";
            script.async = false;
            script.onload = function () {
                loadNext(index + 1);
            };
            script.onerror = function (error) {
                console.error("Unable to load legacy script:", url, error);
                loadNext(index + 1);
            };
            document.body.appendChild(script);
            loaded.push(script);
        }

        loadNext(0);

        // Intentionally not removing the scripts on cleanup: they attach
        // window/document-level listeners the legacy code expects to
        // persist, and StrictMode's mount/unmount/remount cycle is guarded
        // against above via `started`.
    }, []);

    return null;
}

export default LegacyScript;
