import React from 'react';

const TypingFinished = ({ mistakes, correctWrong, testDuration, timeLeft, paragraph }) => {
 
  // Расчёт правильных символов
  const correctChars = correctWrong.filter(status => status === 'correct').length;

  // Расчёт точности
  const accuracy = (correctChars / paragraph.length) * 100;

  // Расчёт общего времени
  const totalTime = testDuration - timeLeft;

  // Расчёт CPM и WPM
  const cpm = totalTime > 0 ? correctChars * (60 / totalTime) : 0;
  const wpm = totalTime > 0 ? Math.round((correctChars / 5 / totalTime) * 60) : 0;

  return (
    <div>
      <div className='summary'>
      <p><strong>Test Finished!</strong></p>
        <p>Errors: {mistakes}</p>
        <p>Correct Characters: {correctChars}</p>
        {/* <p>Correct Words: {correctWords}</p> */}
        <p>Accuracy: {accuracy.toFixed(2)}%</p>
        <p>Words Per Minute: {wpm}</p>
        <p>Characters Per Minute: {cpm}</p>
      </div>
    </div>
  );
};

export default TypingFinished;
