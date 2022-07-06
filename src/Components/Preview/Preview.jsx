import parse from "html-react-parser";
import React from "react";
import styles from "./Preview.module.scss";
function Preview({ htmlString }) {
    return (
        <div className="my-28">
            <h1 className="border-b mb-12 font-bold text-3xl">Preview</h1>
            <div className={styles.preview}>{parse(htmlString)}</div>
        </div>
    );
}

export default Preview;
