import { doc, getDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import parse from "html-react-parser";
import "highlight.js/styles/atom-one-dark.css";
import "./Blog.scss";
function Blog() {
    const [response, setResponse] = useState(false);
    console.log(response);
    const params = useParams();
    const navigate = useNavigate();
    const fetchBlog = useCallback(async () => {
        const docRef = doc(db, "blogs", params.blogID);
        const data = await getDoc(docRef);
        if (data.data()) {
            setResponse(data.data());
        } else {
            navigate("/", {
                replace: true,
            });
        }
    }, [params.blogID, navigate]);
    useEffect(() => {
        fetchBlog();
    }, [fetchBlog]);
    return (
        <div className="special-container my-24">
            {response.title && (
                <h1 className="font-bold text-7xl mb-4">{response.title}</h1>
            )}
            {response.mainImgURL && (
                <img
                    className="mainImg"
                    src={response.mainImgURL}
                    alt="mainImg"
                />
            )}
            {response.desc && (
                <div className="py-6 border-b mb-12">
                    <h6 className="italic font-bold">Description : </h6>
                    <p className=" mt-2">{response.desc}</p>
                </div>
            )}
            {response.content && (
                <div className="content">{parse(response.content)}</div>
            )}
        </div>
    );
}

export default Blog;
