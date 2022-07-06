import React from "react";
import { NavLink, Link } from "react-router-dom";
function Navbar() {
    function logoutHandler() {}

    return (
        <nav className="border px-8 py-2 flex items-center">
            <Link className="text-xl font-medium first-letter:text-4xl" to="/">
                Blogger
            </Link>
            <div className="ml-auto flex gap-3 items-center">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/create">Create new Blog</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign up</NavLink>
                <button
                    className="bg-purple-600 text-white p-2 rounded"
                    onClick={logoutHandler}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
