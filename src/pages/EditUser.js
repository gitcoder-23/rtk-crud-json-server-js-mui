import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, updateSingleUser } from '../store/actions/userActions';

const EditUser = ({ match }) => {
  console.log('match', match.params.userId);
  const dispatch = useDispatch();
  const history = useHistory();
  const { singleUser } = useSelector((state) => state.users);
  // console.log('singleUser', singleUser);

  const { userId } = useParams();
  const [error, setError] = useState('');

  const [editUserState, setEditUserState] = useState({
    id: uuidv4(),
    name: '',
    address: '',
    email: '',
    contact: '',
  });

  const { id, name, address, email, contact } = editUserState;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setEditUserState({ ...editUserState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !email || !contact) {
      setError('Please fill all fields..');
    } else {
      // console.log(
      //   'updateSingleUser-->',
      //   dispatch(
      //     updateSingleUser({
      //       editUser: editUserState,
      //       userId: userId,
      //     })
      //   )
      // );
      dispatch(
        updateSingleUser({
          editUser: editUserState,
          userId: userId,
        })
      );
      history.push('/');
      setError('');
      setEditUserState({
        name: '',
        address: '',
        email: '',
        contact: '',
      });
    }
  };

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, []);

  // fixed state
  useEffect(() => {
    if (singleUser) {
      setEditUserState({ ...singleUser });
    }
  }, [singleUser]);

  return (
    <div style={{ marginTop: '20px' }}>
      <div>
        <Button
          variant="contained"
          color="error"
          onClick={() => history.push('/')}
        >
          Go Back
        </Button>
        <h2>Edit User</h2>
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
          variant="standard"
          name="name"
          value={name || ''}
          type="text"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Address"
          variant="standard"
          name="address"
          value={address || ''}
          type="text"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="standard"
          name="email"
          value={email || ''}
          type="email"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Contact"
          variant="standard"
          name="contact"
          value={contact || ''}
          type="number"
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Update
        </Button>
      </Box>
    </div>
  );
};

export default EditUser;
