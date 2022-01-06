import { TextField } from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { filteredUser } from '../store/reducers/usersReducer';

const Filter = () => {
  const inputRef = useRef('');
  console.log('ref->', inputRef);

  const dispatch = useDispatch();
  const filterUsers = () => {
    dispatch(filteredUser(inputRef.current.value));
  };
  return (
    <div>
      <TextField
        type="text"
        name=""
        id="standard-basic"
        label="Search here..."
        variant="standard"
        ref={inputRef}
        onChange={filterUsers}
      />
    </div>
  );
};

export default Filter;
