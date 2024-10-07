import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const QuestionEditor = ({
  value,
  handleUpdateElement,
  index,
  Placeholder,
  headingBoldFlag,
}) => {
  const editorRef = useRef(null);
  const [editorValue, setEditorValue] = useState(value);

  return (
    <div className="text-editor">
      <Editor
        apiKey="gpl" // Replace with your TinyMCE API key if needed
        tinymceScriptSrc={window.location.origin + "/tinymce/tinymce.min.js"} // Ensure this path is correct
        onInit={(evt, editor) => {
          editorRef.current = editor;
          if (headingBoldFlag) {
            editor.execCommand("Bold");
          }
        }}
        initialValue={
          headingBoldFlag ? `<strong>${editorValue}</strong>` : editorValue
        }
        init={{
          height: "120px",
          branding: false,
          menubar: false,
          plugins: "link",
          toolbar:
            "fontsize bold italic underline strikethrough | link forecolor ",
          content_style:
            "body { font-family:Roboto,Helvetica,Arial,sans-serif; font-size:12px;color:#0066be;cursor: text; } body p img{width:100%;} body p{color:#0066be; margin: 2px 0;}, body *{margin:2px 0;}",
          automatic_uploads: true,
          image_caption: true,
          auto_focus: false,
          fontsize_formats: "8px 10px 12px 14px 18px 24px 36px", // Optional: Customize font sizes
          placeholder: Placeholder,
          link_default_target: '_blank'
        }}
        onEditorChange={(content) => {
          handleUpdateElement(index, "question", content);
        }}
      />
    </div>
  );
};

export default QuestionEditor;
