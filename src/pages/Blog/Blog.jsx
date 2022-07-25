import { doc, getDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
                    className="mainImg border"
                    src={response.mainImgURL}
                    alt="mainImg"
                />
            )}
            {response.author && (
                <div className="py-4 flex justify-between items-center">
                    <p>
                        Author:{" "}
                        <Link
                            className="font-bold hover:underline"
                            to={`/user/${response.authorUid}`}
                        >
                            {response.author}
                        </Link>
                    </p>
                    <p>
                        Published at:{" "}
                        <span className="font-bold">
                            {response.createdAt.toDate().toDateString()}
                        </span>
                    </p>
                </div>
            )}

            {response.desc && (
                <div className="py-4 border-y mb-12">
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
