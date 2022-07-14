import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useNavigate, useParams } from "react-router-dom";
import UserPosts from "../Components/UserPosts";

function User() {
    const [response, setResponse] = useState(false);
    const [postCount, setPostCount] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    const fetchUser = useCallback(async () => {
        const docRef = doc(db, "users", params.userID);
        const data = await getDoc(docRef);
        if (data.data()) {
            setResponse(data.data());
            onSnapshot(docRef, (snapshot) => {
                setPostCount(snapshot.data().postsCount);
            });
        } else {
            navigate("/", {
                replace: true,
            });
        }
    }, [params.userID, navigate]);
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    return (
        <Fragment>
            {response && (
                <div className="special-container my-24 text-lg sm:text-xl">
                    <div>
                        <div className="flex flex-col items-center justify-center sm:flex-row gap-12">
                            <div className="h-44 w-44 rounded-full overflow-hidden">
                                <img
                                    className="h-full w-full object-cover object-center"
                                    src={response.photoURL}
                                    alt="user img"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                            <div className="flex flex-col justify-center gap-2">
                                <h3 className="font-bold">
                                    Username:{" "}
                                    <span className="font-normal">
                                        {response.displayName}
                                    </span>
                                </h3>
                                <p>
                                    <span className="font-bold">Email: </span>
                                    <a
                                        className="hover:underline underline-offset-2"
                                        href={`mailto:${response.email}`}
                                    >
                                        {response.email}
                                    </a>
                                </p>
                                <p>
                                    <span>No. of Posts: </span>
                                    {postCount}
                                </p>
                            </div>
                        </div>
                        <div className="my-8">
                            <h2>POSTS:</h2>
                            <UserPosts uid={params.userID} />
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default User;
