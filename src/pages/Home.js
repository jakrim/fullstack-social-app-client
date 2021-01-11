import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { baseURL } from '../utils/env';
import Scream from '../components/Scream';
import Profile from '../components/Profile';

const Home = (props) => {
  const [screams, setScreams] = useState([]);

  // const fetchScreams = async () => {
  //   let screamData =
  // };

  useEffect(() => {
    let mount = true;
    if (mount) {
      async function fetchScreams() {
        await axios.get(baseURL + '/screams').then(({ data }) => {
          setScreams(data);
        });
      }
      fetchScreams();
    }
    return () => {
      mount = false;
    };
  }, [screams.length]);

  let recentScreamsMarkup = screams ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
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
