import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import * as userActions from '../redux/actions/userActions';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';

// Icons
import EditIcon from '@material-ui/icons/Edit';

// MUI Imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import StyledButton from '../utils/StyledButton';

const styles = (theme) => ({
  ...theme.spreadTheme,
  button: {
    float: 'right'
  }
});

const EditDetails = (props) => {
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false);
  const { classes } = props;
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.user.credentials);

  const mapUserDetailsToState = (credentials) => {
    credentials.bio ? setBio(credentials.bio) : setBio('');
    credentials.website ? setWebsite(credentials.website) : setWebsite('');
    credentials.location ? setLocation(credentials.location) : setLocation('');
  };

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, [credentials]);

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };
  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleSubmit = () => {
    const userDetails = {
      bio,
      location,
      website
    };
    dispatch(userActions.editUserDetails(userDetails));
    handleClose();
  };

  return (
    <>
      <StyledButton
        tip="Edit details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </StyledButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.TextField}
              value={bio}
              onChange={handleBioChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.TextField}
              value={website}
              onChange={handleWebsiteChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where are you from?"
              className={classes.TextField}
              value={location}
              onChange={handleLocationChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(EditDetails);
