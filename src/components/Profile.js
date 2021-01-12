import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import * as userActions from '../redux/actions/userActions';
import EditDetails from './EditDetails';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import CalendarToday from '@material-ui/icons/CalendarToday';
// MUI Imports
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import StyledButton from '../utils/StyledButton';
const Link = require('react-router-dom').Link;

const styles = (theme) => ({
  ...theme.spreadTheme
});

const Profile = ({ classes }) => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  let loading = useSelector((state) => state.user.loading);
  let {
    handle,
    createdAt,
    imageUrl,
    bio,
    website,
    location
  } = user.credentials;

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    console.log('Here changing imAge ');
    dispatch(userActions.uploadImage(formData));
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };

  let profileMarkup = !loading ? (
    user.authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img className="profile-image" src={imageUrl} alt="profile" />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <StyledButton
              tip="Edit profile picture"
              onClick={handleEditPicture}
              btnClassName="button"
            >
              <EditIcon color="primary" />
            </StyledButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {' '}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color="primary" />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <StyledButton tip="Logout" onClick={handleLogout}>
            <KeyboardReturn color="primary" />
          </StyledButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No Profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Sign up
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>loading...</p>
  );

  return profileMarkup;
};

export default withStyles(styles)(Profile);
