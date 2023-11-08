import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Form, FormItemProps } from "antd";
const FormItem = Form.Item;

const Editor: React.FC<FormItemProps & { placeholder?: string }> = ({
  placeholder,
  ...formItemProps
}) => {
  const [editorHtml, setEditorHtml] = useState("");
  const [theme, setTheme] = useState("snow");

  const handleChange = (html: any) => {
    setEditorHtml(html);
  };

  const handleThemeChange = (newTheme: any) => {
    if (newTheme === "core") newTheme = null;
    setTheme(newTheme);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <FormItem {...formItemProps}>
      <ReactQuill
        theme={theme}
        onChange={handleChange}
        value={editorHtml}
        modules={modules}
        formats={formats}
        bounds=".app"
        placeholder={placeholder}
      />
    </FormItem>
  );
};

export default Editor;
