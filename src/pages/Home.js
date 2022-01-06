import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../store/actions/userActions';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Filter from './Filter';

const Home = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { allUsers, isLoading, error, isSuccess } = useSelector(
    (state) => state.users
  );
  console.log('allUsers', allUsers);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleDelete = (id) => {
    // console.log('handleDelete', id);
    if (window.confirm('Do you want?')) {
      dispatch(deleteUser(id));
    }
    dispatch(getAllUsers());
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  if (isLoading) {
    return (
      <div className="load-css">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="load-css">
        <p>Something went wrong.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="add-user-button">
        <Button
          variant="contained"
          color="primary"
          style={{ float: 'right' }}
          onClick={() => history.push('/adduser')}
        >
          Add User
        </Button>
      </div>
      <h1>Redux-Toolkit Crud Json-Server JS</h1>
      <div className="filter-css">{/* <Filter /> */}</div>

      {isSuccess === true && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#Sl.No</StyledTableCell>
                <StyledTableCell>User Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Contact</StyledTableCell>
                <StyledTableCell align="left">Address</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.length == 0 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  No Data Found!
                </div>
              )}
              {allUsers &&
                allUsers.map((userData, index) => (
                  <StyledTableRow key={userData.id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {userData.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {userData.email}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {userData.contact}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {userData.address}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => history.push(`/viewuser/${userData.id}`)}
                      >
                        <RemoveRedEyeIcon />
                      </Button>
                      &nbsp;
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => history.push(`/edituser/${userData.id}`)}
                      >
                        <EditIcon />
                      </Button>
                      &nbsp;
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(userData.id)}
                      >
                        <DeleteForeverIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Home;
