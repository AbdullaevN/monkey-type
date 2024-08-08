// components/TextInput.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInput, incrementErrorCount, setStartTime } from '../store/slice';

const TextInput = () => {
  const dispatch = useDispatch();
  const userInput = useSelector((state) => state.typing.userInput);
  const startTime = useSelector((state) => state.typing.startTime);

  const handleChange = (e) => {
    if (!startTime) {
      dispatch(setStartTime(Date.now()));
    }
    const input = e.target.value;
    dispatch(setUserInput(input));
  };

  useEffect(() => {
    // Logic to compare input and increment error count
  }, [userInput, dispatch]);

  return (
   <>
    <input type="text" value={userInput} onChange={handleChange} />
   </>
  );
};

export default TextInput;
