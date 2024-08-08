// // features/typingSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const typingSlice = createSlice({
//   name: 'typing',
//   initialState: {
//     timeLeft: 60,
//     mistakes: 0,
//     charIndex: 0,
//     isTyping: false,
//     WPM: 0,
//     CPM: 0,
//   },
//   reducers: {
//     startTyping(state) {
//       state.isTyping = true;
//     },
//     stopTyping(state) {
//       state.isTyping = false;
//     },
//     incrementCharIndex(state) {
//       state.charIndex += 1;
//     },
//     incrementMistakes(state) {
//       state.mistakes += 1;
//     },
//     updateTimeLeft(state, action) {
//       state.timeLeft = action.payload;
//     },
//     updateWPM(state, action) {
//       state.WPM = action.payload;
//     },
//     updateCPM(state, action) {
//       state.CPM = action.payload;
//     },
//     resetGame(state) {
//       state.timeLeft = 60;
//       state.mistakes = 0;
//       state.charIndex = 0;
//       state.isTyping = false;
//       state.WPM = 0;
//       state.CPM = 0;
//     }
//   }
// });

// export const { startTyping, stopTyping, incrementCharIndex, incrementMistakes, updateTimeLeft, updateWPM, updateCPM, resetGame } = typingSlice.actions;
// export default typingSlice.reducer;
 
















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

const initialState = fromLocalStorage() || { 
  timeLeft: 60,
  mistakes: 0,
  charIndex: 0,
  isTyping: false,
  WPM: 0,
  CPM: 0,
  correctWrong: []  // Убедитесь, что начальное состояние корректно
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
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
    resetState: () => initialState
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
