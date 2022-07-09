import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { FcGoogle } from "react-icons/fc";
function Login() {
    const emailRef = useRef();
    const passRef = useRef();
    const [emailErr, setEmailErr] = useState("");
    const { login, registerWithGoogle, isPending, error } = useLogin();
    function formSubmitHandler(e) {
        e.preventDefault();
        setEmailErr("");
        if (emailRef.current.value.trim() === "") {
            setEmailErr("Email field cannot be empty");
            emailRef.current.focus();
            return;
        }
        login(emailRef.current.value, passRef.current.value);
        emailRef.current.value = "";
        passRef.current.value = "";
    }
    function googleSignupHandler() {
        registerWithGoogle();
    }
    return (
        <div>
            <form
                onSubmit={formSubmitHandler}
                className=" my-12 flex flex-col mx-auto max-w-sm gap-8 px-4 pt-6 pb-16 sm:border sm:rounded sm:shadow"
            >
                <h1 className="text-3xl font-bold text-center">Log in</h1>
                <div className="flex flex-col gap-4">
                    {error && (
                        <p className="p-2 text-red-600 bg-red-200">{error}</p>
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
                    <label className="flex flex-col gap-1">
                        <p className="font-medium">Password: </p>
                        <input
                            className="border p-2 rounded"
                            type="password"
                            placeholder="Enter your password"
                            required
                            ref={passRef}
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-purple-600 p-2 text-white rounded hover:bg-purple-500 disabled:bg-purple-200"
                    disabled={isPending}
                >
                    Log in
                </button>
                <div className="flex items-center gap-2 -my-6">
                    <span className="border-b flex-grow"></span>
                    OR
                    <span className="border-b flex-grow"></span>
                </div>
                <button
                    type="button"
                    onClick={googleSignupHandler}
                    disabled={isPending}
                    className="flex items-center justify-center gap-2 border p-2"
                >
                    <FcGoogle className="w-6 h-6" />
                    <span>Sign in using Google</span>
                </button>
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

export default Login;
