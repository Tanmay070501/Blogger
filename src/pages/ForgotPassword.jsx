import { sendPasswordResetEmail } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";

function ForgotPassword() {
    const emailRef = useRef();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [emailErr, setEmailErr] = useState("");
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setIsPending(true);
        setEmailErr("");
        setSuccess("");
        setError("");
        if (emailRef.current.value.trim() === "") {
            setEmailErr("Email field cannot be empty");
            emailRef.current.focus();
            return;
        }
        try {
            await sendPasswordResetEmail(auth, emailRef.current.value);
            setSuccess("Reset Password link sent to your email");
        } catch (err) {
            setError(err.message);
        }
        setIsPending(false);
        emailRef.current.value = "";
    };
    return (
        <div>
            <form
                onSubmit={formSubmitHandler}
                className=" my-12 flex flex-col mx-auto max-w-sm gap-8 px-4 pt-6 pb-16 sm:border sm:rounded sm:shadow"
            >
                <h1 className="text-3xl font-bold text-center">
                    Forgot Password
                </h1>
                <div className="flex flex-col gap-4">
                    {error && (
                        <p className="p-2 text-red-600 bg-red-200">{error}</p>
                    )}
                    {success && (
                        <p className="p-2 text-teal-600 bg-teal-200">
                            {success}
                        </p>
                    )}
                    <label className="flex flex-col gap-1">
                        <p className="font-medium">
                            Email:{" "}
                            {emailErr && (
                                <span className="text-red-600">
                                    ({emailErr})
                                </span>
                            )}
                        </p>
                        <input
                            className="border p-2 rounded"
                            type="email"
                            placeholder="Enter your email"
                            ref={emailRef}
                            required
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-purple-600 p-2 text-white rounded hover:bg-purple-500 disabled:bg-purple-200"
                    disabled={isPending}
                >
                    Submit
                </button>
                <div className="flex items-center gap-2 -my-6">
                    <span className="border-b flex-grow"></span>
                    OR
                    <span className="border-b flex-grow"></span>
                </div>
                <Link
                    to={"/login"}
                    type="button"
                    className="flex items-center justify-center gap-2 border p-2"
                >
                    <span>Sign in</span>
                </Link>
                <p className="text-center -my-2">
                    New user?{" "}
                    <Link
                        className="hover:underline text-blue-600"
                        to="/signup"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default ForgotPassword;
