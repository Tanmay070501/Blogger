import React, { Fragment, useEffect, useRef, useState } from "react";
import { FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import useLogout from "../hooks/useLogout";
const navitem = [
    { path: "/", name: "Home" },
    { path: "/create", name: "Create New Blog" },
];

function ResponsiveNav({ user }) {
    const { logout } = useLogout();
    function logoutHandler() {
        logout();
    }

    const [toggle, setToggleNav] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const linkRef = useRef();
    const linksContainerRef = useRef();
    const menuRef = useRef();
    //const [height, setHeight] = useState("0px");
    function toggleHandler() {
        setToggleNav((prev) => !prev);
    }
    useEffect(() => {
        const linksHeight = linkRef.current.getBoundingClientRect().height;
        //console.log(linksHeight);
        if (toggle) {
            linksContainerRef.current.style.height = `${linksHeight}px`;
        } else {
            linksContainerRef.current.style.height = `0px`;
        }
    }, [toggle, user]);

    useEffect(() => {
        const handler = (event) => {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(event.target)) {
                setShowProfile(false);
            }
            // console.log(menuRef.current);
            // console.log(event.target);
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <nav className="border-b px-6 py-2 relative flex justify-between md:gap-8 items-center">
            <Link
                className="text-xl font-medium first-letter:text-4xl md:text-2xl md:first-letter:text-5xl order-2 md:order-1"
                to="/"
            >
                Blogger
            </Link>

            {
                <button
                    className="md:hidden order-1 h-8 w-8 flex justify-center items-center"
                    onClick={toggleHandler}
                >
                    {!toggle && <FiMenu className="w-full h-full" />}
                    {toggle && <FiX className="w-full h-full" />}
                </button>
            }
            <div
                id="collapsable-nav"
                className=" shadow-lg md:shadow-none md:ml-auto absolute w-full md:w-auto top-full left-0 md:static flex flex-col md:order-2 overflow-hidden md:border-y-0 z-10 bg-white"
                ref={linksContainerRef}
            >
                <ul
                    className="flex flex-col border-y md:border-none  md:gap-4 md:flex-row text-center "
                    ref={linkRef}
                >
                    {navitem.map((item, index) => {
                        return (
                            <li className=" flex flex-col" key={index}>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "inline-block  p-4 md:p-0 text-purple-400 hover:text-purple-600"
                                            : "inline-block  p-4 md:p-0 hover:text-purple-600"
                                    }
                                    to={item.path}
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        );
                    })}
                    {!user && (
                        <Fragment>
                            <li className="flex flex-col">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "inline-block  p-4 md:p-0 text-purple-400 hover:text-purple-600"
                                            : "inline-block  p-4 md:p-0 hover:text-purple-600"
                                    }
                                    to="/login"
                                >
                                    Log in
                                </NavLink>
                            </li>
                            <li className=" flex flex-col">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "inline-block  p-4 md:p-0 text-purple-400 hover:text-purple-600"
                                            : "inline-block  p-4 md:p-0 hover:text-purple-600"
                                    }
                                    to={"/signup"}
                                >
                                    Sign up
                                </NavLink>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </div>
            <div className="order-3">
                {user && (
                    <div className="relative h-12 w-12" ref={menuRef}>
                        <button
                            onClick={() => setShowProfile((prev) => !prev)}
                            className={`h-12 w-12 rounded-full ring-offset-1 ${
                                showProfile ? "ring-purple-600 ring-2" : ""
                            } `}
                        >
                            {user && user.userPhoto && (
                                <img
                                    loading="lazy"
                                    className="w-full h-full rounded-full"
                                    src={user.userPhoto}
                                    alt="user img"
                                    referrerPolicy="no-referrer"
                                />
                            )}
                        </button>

                        <ul
                            className="absolute z-20 shadow-xl top-[115%] text-black bg-white border-x border-b right-0 min-w-[256px] max-w-[300px] break-words text-center rounded-lg"
                            style={{ display: showProfile ? "block" : "none" }}
                        >
                            <li
                                onClick={() => setShowProfile(false)}
                                className="border-t hover:bg-black/5"
                            >
                                <Link
                                    className="px-2 py-4 flex items-center justify-center gap-2"
                                    to={`/user/${user.uid}`}
                                >
                                    <FiUser />
                                    <span>{user.username}</span>
                                </Link>
                            </li>
                            <li className="border-t hover:bg-black/5">
                                <button
                                    onClick={() => {
                                        setShowProfile(false);
                                        logoutHandler();
                                    }}
                                    className="w-full h-full flex justify-center items-center gap-2 p-2"
                                >
                                    <span>Logout</span>
                                    <FiLogOut />
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default ResponsiveNav;
