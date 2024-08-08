// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import typingReducer from './slice';

export default configureStore({
  reducer: {
    typing: typingReducer,
  },
});
