import React, { useState, useEffect } from 'react';

export default function SelectStyle({ selectedStyle, handleStyleChange }) {
  const options = [
    'prism-a11y-dark',
    'prism-base16-ateliersulphurpool',
    'prism-atom-dark',
    'prism-cb',
    'prism-coldark-cold',
    'prism-coldark-dark',
    'prism-coy-without-shadows',
    'prism-darcula',
    'prism-dracula',
    'prism-duotone-dark',
  ];

  return (
    <select
      className="select-bordered select text-xl"
      value={selectedStyle}
      onChange={handleStyleChange}
    >
      {options.map((opt) => {
        return <option value={opt}>{opt}</option>;
      })}
    </select>
  );
}
