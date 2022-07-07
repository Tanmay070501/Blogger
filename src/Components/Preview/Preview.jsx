import parse from "html-react-parser";
import React from "react";
import styles from "./Preview.module.scss";
function Preview({ htmlString, metaData }) {
    return (
        <div className="my-28">
            <h1 className="border-b border-black mb-12 font-bold text-3xl">
                Preview
            </h1>

            <div>
                {metaData.title && (
                    <h1 className="mb-4 text-7xl font-bold">
                        {metaData.title}
                    </h1>
                )}
                {metaData.image && (
                    <img
                        className={styles.mainImg}
                        src={metaData.image}
                        alt="MainImg"
                    />
                )}
                {metaData.desc && (
                    <div className="py-6 border-b mb-12">
                        <h6 className="italic font-bold">Description : </h6>
                        <p className=" mt-2">{metaData.desc}</p>
                    </div>
                )}
                <div className={styles.preview}>{parse(htmlString)}</div>
            </div>
        </div>
    );
}

export default Preview;
