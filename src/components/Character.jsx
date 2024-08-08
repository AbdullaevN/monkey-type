import React, { forwardRef, memo } from 'react';

const Character = memo(forwardRef(({ char, isActive, status }, ref) => (
  <span
    className={`char ${isActive ? "active" : ""} ${status}`}
    ref={ref}
  >
    {char}
  </span>
)));

export default Character;
