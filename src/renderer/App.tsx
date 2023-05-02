import React, { useState, useEffect } from 'react';
import {
  useNavigate,
  useParams,
  MemoryRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Prism from 'prismjs';
import { highlight } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python'; // import the Python language
import './prism-vsc-dark-plus.css';
import './components/editor.css';
import CodeWindow from './components/CodeWindow';
import SelectStyle from './components/SelectStyle';
import SelectLanguage from './components/SelectLanguage';
import './App.css';

const addStyle = (content) => {
  const style = document.createElement('style');
  style.innerHTML = content;
  style.id = 'css';
  document.head.appendChild(style);
  console.log(document);
};

function Block() {
  const [code, setCode] = useState(
    `def hello_world():
    print("Hello, world!")`
  );
  const { style } = useParams();
  const [selectedStyle, setSelectedStyle] = useState(style);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(Prism.languages);
    console.log(highlight('', Prism.languages.python, 'python'));
  }, []);

  const handleStyleChange = (event) => {
    const newSelectedStyle = event.target.value;
    setSelectedStyle(newSelectedStyle);
    console.log(newSelectedStyle);
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
        console.log(document.head);
        addStyle(res.default);
        document.head.removeChild(current);
      }

      return null;
    });
  }, [style]);

  return (
    <>
      <CodeWindow
        code={code}
        setCode={setCode}
        language={Prism.languages[selectedLanguage]}
        selectedStyle={selectedStyle}
      />
      <div className="navbar w-full">
        <SelectStyle
          selectedStyle={selectedStyle}
          handleStyleChange={handleStyleChange}
        />
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          handleLanguageChange={(ev) => {
            setSelectedLanguage(ev.target.value);
          }}
        />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:style" element={<Block />} />
        <Route path="/" element={<Block />} />
      </Routes>
    </Router>
  );
}
