import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI Impots
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
const Link = require('react-router-dom').Link;

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
    borderRadius: 8
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

const Scream = (props) => {
  const { classes, scream } = props;
  dayjs.extend(relativeTime);
  return (
    <Card className={classes.card}>
      <CardMedia
        image={scream.userImage}
        title="profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${scream.userHandle}`}
          color="primary"
        >
          {scream.userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(scream.createdAt).fromNow()}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {scream.body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Scream);