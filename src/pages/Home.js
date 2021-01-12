import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';
import Profile from '../components/Profile';
import PropTypes from 'prop-types';
// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import * as dataActions from '../redux/actions/dataActions';

const Home = (props) => {
  const [screamData, setScreamData] = useState([]);
  const dispatch = useDispatch();
  let data = useSelector((state) => state.data);
  let { screams, loading } = data;

  useEffect(() => {
    let mount = true;
    if (mount) {
      dispatch(dataActions.getScreams());
      setScreamData(screams);
    }
    return () => {
      mount = false;
    };
  }, [screams.length]);

  let recentScreamsMarkup = !loading ? (
    screamData.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
