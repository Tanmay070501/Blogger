import { doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
function Blog() {
    const [response, setResponse] = useState(false);
    const params = useParams();

    return <div>Blog {params.blogID}</div>;
}

export default Blog;
