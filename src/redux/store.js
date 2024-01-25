import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer/reducer';
i;
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export default store;
