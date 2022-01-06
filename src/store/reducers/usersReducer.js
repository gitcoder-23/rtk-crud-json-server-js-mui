import { createSlice } from '@reduxjs/toolkit';
import {
  getAllUsers,
  getSingleUser,
  addNewUser,
  updateSingleUser,
  deleteUser,
} from '../actions/userActions';

const initialState = {
  allUsers: [],
  // if no user found
  usersContainer: [],
  singleUser: {},
  isLoading: true,
  error: true,
  isError: {},
  isSuccess: false,
};

const usersReducer = createSlice({
  name: 'usersReducer',
  initialState: initialState,
  // action based reducers
  reducers: {
    // filter user
    filteredUser: (state, action) => {
      state.allUsers = state.usersContainer.filter((user) =>
        user.name.toLowerCase().includes(action.payload)
      );
    },
  },
  extraReducers: {
    /***All users */
    // pending
    [getAllUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    // fullfilled
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.isSuccess = true;
      state.allUsers = action.payload;
      // console.log('state.allUsers', state.allUsers);
    },
    // rejected
    [getAllUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.isSuccess = false;
      state.isError = action.payload;
    },

    /**Single User */
    // Pending
    [getSingleUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    // fullfilled
    [getSingleUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.isSuccess = true;
      state.singleUser = action.payload;
      // console.log('state.allUsers', state.allUsers);
    },
    // rejected
    [getSingleUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.isSuccess = false;
      state.isError = action.payload;
    },

    /**Add User */
    // Pending
    [addNewUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    // fullfilled
    [addNewUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.isSuccess = true;
      state.allUsers = [...state.allUsers, action.payload];
      // console.log('state.allUsers', state.allUsers);
    },
    // rejected
    [addNewUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.isSuccess = false;
      state.isError = action.payload;
    },

    /**Edit/Update User */
    // Pending
    [updateSingleUser.pending]: (state, action) => {
      state.isLoading = true;
      console.log('action', action);
    },
    // fullfilled
    [updateSingleUser.fulfilled]: (state, action) => {
      // console.log('action', action);

      state.isLoading = false;
      state.error = false;
      state.isSuccess = true;
      // state.allUsers = [...state.allUsers, action.payload];
      state.allUsers = [...state.allUsers, action.payload.id];
      // console.log('state.allUsers', state.allUsers);
    },
    // rejected
    [updateSingleUser.rejected]: (state, action) => {
      // console.log('action', action);

      state.isLoading = false;
      state.error = true;
      state.isSuccess = false;
      state.isError = action.payload;
    },

    /**Delete User */
    // Pending
    [deleteUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    // fullfilled
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.allUsers = [...state.allUsers];
      // console.log('state.allUsers', state.allUsers);
    },
    // rejected
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.isSuccess = false;
      state.isError = action.payload;
    },
  },
});
export const { filteredUser } = usersReducer.actions;

export default usersReducer.reducer;
