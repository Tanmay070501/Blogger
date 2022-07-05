import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Blog from "./pages/Blog";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="blog/:blogid" element={<Blog />} />
                    <Route path="create" element={<Create />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
