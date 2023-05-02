import React, { useState, useEffect } from 'react';

export default function SelectStyle({ selectedStyle, handleStyleChange }) {
  return (
    <select
      className="select text-xl"
      value={selectedStyle}
      onChange={handleStyleChange}
    >
      <option value="prism-a11y-dark">prism-a11y-dark</option>
      <option value="prism-base16-ateliersulphurpool.light">
        prism-base16-ateliersulphurpool.light
      </option>
    </select>
  );
}
