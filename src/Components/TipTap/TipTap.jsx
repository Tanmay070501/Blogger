import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useRef } from "react";
import Menubar from "../Menubar/Menubar";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";

import "./TipTap.scss";

import { lowlight } from "lowlight/lib/core";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Preview from "../Preview/Preview";
// eslint-disable-next-line
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

function TipTap({ htmlString, setHTMLString, metaData }) {
    //const [html, setHTML] = useState("");
    //const [htmlString, setHTMLString] = useState("");
    const someRef = useRef();
    //console.log(html);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            Underline,
            Image,
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        content: "",
        onUpdate: ({ editor }) => {
            //setHTML(editor.getHTML());
            // console.log(document.querySelector(".ProseMirror").innerHTML);
            // console.log(
            //     someRef.current.editorContentRef.current.firstChild.innerHTML
            // );
            setHTMLString(
                someRef.current.editorContentRef.current.firstChild.innerHTML
            );
        },
    });
    return (
        <div className="mx-auto">
            <EditorContent className="border" editor={editor} ref={someRef} />
            <Menubar editor={editor} />
            {(htmlString ||
                metaData.title ||
                metaData.image ||
                metaData.desc) && (
                <Preview htmlString={htmlString} metaData={metaData} />
            )}
        </div>
    );
}

export default TipTap;
