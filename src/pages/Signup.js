import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import axios from 'axios';
import { baseURL } from '../utils/env';

// MUI Imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
const Link = require('react-router-dom').Link;

const Signup = (props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');

  const { classes } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const newUserData = {
      email,
      password,
      confirmPassword,
      handle
    };
    axios
      .post(baseURL + '/signup', newUserData)
      .then((res) => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        setLoading(false);
        props.history.push('/');
      })
      .catch((err) => {
        setErrors(err.response.data);
        console.log('ERRORS: ', err.response.data);
        setLoading(false);
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleHandleChange = (event) => {
    setHandle(event.target.value);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={handleEmailChange}
            fullWidth
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            type="confirmPassword"
            label="Confirm Password"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
          />
          <TextField
            id="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={handle}
            onChange={handleHandleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={30} className={classes.progress} />
            ) : (
              'Signup'
            )}
          </Button>
          <br />
          <small>
            Already have an account? login{' '}
            <Link to="/login" color="primary">
              here
            </Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '10px auto'
  },
  pageTitle: {
    margin: '10px auto'
  },
  textField: {
    margin: '10px auto'
  },
  button: {
    minHeight: 40,
    minWidth: 80,
    marginTop: 20,
    position: 'relative'
  },
  progress: {
    position: 'absolute'
  },
  customError: {
    marginTop: 10,
    color: 'red',
    fontSize: '0.8rem'
  }
};

export default withStyles(styles)(Signup);
