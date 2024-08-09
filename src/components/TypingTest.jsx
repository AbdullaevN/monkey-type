import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setTimeLeft, 
  setMistakes, 
  setCharIndex, 
  setIsTyping, 
  setWPM, 
  setCPM, 
  setCorrectWrong, 
  resetState 
} from '../features/typingSlice.js';
import Character from './Character';
import ResetButton from './ResetButton.jsx';
import TypingFinished from './TypingFinished.jsx';

const paragraph = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas magnam, odit velit quos temporibus error nostrum vel ab? Officiis facere vel error incidunt? Laudantium mollitia dignissimos maiores delectus fuga quis?`;

const TypingTest = () => {
  const dispatch = useDispatch();
  const { timeLeft, mistakes, charIndex, isTyping, WPM, CPM, correctWrong } = useSelector((state) => state.typing);
  const inputRef = useRef(null);
  const charRefs = useRef([]);
  const [testFinished, setTestFinished] = useState(false);
  const [testDuration, setTestDuration] = useState(20);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    dispatch(setCorrectWrong(Array(paragraph.length).fill('')));
  }, [dispatch]);

  useEffect(() => {
    let interval;
    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        dispatch(setTimeLeft(timeLeft - 1));
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      dispatch(setIsTyping(false));
      setTestFinished(true);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTyping, timeLeft, dispatch]);

  const handleDurationClick = (duration) => {
    setTestDuration(duration);
    dispatch(resetState());
    setTestFinished(false);
    dispatch(setTimeLeft(duration));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (e) => {
    const characters = charRefs.current;
    let typedChar = e.target.value.slice(-1);
    let currentChar = characters[charIndex];

    if (e.nativeEvent.inputType === 'deleteContentBackward') {
      if (charIndex > 0) {
        const newCharIndex = charIndex - 1;
        const prevChar = correctWrong[newCharIndex];

        let newMistakes = mistakes;
        if (prevChar === 'wrong' || prevChar === 'no-space') {
          newMistakes--;
        }
        dispatch(setMistakes(newMistakes));

        const newCorrectWrong = [...correctWrong];
        newCorrectWrong[charIndex] = "";
        dispatch(setCorrectWrong(newCorrectWrong));

        dispatch(setCharIndex(newCharIndex));
      }
      return;
    }

    if (charIndex < characters.length && timeLeft > 0) {
      if (!isTyping) {
        dispatch(setIsTyping(true));
      }

      const newCorrectWrong = [...correctWrong];

      if (typedChar === currentChar.textContent) {
        newCorrectWrong[charIndex] = "correct";
      } else if (currentChar.textContent === " " && typedChar !== " ") {
        newCorrectWrong[charIndex] = "no-space";
        dispatch(setMistakes(mistakes + 1));
      } else {
        newCorrectWrong[charIndex] = "wrong";
        dispatch(setMistakes(mistakes + 1));
      }
      dispatch(setCharIndex(charIndex + 1));
      dispatch(setCorrectWrong(newCorrectWrong));

      if (charIndex === characters.length - 1) {
        dispatch(setIsTyping(false));
        setTestFinished(true);
      }
    } else {
      dispatch(setIsTyping(false));
    }
  };

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const calculateStats = () => {
    const correctChars = correctWrong.filter(status => status === 'correct').length;
    const totalChars = paragraph.length;
    const accuracy = (correctChars / totalChars) * 100;
    const totalTime = testDuration - timeLeft;
  
    const cpm = totalTime > 0 ? correctChars * (60 / totalTime) : 0;
    const wpm = totalTime > 0 ? Math.round((correctChars / 5 / totalTime) * 60) : 0;
  
    return {
      cpm: cpm < 0 || isNaN(cpm) || cpm === Infinity ? 0 : cpm,
      wpm: wpm < 0 || isNaN(wpm) || wpm === Infinity ? 0 : wpm,
      correctChars,
      accuracy: accuracy.toFixed(2)
    };
  };

  const stats = testFinished ? calculateStats() : { cpm: CPM, wpm: WPM, correctChars: 0, accuracy: 0 };

  return (
    <div className='container' onClick={handleContainerClick}>
      <div className='controls'>
        <button className='btn' onClick={() => handleDurationClick(20)}>20s</button>
        <button className='btn' onClick={() => handleDurationClick(60)}>60s</button>
        <button className='btn' onClick={() => handleDurationClick(120)}>120s</button>
      </div>
      <div className='test'>
        <input type="text" className='input-field' ref={inputRef} onChange={handleChange} />
        {paragraph.split("").map((char, index) => (
          <Character
            char={char}
            isActive={index === charIndex}
            status={correctWrong[index]}
            ref={(e) => charRefs.current[index] = e}
            key={index}
          />
        ))}
      </div>
     

      <p>Time Left: <strong>{timeLeft}</strong></p>

       {testFinished ? (
        <div className='finished'>
          <TypingFinished 
            mistakes={mistakes}
            correctWrong={correctWrong}
            testDuration={testDuration}
            timeLeft={timeLeft}
            paragraph={paragraph}
          />
        </div>
      ) : (
        <div className='result'>
          <p>Mistakes: <strong>{mistakes}</strong></p>
          <p>Correct Characters: <strong>{stats.correctChars}</strong></p>
          <p>Accuracy: <strong>{stats.accuracy}%</strong></p>
          <p>WPM: <strong>{stats.wpm}</strong></p>
          <p>CPM: <strong>{stats.cpm}</strong></p>
        </div>
      )}
      <ResetButton onClick={() => {
        dispatch(resetState());
        setTestFinished(false);
        setTestDuration(20);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }} />
    </div>
  );
};

export default TypingTest;
