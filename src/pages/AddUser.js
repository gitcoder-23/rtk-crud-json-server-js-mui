import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewUser } from '../store/actions/userActions';

const AddUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [addUserState, setAddUserState] = useState({
    id: uuidv4(),
    name: '',
    address: '',
    email: '',
    contact: '',
  });
  const [error, setError] = useState('');
  const { id, name, address, email, contact } = addUserState;
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setAddUserState({ ...addUserState, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !email || !contact) {
      setError('Please fill all fields..');
    } else {
      // console.log('addNewUser-->', dispatch(addNewUser(addUserState)));
      dispatch(addNewUser(addUserState));
      history.push('/');
      setError('');
      setAddUserState({
        name: '',
        address: '',
        email: '',
        contact: '',
      });
    }
  };
  return (
    <div style={{ marginTop: '20px' }}>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('/')}
        >
          Go Back
        </Button>
        <h2>Add User</h2>
        {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      </div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '45ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-basic"
          label="User Name"
          variant="outlined"
          name="name"
          value={name}
          type="text"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          name="address"
          value={address}
          type="text"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          value={email}
          type="email"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Contact"
          variant="outlined"
          name="contact"
          value={contact}
          type="number"
          onChange={handleInputChange}
        />
        <Button variant="contained" color="success" type="submit">
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default AddUser;
