import React, { useState, useEffect } from 'react';
import {
  useNavigate,
  useParams,
  MemoryRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python'; // import the Python language
import './prism-vsc-dark-plus.css';
import './components/editor.css';
import CodeWindow from './components/CodeWindow';
import SelectStyle from './components/SelectStyle';
import SelectLanguage from './components/SelectLanguage';
import ModeSwitch from './components/ModeSwitch';
import './App.css';
import { CodeContextProvider, useCodeContext } from './hooks/useCodeContext';

const addStyle = (content: any) => {
  const style = document.createElement('style');
  style.innerHTML = content;
  style.id = 'css';
  document.head.appendChild(style);
};

function Block() {
  const { selectedLanguage, setSelectedLanguage, fontSize, setFontSize } =
    useCodeContext();
  const { style } = useParams();
  const [selectedStyle, setSelectedStyle] = useState<string>(style);

  // const [code, setCode] = useState(
  //   `def hello_world():
  //   print("Hello, world!")`
  // );
  // const { style } = useParams();
  // const [selectedStyle, setSelectedStyle] = useState(style);
  // const [selectedLanguage, setSelectedLanguage] = useState('python');
  const navigate = useNavigate();
  // const [fontSize, setFontSize] = useState('16');

  const handleStyleChange = (event: any) => {
    const newSelectedStyle = event.target.value;
    setSelectedStyle(newSelectedStyle);
    navigate(`/${newSelectedStyle}`);
  };

  // useEffect(() => {
  //   import(`./prism-themes/themes/${style}.css?raw`).then((styleAsString) => {
  //     console.log(styleAsString.default);
  //     addStyle(styleAsString);
  //     console.log(document.head);
  //     if (!style) return;
  //     const current = document.getElementById('css');
  //
  //     if (!current) return;
  //     document.head.removeChild(current);
  //   });
  // });
  useEffect(() => {
    if (!style) return;
    async function loadCss() {
      const response = await import(
        `!!raw-loader!./prism-themes/themes/${style}.css`
      );
      return response;
    }

    loadCss().then((res) => {
      const current = document.getElementById('css');

      if (!current) {
        addStyle(res.default);
      } else {
        addStyle(res.default);
        document.head.removeChild(current);
      }

      return null;
    });
  }, [style]);
  return (
    <>
      <div className="navbar fixed top-0">
        <div className="navbar-start"></div>
        <div className="navbar-center"></div>
        <div className="navbar-end">
          <ModeSwitch />
        </div>
      </div>
      <CodeWindow
        language={Prism.languages[selectedLanguage]}
        fontSize={fontSize}
      />
      <div className="navbar fixed bottom-2">
        <div className="navbar-start">
          <SelectStyle
            selectedStyle={selectedStyle}
            handleStyleChange={handleStyleChange}
          />
        </div>
        <div className="navbar-center">
          <SelectLanguage
            selectedLanguage={selectedLanguage}
            handleLanguageChange={(ev: any) => {
              setSelectedLanguage(ev.target.value);
            }}
          />
        </div>

        <div className="navbar-end">
          <input
            type="text"
            className="input input-bordered"
            value={fontSize}
            onChange={(ev) => setFontSize(ev.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <CodeContextProvider>
      <Router>
        <Routes>
          <Route path="/:style" element={<Block />} />
          <Route path="/" element={<Block />} />
        </Routes>
      </Router>
    </CodeContextProvider>
  );
}
