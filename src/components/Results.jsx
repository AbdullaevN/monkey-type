// components/Results.js
import React from 'react';
import { useSelector } from 'react-redux';

const Results = () => {
  const errorCount = useSelector((state) => state.typing.errorCount);
  const startTime = useSelector((state) => state.typing.startTime);
  const userInput = useSelector((state) => state.typing.userInput);

  const calculateWPM = () => {
    const timeElapsed = (Date.now() - startTime) / 1000 / 60;
    return (userInput.split(' ').length / timeElapsed).toFixed(2);
  };

  return (
    <div>
      <p>WPM: {calculateWPM()}</p>
      <p>Errors: {errorCount}</p>
    </div>
  );
};

export default Results;
