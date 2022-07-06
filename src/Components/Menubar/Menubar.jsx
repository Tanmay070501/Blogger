import React, { useCallback } from "react";
import "./Menubar.scss";
import {
    FaBold,
    FaItalic,
    FaStrikethrough,
    FaCode,
    FaParagraph,
    FaListUl,
    FaListOl,
    FaQuoteLeft,
    FaUndo,
    FaRedo,
    FaUnderline,
    FaFileImage,
} from "react-icons/fa";
function Menubar({ editor }) {
    const addImage = useCallback(() => {
        const url = window.prompt("URL");

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);
    if (!editor) {
        return null;
    }

    return (
        <div className="btn-grp border p-2">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={
                    editor.isActive("bold") ? "is-active tooltip" : "tooltip"
                }
            >
                <FaBold className="w-4 h-4" />
                <span className="tooltiptext">Bold</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={
                    editor.isActive("italic") ? "is-active tooltip" : "tooltip"
                }
            >
                <FaItalic className="w-4 h-4" />
                <span className="tooltiptext">Italic</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={
                    editor.isActive("underline")
                        ? "is-active tooltip"
                        : "tooltip"
                }
            >
                <FaUnderline className="w-4 h-4" />
                <span className="tooltiptext">Underline</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={
                    editor.isActive("strike") ? "is-active tooltip" : "tooltip"
                }
            >
                <FaStrikethrough className="w-4 h-4" />
                <span className="tooltiptext">Strike through</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={
                    editor.isActive("code") ? "is-active tooltip" : "tooltip"
                }
            >
                <FaCode className="w-4 h-4" />
                <span className="tooltiptext">code</span>
            </button>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={
                    editor.isActive("paragraph")
                        ? "is-active tooltip"
                        : "tooltip"
                }
            >
                <FaParagraph className="w-4 h-4" />
                <span className="tooltiptext">paragraph</span>
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                    editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                }
            >
                <span className="text-base font-bold">H1</span>
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                    editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                }
            >
                <span className="text-base font-bold">H2</span>
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                    editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                }
            >
                <span className="text-base font-bold">H3</span>
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={
                    editor.isActive("heading", { level: 4 }) ? "is-active" : ""
                }
            >
                <span className="text-base font-bold">H4</span>
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
                className={
                    editor.isActive("heading", { level: 5 }) ? "is-active" : ""
                }
            >
                <span className="text-base font-bold">H5</span>
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
                className={
                    editor.isActive("heading", { level: 6 }) ? "is-active" : ""
                }
            >
                <span className="text-base font-bold">H6</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={
                    editor.isActive("bulletList")
                        ? "is-active tooltip"
                        : "tooltip"
                }
            >
                <FaListUl className="w-4 h-4" />
                <span className="tooltiptext">Unordered List</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={
                    editor.isActive("orderedList")
                        ? "is-active tooltip"
                        : "tooltip"
                }
            >
                <FaListOl className="w-4 h-4" />
                <span className="tooltiptext">Ordered List</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={
                    editor.isActive("blockquote")
                        ? "is-active tooltip"
                        : "tooltip"
                }
            >
                <FaQuoteLeft className="w-4 h-4" />
                <span className="tooltiptext">Blockquote</span>
            </button>
            <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <span className="text-base font-bold">Horizontal rule</span>
            </button>
            <button
                className="tooltip"
                onClick={() => editor.chain().focus().undo().run()}
            >
                <FaUndo className="w-4 h-4" />
                <span className="tooltiptext">Undo</span>
            </button>
            <button
                className="tooltip"
                onClick={() => editor.chain().focus().redo().run()}
            >
                <FaRedo className="w-4 h-4" />
                <span className="tooltiptext">Redo</span>
            </button>
            <button onClick={addImage}>
                <FaFileImage className="w-4 h-4" />
            </button>
        </div>
    );
}

export default Menubar;
