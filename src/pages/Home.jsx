import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BlogCard from "../Components/BlogCard";
import { db } from "../firebase/config";

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    console.log(blogs);
    useEffect(() => {
        async function fetchData() {
            try {
                // Query the first page of docs
                const first = query(
                    collection(db, "blogs"),
                    orderBy("createdAt"),
                    limit(8)
                );
                const documentSnapshots = await getDocs(first);
                if (documentSnapshots.size !== 0) {
                    const blogData = documentSnapshots.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id };
                    });
                    setBlogs(blogData);
                    // Get the last visible document
                    const lastVisible =
                        documentSnapshots.docs[
                            documentSnapshots.docs.length - 1
                        ];
                    //console.log("last", lastVisible);
                    setLastDoc(lastVisible);
                }
            } catch (err) {
                console.log(err.message);
            }
        }

        fetchData();
    }, []);

    async function fetchMoreData() {
        try {
            // Construct a new query starting at this document,
            const next = query(
                collection(db, "blogs"),
                orderBy("createdAt"),
                startAfter(lastDoc),
                limit(8)
            );
            const documentSnapshots = await getDocs(next);
            if (documentSnapshots.size !== 0) {
                const blogData = documentSnapshots.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                });
                setBlogs((prev) => [...prev, ...blogData]);
                // Get the last visible document
                const lastVisible =
                    documentSnapshots.docs[documentSnapshots.docs.length - 1];
                //console.log("last", lastVisible);
                setLastDoc(lastVisible);
            } else {
                setLastDoc(null);
            }
        } catch (err) {
            console.log(err.emssage);
        }
    }
    return (
        <div className="special-container my-24 flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {blogs.map((data) => {
                    return <BlogCard key={data.id} data={data} />;
                })}
            </div>
            {lastDoc && (
                <button
                    className="bg-purple-600 p-2 text-white rounded my-4"
                    onClick={() => fetchMoreData()}
                >
                    load more
                </button>
            )}
        </div>
    );
}

export default Home;
