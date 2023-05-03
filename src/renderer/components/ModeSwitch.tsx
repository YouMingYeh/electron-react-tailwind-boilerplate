import './switch.css';
import { useState } from 'react';

export default function ModeSwitch() {
  const [checked, setChecked] = useState(false);

  return (
   <label className="switch">
    <input type="checkbox" className="input__check" onChange={()=>{setChecked(!checked)}} checked={checked}/>
    <span className="slider"></span>
  </label>
  );
}
