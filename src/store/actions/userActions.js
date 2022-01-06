import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootApi } from '../../RootApi';
import { useDispatch } from 'react-redux';

export const getAllUsers = createAsyncThunk('users', async () => {
  const response = await RootApi.get('/users');
  // console.log('response', response);
  return response.data;
});

export const getSingleUser = createAsyncThunk('singleuser', async (userId) => {
  const response = await RootApi.get(`/users/${userId}`);
  // console.log('response', response);
  return response.data;
});

export const addNewUser = createAsyncThunk('adduser', async (data) => {
  const response = await RootApi.post(`/users`, data);
  // console.log('response', response);
  return response.data;
});

export const updateSingleUser = createAsyncThunk(
  'edituser',
  async ({ editUser, userId }) => {
    const response = await RootApi.put(`/users/${userId}`, editUser);
    // console.log('response', response);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk('edituser', async (userId) => {
  const response = await RootApi.delete(`/users/${userId}`);
  // console.log('response', response);
  useDispatch(getAllUsers());
  return response.data;
});
