import Editor from 'react-simple-code-editor';
import './editor.css';
import Prism from 'prismjs';
import { useCodeContext } from 'renderer/hooks/useCodeContext';

export default function CodeWindow({ language, fontSize }) {
  const { code, setCode } = useCodeContext();
  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-buttons">
          <div className="title-button" />
          <div className="title-button" />
          <div className="title-button" />
        </div>
      </div>
      <div className="editor_wrap">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(c) => Prism.highlight(c, language, 'python')}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: Number(fontSize),
          }}
        />
      </div>
    </div>
  );
}
