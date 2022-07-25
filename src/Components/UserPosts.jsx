import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    startAfter,
    where,
    increment,
} from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { Link } from "react-router-dom";

function UserPosts({ uid }) {
    const [userBlogs, setUserBlogs] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    console.log(userBlogs);
    const deleteHandler = async (id) => {
        try {
            const ref = doc(db, "blogs", id);
            await deleteDoc(ref);
            setUserBlogs((prev) => prev.filter((item) => item.id !== id));
            const userDocRef = doc(db, "users", uid);
            await setDoc(
                userDocRef,
                { postsCount: increment(-1) },
                { merge: true }
            );
        } catch (err) {
            console.log(err.message);
        }

        //console.log(id);
    };
    useEffect(() => {
        async function fetchData() {
            try {
                // Query the first page of docs
                const first = query(
                    collection(db, "blogs"),
                    where("authorUid", "==", uid),
                    orderBy("createdAt"),
                    limit(8)
                );
                const documentSnapshots = await getDocs(first);
                if (documentSnapshots.size !== 0) {
                    const blogData = documentSnapshots.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id };
                    });
                    setUserBlogs(blogData);
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
    }, [uid]);

    async function fetchMoreData() {
        try {
            // Construct a new query starting at this document,
            const next = query(
                collection(db, "blogs"),
                where("authorUid", "==", uid),
                orderBy("createdAt"),
                startAfter(lastDoc),
                limit(8)
            );
            const documentSnapshots = await getDocs(next);
            if (documentSnapshots.size !== 0) {
                const blogData = documentSnapshots.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                });
                setUserBlogs((prev) => [...prev, ...blogData]);
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
        <div className="my-4 flex flex-col gap-6">
            {userBlogs.map((item) => {
                return (
                    <div key={item.id} className="border-2 flex flex-col pb-4">
                        <Link
                            className="flex flex-wrap gap-4 hover:underline"
                            to={`/blog/${item.id}`}
                        >
                            <div className="w-full h-48 md:h-64">
                                <img
                                    className="w-full h-full object-cover"
                                    src={item.mainImgURL}
                                    alt="main img"
                                />
                            </div>
                            <div className="flex flex-col break-words flex-grow gap-2 p-4">
                                <h4 className="break-words font-bold text-2xl">
                                    {item.title}
                                </h4>
                                <p>{item.desc}</p>
                            </div>
                        </Link>
                        {auth.currentUser?.uid === uid && (
                            <button
                                onClick={() => deleteHandler(item.id)}
                                className="p-2 rounded bg-red-600 text-white self-center"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                );
            })}
            {lastDoc && (
                <button
                    onClick={fetchMoreData}
                    className="bg-purple-600 p-2 rounded self-center text-white"
                >
                    Load more
                </button>
            )}
            {!lastDoc && <p className="text-center">No more posts...</p>}
        </div>
    );
}

export default UserPosts;
