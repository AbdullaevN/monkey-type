// import React, { useEffect, useRef, useState } from 'react'
// import './style.css'

// const paragraph = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas magnam, odit velit quos temporibus error nostrum vel ab? Officiis facere vel error incidunt? Laudantium mollitia dignissimos maiores delectus fuga quis?`

// const TypingTest = () => {

//   const maxTime = 60;
//   const [timeLeft, setTimeLeft] = useState(maxTime)
//   const [mistakes, setMistakes] = useState(0)
//   const [charIndex, setCharIndex] = useState(0)
//   const [isTyping, setIsTyping] = useState(false)
//   const [WPM, setWPM] = useState(0)
//   const [CPM, setCPM] = useState(0)
//   const inputRef = useRef(null)
//   const charRefs = useRef([])
//   const [correctWrong, setCorrectWrong] = useState([])



//   useEffect(() => {
//     inputRef.current.focus()
//     setCorrectWrong(Array(charRefs.current.length).fill(""))
//   }, [])

//   useEffect(() => {
//     let interval;
//     if(isTyping && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft(timeLeft - 1)
//         let correctChars = charIndex - mistakes
//         let totalTime = maxTime - timeLeft

//         let cpm = correctChars * (60 / totalTime)
//         cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm
//         setCPM(parseInt(cpm, 10))

//         let wpm = Math.round((correctChars / 5 / totalTime) * 60)
//         wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
//         setWPM(wpm)
//       }, 1000)
//     }else if(timeLeft === 0) {
//       clearInterval(interval)
//       setIsTyping(false)
//     }
//     return () => {
//       clearInterval(interval)
//     }
//   },[isTyping, timeLeft])


//   const handleReset = (e) => {
//     setTimeLeft(maxTime)
//     setCharIndex(0)
//     setIsTyping(false)
//     setMistakes(0)
//     setWPM(0)
//     setCPM(0)
//     setCorrectWrong(Array(charRefs.current.length).fill(''))
//     inputRef.current.focus()
//   }

//   const handleChange = (e) =>{
//     const characters = charRefs.current
//     let currentChar = characters[charIndex]
//     let typedChar = e.target.value.slice(-1)

//     if (e.nativeEvent.inputType === 'deleteContentBackward') {
//       if (charIndex > 0) {
//         setCharIndex(charIndex - 1);
//         setMistakes(correctWrong[charIndex - 1] === 'wrong' || correctWrong[charIndex - 1] === 'no-space' ? mistakes - 1 : mistakes);
//         correctWrong[charIndex - 1] = "";
//       }
//       return;
//     }
  


//     if(charIndex < characters.length && timeLeft > 0){
//       if(!isTyping) {
//         setIsTyping(true)
//       }

//       if(typedChar === currentChar.textContent) {
//         // setCharIndex(charIndex + 1)
//         correctWrong[charIndex] = "correct"

//       }else if(currentChar.textContent === " " && typedChar !== " ") {
//         correctWrong[charIndex] = "no-space"
//         setMistakes(mistakes + 1)
//       }
//       else{
//         correctWrong[charIndex] = "wrong"
//         setMistakes(mistakes + 1)  
//       }
//       setCharIndex(charIndex + 1)

//       if(charIndex === characters.length - 1){
//         setIsTyping(false)
//       }
//     }else{
//       setIsTyping(false)
//    }
// }
// const handleContainerClick = () => {
//   inputRef.current.focus();
// };

//   return (
//     <div className='container'>
//       <div className='test' onClick={handleContainerClick}>
//         <input type="text" className='input-field' ref={inputRef} onChange={handleChange} />
//           {
//             paragraph.split("").map((char, index) => (
//               <span 
//               className={` char ${index === charIndex ? " active" : ""} ${correctWrong[index]} `} 
//               ref={(e) => charRefs.current[index] = e} 
//               key={index}>
//                 {char}
//               </span>
//             ))
//           }
//       </div>
//       <div className='result'>
//         <p>Time Left: <strong>{timeLeft}</strong> </p>
//         <p>Mistakes: <strong>{mistakes}</strong> </p>
//         <p>WRM: <strong>{WPM}</strong> </p>
//         <p>CPM: <strong>{CPM}</strong> </p>
//         <button className='btn' onClick={handleReset}>Reset</button>
//       </div>
//     </div>
//   )
// }

