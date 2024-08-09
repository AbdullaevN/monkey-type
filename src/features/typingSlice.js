 



import { createSlice } from '@reduxjs/toolkit';

const fromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('typingState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}

const getInitialState = () => fromLocalStorage() || { 
    timeLeft: 20,
  mistakes: 0,
  charIndex: 0,
  isTyping: false,
  WPM: 0,
  CPM: 0,
  correctWrong: []   
};

const typingSlice = createSlice({
  name: 'typing',
  initialState: getInitialState(),
  reducers: {
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    setMistakes: (state, action) => {
      state.mistakes = action.payload;
    },
    setCharIndex: (state, action) => {
      state.charIndex = action.payload;
    },
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    setWPM: (state, action) => {
      state.WPM = action.payload;
    },
    setCPM: (state, action) => {
      state.CPM = action.payload;
    },
    setCorrectWrong: (state, action) => {
      state.correctWrong = action.payload;  // Убедитесь, что передаваемый массив новый
    },
    resetState: (state) => {
        Object.assign(state, getInitialState());
      }
  }
});

export const {
  setTimeLeft,
  setMistakes,
  setCharIndex,
  setIsTyping,
  setWPM,
  setCPM,
  setCorrectWrong,
  resetState
} = typingSlice.actions;

export default typingSlice.reducer;
