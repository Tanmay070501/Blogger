import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthCtx from "./hooks/useAuthCtx";
import Create from "./pages/Create";
import CreateNotLogin from "./pages/CreateNotLogin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog/Blog";
import User from "./pages/User";
import ResponsiveNav from "./Components/ResponsiveNav";

function App() {
    const { user, isAuthReady } = useAuthCtx();
    //console.log(user);
    return (
        <BrowserRouter>
            {isAuthReady && (
                <Fragment>
                    <ResponsiveNav user={user} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/login"
                            element={
                                !user ? <Login /> : <Navigate replace to="/" />
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                !user ? <Signup /> : <Navigate replace to="/" />
                            }
                        />
                        <Route
                            path="/create"
                            element={
                                user && user.emailIsVerified ? (
                                    <Create />
                                ) : (
                                    <CreateNotLogin user={user} />
                                )
                            }
                        />
                        <Route path="/blog/:blogID" element={<Blog />} />
                        <Route path="/user/:userID" element={<User />} />
                    </Routes>
                </Fragment>
            )}
            {!isAuthReady && (
                <p className="text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    Loading...
                </p>
            )}
        </BrowserRouter>
    );
}

export default App;
