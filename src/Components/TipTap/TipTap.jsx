import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useRef, useState } from "react";
import Menubar from "../Menubar/Menubar";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";

import "./TipTap.scss";

import { lowlight } from "lowlight/lib/core";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Preview from "../Preview/Preview";

function TipTap() {
    //const [html, setHTML] = useState("");
    const [htmlString, setHTMLString] = useState("");
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
            <EditorContent
                className="border"
                id="lmao"
                editor={editor}
                ref={someRef}
            />
            <Menubar editor={editor} />
            {htmlString && <Preview htmlString={htmlString} />}
        </div>
    );
}

export default TipTap;
