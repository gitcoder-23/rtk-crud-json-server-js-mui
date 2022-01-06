import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { getSingleUser } from '../store/actions/userActions';
import { useParams, useHistory } from 'react-router-dom';

export const ViewUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { isLoading, error, isSuccess, singleUser } = useSelector(
    (state) => state.users
  );
  console.log('singleUser', singleUser);

  useEffect(() => {
    dispatch(getSingleUser(userId));
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
    <div className="view_user">
      <div className="but-inn">
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('/')}
        >
          Go Back
        </Button>
      </div>
      <h2 style={{ textAlign: 'center' }}>View User</h2>
      {isSuccess === true && (
        <>
          <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      <strong>Name:&nbsp;</strong> {singleUser.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Email:&nbsp;</strong> {singleUser.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>ID:&nbsp;</strong> {singleUser.id}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ cursor: 'pointer' }} variant="body2">
                      <strong>Address:&nbsp;</strong> {singleUser.address}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" component="div">
                    <strong>Contact:&nbsp;</strong> {singleUser.contact}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </div>
  );
};
