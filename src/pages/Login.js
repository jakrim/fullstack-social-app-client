import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import axios from 'axios';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../redux/actions/userActions';

// MUI Imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
const Link = require('react-router-dom').Link;

const Login = (props) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { classes } = props;
  let loading = useSelector((state) => state.UI.loading);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email,
      password
    };
    dispatch(userActions.loginUser(userData, props.history));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
            onClick={handleSubmit}
          >
            {loading ? (
              <CircularProgress size={30} className={classes.progress} />
            ) : (
              'Login'
            )}
          </Button>
          <br />
          <small>
            Don't have an account? sign up{' '}
            <Link to="/signup" color="primary">
              here
            </Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
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

export default withStyles(styles)(Login);
