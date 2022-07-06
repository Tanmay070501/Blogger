import React, { useRef, useState } from "react";
import TipTap from "../Components/TipTap/TipTap";

function Create() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [titleError, setTitleError] = useState("");
    const [descError, setDescError] = useState("");
    const [htmlString, setHTMLString] = useState("");
    const [image, setImage] = useState("");
    const titleRef = useRef();
    const descRef = useRef();
    console.log(image);
    function titleChangeHandler(e) {
        setTitle(e.target.value);
        if (e.target.value.trim() === "") {
            setTitleError("Title must not be empty");
        } else {
            setTitleError("");
        }
    }
    function descChangeHandler(e) {
        setDesc(e.target.value);
        if (e.target.value.trim() === "") {
            setDescError("Description must not be empty");
        } else {
            setDescError("");
        }
    }
    function imageHandler(e) {
        if (!e.target.files[0]) {
            setImage("");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
    const postHandler = (e) => {
        e.preventDefault();
        if (title.trim() === "") {
            setTitleError("Title must not be empty");
            titleRef.current.focus();
            return;
        }
        if (desc.trim() === "") {
            setDescError("Description must not be empty");
            descRef.current.focus();
            return;
        }
        setTitle("");
        setDescError("");
        console.log("submitted");
    };

    return (
        <form onSubmit={postHandler} className="my-12 special-container">
            <h1 className="my-12 font-bold text-4xl text-center">
                Create new Blog
            </h1>
            <div className="flex flex-col gap-6 items-center text-base sm:text-lg">
                <label className="flex flex-col w-full gap-4">
                    <span className="font-bold">
                        Title <span className="text-red-500">*</span> :{" "}
                        {titleError && (
                            <span className="text-red-500 my-2">
                                ({titleError})
                            </span>
                        )}
                    </span>
                    <input
                        className="border p-2"
                        type="text"
                        name="title"
                        placeholder="Enter the title..."
                        required
                        value={title}
                        onChange={titleChangeHandler}
                        ref={titleRef}
                    />
                </label>

                <label className="flex flex-col w-full gap-4">
                    <span className="font-bold">
                        Description <span className="text-red-500">*</span> :{" "}
                        {descError && (
                            <span className="text-red-500 my-2">
                                ({descError})
                            </span>
                        )}
                    </span>
                    <textarea
                        className="border p-2 resize-none break-words h-56"
                        type="text"
                        name="description"
                        placeholder="Enter the description..."
                        required
                        value={desc}
                        onChange={descChangeHandler}
                        ref={descRef}
                    />
                </label>

                <label className="flex flex-col w-full gap-4">
                    <span className="font-bold">
                        Main Image <span className="text-red-500">*</span> :
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={imageHandler}
                    />
                </label>

                <label className="self-start font-bold">Content :</label>
                <TipTap
                    metaData={{ title, desc, image }}
                    htmlString={htmlString}
                    setHTMLString={setHTMLString}
                />
                <button
                    type="submit"
                    className="bg-purple-600 px-8 py-2 text-white hover:bg-purple-500 rounded"
                >
                    Post
                </button>
            </div>
        </form>
    );
}

export default Create;
