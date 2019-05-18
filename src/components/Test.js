import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    display: 'flex',
    width: 350,
    height: 150,
    margin: ' 0.5vh auto'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: 230
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    margin: 'auto',
    marginRight: 5,
    width: 120,
    height: 120
  }
});

const MediaCard = (props) => {
  const { classes, theme, media } = props;
  
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1">
            {media.track}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {media.name}
          </Typography>
          <Typography color="textSecondary">
            <i>{media.genre}</i>
          </Typography>
          <Typography style={{ cursor: 'pointer' }}>
            <a target="_blank" rel="noopener noreferrer"
               href={media.url}>
              Link
            </a>
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={media.artwork}
        title="Live from space album cover"
      />
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(MediaCard);
