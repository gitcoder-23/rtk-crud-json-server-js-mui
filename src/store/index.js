import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import usersReducer from './reducers/usersReducer';
export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: [...getDefaultMiddleware()],
});