// export default TypingTest








// 2
import React, { useEffect, useRef } from 'react';
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
import './style.css';

const paragraph = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas magnam, odit velit quos temporibus error nostrum vel ab? Officiis facere vel error incidunt? Laudantium mollitia dignissimos maiores delectus fuga quis?`;

const TypingTest = () => {
  const dispatch = useDispatch();
  const { timeLeft, mistakes, charIndex, isTyping, WPM, CPM, correctWrong } = useSelector((state) => state.typing);
  const inputRef = useRef(null);
  const charRefs = useRef([]);

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
        let correctChars = charIndex - mistakes;
        let totalTime = 60 - timeLeft;

        let cpm = correctChars * (60 / totalTime);
        cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
        dispatch(setCPM(parseInt(cpm, 10)));

        let wpm = Math.round((correctChars / 5 / totalTime) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        dispatch(setWPM(wpm));
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      dispatch(setIsTyping(false));
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTyping, timeLeft, charIndex, mistakes, dispatch]);

  const handleReset = () => {
    dispatch(resetState());
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

  return (
    <div className='container'>
      <div className='test' onClick={handleContainerClick}>
        <input type="text" className='input-field' ref={inputRef} onChange={handleChange} />
        {
          paragraph.split("").map((char, index) => (
            <Character
              char={char}
              isActive={index === charIndex}
              status={correctWrong[index]}
              ref={(e) => charRefs.current[index] = e}
              key={index}
            />
          ))
        }
      </div>
      <div className='result'>
        <p>Time Left: <strong>{timeLeft}</strong></p>
        <p>Mistakes: <strong>{mistakes}</strong></p>
        <p>WPM: <strong>{WPM}</strong></p>
        <p>CPM: <strong>{CPM}</strong></p>
        <button className='btn' onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default TypingTest;






// 3
// import React, { useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { startTyping, stopTyping, incrementCharIndex, incrementMistakes, updateTimeLeft, updateWPM, updateCPM, resetGame } from '../features/typingSlice.js';
// import './style.css';

// const TypingTest = () => {
//   const { timeLeft, mistakes, charIndex, isTyping, WPM, CPM } = useSelector((state) => state.typing);
//   const dispatch = useDispatch();
//   const inputRef = useRef(null);
//   const charRefs = useRef([]);

//   useEffect(() => {
//     inputRef.current.focus();
//     // Initialize correctWrong state
//   }, []);

//   useEffect(() => {
//     let interval;
//     if (isTyping && timeLeft > 0) {
//       interval = setInterval(() => {
//         dispatch(updateTimeLeft(timeLeft - 1));
//         // Calculate WPM and CPM and dispatch updates
//       }, 1000);
//     } else if (timeLeft === 0) {
//       clearInterval(interval);
//       dispatch(stopTyping());
//     }
//     return () => clearInterval(interval);
//   }, [isTyping, timeLeft, dispatch]);

//   const handleChange = (e) => {
//     // Handle input change logic and dispatch actions accordingly
//   };

//   const handleReset = () => {
//     dispatch(resetGame());
//     inputRef.current.focus();
//   };

//   return (
//     <div className="container">
//       <div className="test">
//         <input type="text" className="input-field" ref={inputRef} onChange={handleChange} />
//         {/* Render characters */}
//       </div>
//       <div className="result">
//         <p>Time Left: <strong>{timeLeft}</strong> </p>
//         <p>Mistakes: <strong>{mistakes}</strong> </p>
//         <p>WRM: <strong>{WPM}</strong> </p>
//         <p>CPM: <strong>{CPM}</strong> </p>
//         <button className="btn" onClick={handleReset}>Reset</button>
//       </div>
//     </div>
//   );
// };

// export default TypingTest;
