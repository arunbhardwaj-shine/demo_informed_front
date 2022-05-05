import React, { useRef } from 'react';
import { render } from 'react-dom';

import EmailEditor from 'react-email-editor';

const EditorEmail = () => {
    const emailEditorRef = useRef(null);
    const exportHtml = async () => {
       emailEditorRef.current.editor.exportHtml((data) => {
         const { design, html } = data;
        console.log('exportHtml', design);
     
      
       })
     };
  
    const onLoad = () => {
   

      // editor instance is created
      // you can load your template here;
      // const templateJson = {};
      // emailEditorRef.current.editor.loadDesign(templateJson);
    }
  
    const onReady = () => {
      // editor is ready
      console.log('onReady');
    };
    const onFocus = () => {
      // editor is ready
      console.log('onFocus');
    };
  return (
    <div>
    <div>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>

      
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
    </div>
    </div>
  )
}

export default EditorEmail