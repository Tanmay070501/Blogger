import React from "react";
import { Link } from "react-router-dom";
function BlogCard({ data }) {
    return (
        <Link
            className="inline-block w-full h-64 sm:h-96 blog-card relative"
            to={`/blog/${data.id}`}
        >
            <img
                className="object-contain"
                src={data.mainImgURL}
                alt="blog img"
            />
            <div className="absolute p-4 flex flex-col justify-between top-0 left-0 w-full h-full bg-black/25 hover:bg-black/50 text-white">
                <h1 className="text-4xl">{data.title}</h1>
                <p className="text-xl mb-4">{data.desc}</p>
            </div>
        </Link>
    );
}

export default BlogCard;
