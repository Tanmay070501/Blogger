import parse from "html-react-parser";
import React from "react";
import styles from "./Preview.module.scss";
function Preview({ htmlString, metaData }) {
    return (
        <div className="my-28">
            <h1 className="border-b border-black mb-12 font-bold text-3xl">
                Preview
            </h1>

            <div className={styles.preview}>
                {metaData.title && <h1 className="mb-4">{metaData.title}</h1>}
                {metaData.image && (
                    <img
                        className={styles.mainImg}
                        src={metaData.image}
                        alt="MainImg"
                    />
                )}
                {metaData.desc && (
                    <div className="py-2 border-y">
                        <h6 className="italic">Description : </h6>
                        <p className=" mt-4">{metaData.desc}</p>
                    </div>
                )}
                <div>{parse(htmlString)}</div>
            </div>
        </div>
    );
}

export default Preview;
