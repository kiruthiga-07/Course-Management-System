import { useEffect } from "react";

function PageCss({ href }) {
    useEffect(() => {
        const existing = document.querySelector(`link[data-page-css="${href}"]`);
        if (existing) {
            return;
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.dataset.pageCss = href;
        document.head.appendChild(link);
    }, [href]);

    return null;
}

export default PageCss;
