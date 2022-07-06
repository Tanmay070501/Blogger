import { sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
function CreateNotLogin({ user }) {
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState("");
    const clickHandler = () => {
        setError("");
        sendEmailVerification(auth.currentUser)
            .then(() => {
                setDisable(true);
            })
            .catch((err) => {
                setError(err.message);
                setDisable(false);
            });
    };
    return (
        <div className="my-24 text-center">
            {user && !user.emailIsVerified && (
                <div className="flex flex-col justify-center gap-4 text-center">
                    <p className="text-2xl">
                        You need to verify your email first
                    </p>
                    <button
                        onClick={clickHandler}
                        className="bg-purple-600 p-2 text-white self-center disabled:bg-purple-400 max-w-[200px] w-full"
                        disabled={disable}
                    >
                        {disable ? "Sent" : "Send email verificaiton"}
                    </button>
                    <p>Refresh the page after verification</p>
                    {error && (
                        <p className="bg-red-200 text-red-600 p-2 self-center">
                            {error}
                        </p>
                    )}
                </div>
            )}
            {!user && (
                <p className="text-2xl">
                    You need to{" "}
                    <Link className="text-blue-600 underline" to="/login">
                        Log in
                    </Link>{" "}
                    in order to Create a new blog
                </p>
            )}
        </div>
    );
}

export default CreateNotLogin;
