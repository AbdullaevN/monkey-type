// components/TextDisplay.js
import React from 'react';
import { useSelector } from 'react-redux';

const TextDisplay = () => {
  const text = useSelector((state) => state.typing.text);
  const userInput = useSelector((state) => state.typing.userInput);

  const getHighlightedText = () => {
    return text.split('').map((char, index) => {
      const userChar = userInput[index];
      let className = '';
      if (userChar) {
        className = userChar === char ? 'correct' : 'incorrect';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return <div>{getHighlightedText()}</div>;
};

export default TextDisplay;
