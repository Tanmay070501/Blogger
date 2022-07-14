import {
    addDoc,
    collection,
    doc,
    increment,
    setDoc,
    Timestamp,
} from "firebase/firestore";
import React, { useRef, useState } from "react";
import TipTap from "../Components/TipTap/TipTap";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useAuthCtx from "../hooks/useAuthCtx";
import { useNavigate } from "react-router-dom";
function Create() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [titleError, setTitleError] = useState("");
    const [descError, setDescError] = useState("");
    const [htmlString, setHTMLString] = useState("");
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState("");
    const titleRef = useRef();
    const descRef = useRef();
    const ImageRef = useRef();
    const { user } = useAuthCtx();
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const [firebaseErr, setFirebaseErr] = useState(null);
    //console.log(image);
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
            setImageError("You must choose an image");
            return;
        }
        setImageError("");
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    const postHandler = async (e) => {
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
        if (!image) {
            setImageError("You must choose an image");
            ImageRef.current.focus();
            return;
        }
        try {
            setFirebaseErr(null);
            setIsPending(true);
            const blogRef = collection(db, "blogs");
            const blogdoc = await addDoc(blogRef, {
                title,
                desc: desc.trim(),
                content: htmlString,
                createdAt: Timestamp.fromDate(new Date()),
                authorUid: user.uid,
                author: user.username,
                mainImgURL: "",
            });
            const ImageUploadPath = `blogImages/${blogdoc.id}/${ImageRef.current.files[0].name}`;
            const imageUploadRef = ref(storage, ImageUploadPath);
            await uploadBytes(imageUploadRef, ImageRef.current.files[0]);
            const url = await getDownloadURL(imageUploadRef);
            await setDoc(
                doc(db, "blogs", blogdoc.id),
                {
                    mainImgURL: url,
                },
                {
                    merge: true,
                }
            );
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(
                userDocRef,
                { postsCount: increment(1) },
                { merge: true }
            );
            navigate(`/blog/${blogdoc.id}`);
        } catch (error) {
            console.log(error.message);
            setFirebaseErr(error.message);
        }
        ImageRef.current.value = null;
        setTitle("");
        setDesc("");
        setImage("");
        setHTMLString("");
        setIsPending(false);
        console.log("submitted");
    };

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="my-12 special-container"
        >
            <h1 className="my-12 font-bold text-4xl text-center">
                Create new Blog
            </h1>
            {firebaseErr && (
                <p className="p-2 bg-red-200 text-red-600 font-bold my-4">
                    {firebaseErr}
                </p>
            )}
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
                        Main Image <span className="text-red-500">*</span> :{" "}
                        {imageError && (
                            <span className="text-red-500 my-2">
                                ({imageError})
                            </span>
                        )}
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={imageHandler}
                        ref={ImageRef}
                    />
                </label>

                <label className="self-start font-bold">Content :</label>
                <TipTap
                    metaData={{ title, desc, image }}
                    htmlString={htmlString}
                    setHTMLString={setHTMLString}
                />
                <button
                    onClick={postHandler}
                    type="button"
                    className="bg-purple-600 px-8 py-2 text-white hover:bg-purple-500 rounded disabled:bg-purple-300"
                    disabled={isPending}
                >
                    {isPending ? "Posting" : "Post"}
                </button>
            </div>
        </form>
    );
}

export default Create;
