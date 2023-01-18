import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useSignUp from "../hooks/useSignUp";
function Signup() {
    const emailRef = useRef();
    const passRef = useRef();
    const usernameRef = useRef();
    const profileImgRef = useRef();
    const [emailErr, setEmailErr] = useState("");
    const [usernameErr, setUsernameErr] = useState("");
    const [profileImgErr, setProfileImgErr] = useState("");
    const { register, registerWithGoogle, error, isPending } = useSignUp();
    function formSubmitHandler(e) {
        e.preventDefault();
        setEmailErr("");
        setUsernameErr("");
        setProfileImgErr("");
        if (emailRef.current.value.trim() === "") {
            emailRef.current.focus();
            setEmailErr("Email field cannot be empty");
            return;
        }
        if (usernameRef.current.value.trim() === "") {
            usernameRef.current.focus();
            setUsernameErr("Username field cannot be empty");
            return;
        }
        if (!profileImgRef.current.files[0]) {
            profileImgRef.current.focus();
            setProfileImgErr("Select a profile image");
            return;
        }
        register(
            emailRef.current.value,
            passRef.current.value,
            usernameRef.current.value,
            profileImgRef.current.files[0]
        );
        emailRef.current.value = "";
        usernameRef.current.value = "";
        passRef.current.value = "";
        profileImgRef.current.value = "";
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
                <div className="flex flex-col gap-4">
                    {error && (
                        <p className="p-2 text-red-600 bg-red-200">{error}</p>
                    )}
                    <label className="flex flex-col gap-1">
                        <p className="font-medium">
                            Email:{" "}
                            {emailErr && (
                                <span className="text-red-600">{emailErr}</span>
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
                        <p className="font-medium">Password : </p>
                        <input
                            className="border p-2 rounded"
                            type="password"
                            placeholder="Enter your password"
                            required
                            ref={passRef}
                        />
                    </label>
                    <label className="flex flex-col gap-1">
                        <p className="font-medium">
                            Username :{" "}
                            {usernameErr && (
                                <span className="text-red-600">
                                    {usernameErr}
                                </span>
                            )}
                        </p>
                        <input
                            className="border p-2 rounded"
                            type="text"
                            placeholder="Enter your username"
                            required
                            ref={usernameRef}
                        />
                    </label>
                    <label className="flex flex-col gap-1">
                        <p className="font-medium">
                            Profile Picture :{" "}
                            {profileImgErr && (
                                <span className="text-red-600">
                                    {profileImgErr}
                                </span>
                            )}
                        </p>
                        <input
                            className="border p-2 rounded"
                            type="file"
                            accept="image/*"
                            ref={profileImgRef}
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-purple-600 p-2 text-white rounded hover:bg-purple-500 disabled:bg-purple-200"
                >
                    Sign Up
                </button>
                <p className="text-center flex justify-between -mt-4">
                    <span>
                        Already a user?{" "}
                        <Link
                            className="hover:underline text-blue-600"
                            to="/login"
                        >
                            Login
                        </Link>
                    </span>
                    <span>
                        <Link
                            className="hover:underline text-blue-600"
                            to={"/forgot"}
                        >
                            Forgot Password
                        </Link>
                    </span>
                </p>
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
                    <span>Sign in using Google</span>
                </button>
            </form>
        </div>
    );
}

export default Signup;
