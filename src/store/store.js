// store.js
import { configureStore } from '@reduxjs/toolkit';
import typingReducer from '../features/typingSlice.js';

const store = configureStore({
  reducer: {
    typing: typingReducer,
  },
});

export default store;
