// store/slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: 'Sample text for typing...',
  userInput: '',
  startTime: null,
  errorCount: 0,
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    setUserInput(state, action) {
      state.userInput = action.payload;
    },
    incrementErrorCount(state) {
      state.errorCount += 1;
    },
    setStartTime(state, action) {
      state.startTime = action.payload;
    },
  },
});

export const { setUserInput, incrementErrorCount, setStartTime } = typingSlice.actions;
export default typingSlice.reducer;
