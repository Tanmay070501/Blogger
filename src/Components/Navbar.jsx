import React, { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
function Navbar({ user }) {
    const { logout } = useLogout();
    function logoutHandler() {
        logout();
    }

    return (
        <nav className="border px-8 py-2 flex items-center">
            <Link className="text-xl font-medium first-letter:text-4xl" to="/">
                Blogger
            </Link>
            <div className="ml-auto flex gap-3 items-center">
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "navlink navlink-active" : "navlink"
                    }
                    to="/"
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "navlink navlink-active" : "navlink"
                    }
                    to="/create"
                >
                    Create new Blog
                </NavLink>
                {!user && (
                    <Fragment>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "navlink navlink-active" : "navlink"
                            }
                            to="/login"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "navlink navlink-active" : "navlink"
                            }
                            to="/signup"
                        >
                            Sign up
                        </NavLink>
                    </Fragment>
                )}
                {user && (
                    <button
                        className="bg-purple-600 text-white p-2 rounded"
                        onClick={logoutHandler}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
