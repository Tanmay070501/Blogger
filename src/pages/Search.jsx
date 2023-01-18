import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import BlogCard from "../Components/BlogCard";
import { db } from "../firebase/config";

function Search() {
    const [search, setSearch] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSearched, setIsSearched] = useState("");
    //console.log(blogs);
    const searchBlogs = async (title) => {
        setIsSearched(title);
        if (title) {
            const q = query(
                collection(db, "blogs"),
                where("searchTitle", ">=", title.toLowerCase()),
                where("searchTitle", "<", title.toLowerCase() + "\uf8ff")
            );
            //console.log(q);
            const docSnapshot = await getDocs(q);
            console.log("runn");
            if (docSnapshot.size !== 0) {
                // console.log("hi");
                const blogData = docSnapshot.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                });
                setBlogs(blogData);
            } else {
                setBlogs([]);
            }
        }
    };
    const searchHandler = (event) => {
        event.preventDefault();
        if (search.trim().length === 0) return;
        setLoading(true);
        searchBlogs(search);
        setLoading(false);
    };

    return (
        <>
            <div className="special-container my-24 flex flex-col items-center">
                <form
                    onSubmit={searchHandler}
                    className="w-full flex justify-center items-stretch gap-2"
                >
                    <input
                        className="p-2 flex-1 border border-black"
                        placeholder="Search"
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                    <button
                        type="submit"
                        className="bg-purple-600 p-2 border border-black text-white"
                    >
                        Search
                    </button>
                </form>
                {loading && <p className="text-center my-4">Loading...</p>}
                {!loading && (
                    <>
                        {isSearched && (
                            <p className="text-center my-4">
                                Result for "{isSearched}" :
                            </p>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            {blogs.map((data) => {
                                return <BlogCard key={data.id} data={data} />;
                            })}
                            {blogs.length === 0 && isSearched && (
                                <p>No result Found</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Search;
