import React from 'react';

const TypingStats = ({ timeLeft, mistakes, WPM, CPM }) => (
  <div className='result'>
    <p>Time Left: <strong>{timeLeft}</strong></p>
    <p>Mistakes: <strong>{mistakes}</strong></p>
    <p>WPM: <strong>{WPM}</strong></p>
    <p>CPM: <strong>{CPM}</strong></p>
  </div>
);

export default TypingStats;
