import React from 'react';
import StyledButton from '../utils/StyledButton';

// Redux Imports
import { useSelector } from 'react-redux';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

const Link = require('react-router-dom').Link;

const Navbar = () => {
  let authenticated = useSelector((state) => state.user.authenticated);

  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <>
            <StyledButton tip="Post a Scream!">
              <AddIcon />
            </StyledButton>
            <Link to="/">
              <StyledButton tip="Home">
                <HomeIcon />
              </StyledButton>
            </Link>
            <StyledButton tip="Notifications">
              <Notifications />
            </StyledButton>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
