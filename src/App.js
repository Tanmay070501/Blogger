import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import useAuthCtx from "./hooks/useAuthCtx";
import Create from "./pages/Create";
import CreateNotLogin from "./pages/CreateNotLogin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog/Blog";

function App() {
    const { user, isAuthReady } = useAuthCtx();
    //console.log(user);
    return (
        <BrowserRouter>
            {isAuthReady && (
                <Fragment>
                    <Navbar user={user} />
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
