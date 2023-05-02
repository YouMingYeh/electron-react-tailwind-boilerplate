import Editor from 'react-simple-code-editor';
import { highlight } from 'prismjs';

import './editor.css';
import Prism from 'prismjs';
import { useEffect } from 'react';
export default function CodeWindow({ code, setCode, language }) {
  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-buttons">
          <div className="title-button"></div>
          <div className="title-button"></div>
          <div className="title-button"></div>
        </div>
      </div>
      <div className="editor_wrap">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) => Prism.highlight(code, language, 'python')}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
          }}
        />
      </div>
    </div>
  );
}
