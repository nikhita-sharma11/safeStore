// src/redux/store.js
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer/reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      // Add any additional middleware here
    }),
});

export default store;
