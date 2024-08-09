import React from 'react'

const TypingFinished = () => {
  return (
    <div>
        <div className='summary'>
          <p><strong>Test Finished!</strong></p>
          <p>Errors: {mistakes}</p>
          <p>Correct Characters: {stats.correctChars}</p>
          <p>Correct Words: {stats.correctWords}</p>
          <p>Accuracy: {stats.accuracy}%</p>
          <p>Words Per Minute: {stats.wpm}</p>
          <p>Characters Per Minute: {stats.cpm}</p>
        </div>
    </div>
  )
}

export default TypingFinished