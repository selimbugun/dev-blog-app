"use client";

import { Button, IconButton, Typography } from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { uploadImage } from "@/utils/uploadImage";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaListUl,
  FaHeading,
  FaImage,
} from "react-icons/fa";
import { useState } from "react";
import "./tiptap.css";

const TipTap = () => {
  const [headingLevel, setHeadingLevel] = useState(1);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Underline, Image],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class: "my-editor",
      },
    },
  });

  if (!editor) return null;

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const url = await uploadImage(file);
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const saveContent = () => {
    if (editor) {
      console.log(editor.getHTML());
    }
  };

  return (
    <>
      <div>
        <div>
          <Typography variant="h4" component="h2">
            Editor
          </Typography>
          <div>
            <div>
              <IconButton>
                <FaHeading />
              </IconButton>
              <select
                value={headingLevel}
                onChange={(e) => {
                  const level = Number(e.target.value);
                  setHeadingLevel(level);
                  editor.chain().focus().toggleHeading({ level }).run();
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <option key={level} value={level}>
                    H{level}
                  </option>
                ))}
              </select>
            </div>
            <IconButton
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <FaBold />
            </IconButton>
            <IconButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <FaItalic />
            </IconButton>
            <IconButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <FaUnderline />
            </IconButton>
            <IconButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <FaListUl />
            </IconButton>
            <IconButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <FaListOl />
            </IconButton>
            <IconButton component="label">
              <FaImage />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </IconButton>
          </div>
          <EditorContent editor={editor} />
          <Button variant="contained" onClick={saveContent} sx={{ my: 2 }}>
            Kaydet
          </Button>
        </div>
      </div>
    </>
  );
};

export default TipTap;
