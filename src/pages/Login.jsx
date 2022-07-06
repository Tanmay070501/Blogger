import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
function Login() {
    const emailRef = useRef();
    const passRef = useRef();
    const { login } = useLogin();
    function formSubmitHandler(e) {
        e.preventDefault();
        login(emailRef.current.value, passRef.current.value);
    }

    return (
        <div>
            <form
                onSubmit={formSubmitHandler}
                className=" my-12 flex flex-col mx-auto max-w-sm gap-8 px-4 pt-6 pb-16 sm:border sm:rounded sm:shadow"
            >
                <h1 className="text-3xl font-bold text-center">Log in</h1>
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
                    Log in
                </button>
                <p className="text-center -my-2">
                    New user?{" "}
                    <Link className="underline text-blue-600" to="/signup">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
