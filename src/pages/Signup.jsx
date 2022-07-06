import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useSignUp from "../hooks/useSignUp";
function Signup() {
    const emailRef = useRef();
    const passRef = useRef();
    const { register, registerWithGoogle } = useSignUp();
    function formSubmitHandler(e) {
        e.preventDefault();
        register(emailRef.current.value, passRef.current.value);
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
                <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                <div className="flex flex-col gap-6">
                    <input
                        className="border p-2 rounded"
                        type="text"
                        placeholder="Enter your email"
                        ref={emailRef}
                        required
                    />
                    <input
                        className="border p-2 rounded"
                        type="password"
                        placeholder="Enter your password"
                        required
                        ref={passRef}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-purple-600 p-2 text-white rounded hover:bg-purple-500 disabled:bg-purple-200"
                >
                    Sign Up
                </button>
                <div className="flex items-center gap-2 -my-6">
                    <span className="border-b flex-grow"></span>
                    OR
                    <span className="border-b flex-grow"></span>
                </div>
                <button
                    type="button"
                    onClick={googleSignupHandler}
                    className="flex items-center justify-center gap-2 border p-2"
                >
                    <FcGoogle className="w-6 h-6" />
                    <span>Sign in with Google</span>
                </button>
                <p className="text-center -my-2">
                    Already a user?{" "}
                    <Link className="underline text-blue-600" to="/login">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
