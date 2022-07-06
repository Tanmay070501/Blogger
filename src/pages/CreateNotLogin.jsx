import React from "react";
import { Link } from "react-router-dom";
function CreateNotLogin() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="text-2xl">
                You need to{" "}
                <Link className="text-blue-600 underline" to="/login">
                    Log in
                </Link>{" "}
                in order to Create a new blog
            </p>
        </div>
    );
}

export default CreateNotLogin;
