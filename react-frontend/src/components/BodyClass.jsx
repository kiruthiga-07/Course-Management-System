import { useEffect } from "react";

function BodyClass({ name = "" }) {
    useEffect(() => {
        document.body.className = name;
        return () => {
            document.body.className = "";
        };
    }, [name]);

    return null;
}

export default BodyClass;
