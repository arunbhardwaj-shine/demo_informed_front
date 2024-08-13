
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';


const QuestionEditor = ({ value, handleUpdateElement, index }) => {
  const editorRef = useRef(null);
  const [editorValue, setEditorValue] = useState(value);
  return (
    <div className="text-editor">
      <Editor
           apiKey="gpl"
           tinymceScriptSrc={window.location.origin+ '/tinymce/tinymce.min.js'}

        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={editorValue}
        init={{
          height: "25vh",
          branding: false,
          menubar: false,
          plugins:
            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
          toolbar:
            "fontselect fontsizeselect | bold italic underline strikethrough | link | alignleft aligncenter alignright alignjustify | outdent indent | forecolor backcolor removeformat | charmap emoticons",
          content_style:
            "body { font-family:Roboto,Helvetica,Arial,sans-serif; font-size:14px;color:#0066be; } body p img{width:100%;} body p{color:#0066be; margin: 2px 0;}, body *{margin:2px 0;}",
          automatic_uploads: true,
          image_caption: true,
          auto_focus: false,


        }}

        onEditorChange={(content) => {
          handleUpdateElement(index, "question", content,);
        }}
      />
    </div>
  );
};

export default QuestionEditor;



// import React, { useRef, useState, useEffect } from 'react';
// import { Editor } from '@tinymce/tinymce-react';

// const QuestionEditor = ({ value, handleUpdateElement, index }) => {
//   const editorRef = useRef(null);
//   const [editorValue, setEditorValue] = useState(value);

//   useEffect(() => {
//     setEditorValue(value);
//   }, [value]);

//   return (
//     <div className="text-editor">
//       <Editor
//         apiKey="gpl"
//         tinymceScriptSrc={window.location.origin + '/tinymce/tinymce.min.js'}
//         onInit={(evt, editor) => (editorRef.current = editor)}
//         initialValue={editorValue}
//         init={{
//           height: "25vh",
//           branding: false,
//           menubar: false,
//           plugins:
//             "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
//           toolbar:
//             "fontselect fontsizeselect | bold italic underline strikethrough | link | alignleft aligncenter alignright alignjustify | outdent indent | forecolor backcolor removeformat | charmap emoticons",
//           content_style:
//             "body { font-family:Roboto,Helvetica,Arial,sans-serif; font-size:14px;color:#0066be; } body p img{width:100%;} body p{color:#0066be; margin: 2px 0;}, body *{margin:2px 0;}",
//           automatic_uploads: true,
//           image_caption: true,
//           auto_focus: false,
//         }}
//         onEditorChange={(content) => {
//           handleUpdateElement(index, "question", content);
//         }}
//       />
//     </div>
//   );
// };

// export default QuestionEditor;



