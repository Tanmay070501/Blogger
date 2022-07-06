import React from "react";
import TipTap from "../Components/TipTap/TipTap";

function Create() {
    return (
        <div className="my-12 special-container">
            <h1 className="my-12 font-bold text-4xl text-center">
                Create new Blog
            </h1>
            <div className="flex flex-col gap-6 items-center text-base sm:text-lg">
                <label className="flex flex-col w-full gap-4">
                    <span className="font-bold">
                        Title <span className="text-red-500">*</span> :
                    </span>
                    <input
                        className="border p-2"
                        type="text"
                        name="title"
                        placeholder="Title"
                        required
                    />
                </label>
                <label className="flex flex-col w-full gap-4">
                    <span className="font-bold">
                        Description <span className="text-red-500">*</span> :
                    </span>
                    <textarea
                        className="border p-2 resize-none break-words h-56"
                        type="text"
                        name="title"
                        required
                    />
                </label>
                <label className="flex flex-col w-full gap-4">
                    <span className="font-bold">
                        Main Image <span className="text-red-500">*</span> :
                    </span>
                    <input type="file" accept="image/*" required />
                </label>
                <label className="self-start font-bold">Content :</label>
                <TipTap />
                <button className="bg-purple-600 px-4 py-2 text-white hover:bg-purple-500 rounded">
                    Post
                </button>
            </div>
        </div>
    );
}

export default Create;
