import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: '1vh auto',
    width: 300,
    height: 150
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

const Media = (props) => {
  const { classes, media } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          <Grid item>
            <img className={classes.img} alt={media.name} src={media.artwork}/>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {media.name}
                </Typography>
                <Typography gutterBottom>
                  <i>{media.track}</i>
                </Typography>
                <Typography color="textSecondary">
                  {media.genre}
                </Typography>
              </Grid>
              <Grid item>
                <div style={{display: 'flex'}}>
                <Typography style={{ cursor: 'pointer' }}>
                  <a target="_blank" rel="noopener noreferrer"
                     href={media.url}>
                    Link
                  </a>
                </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Media);

// {
//   data[kind].map((media, i) =>
//     <div className={`media-container`} key={i} style={mediaContainer}>
//       <div>
//         <img src={media.artwork} alt={`${media.name}-${i}`}/>
//       </div>
//       <div>
//         <div>
//           {media.name}
//         </div>
//         <div>
//           {media.track}
//         </div>
//         <div>
//           {media.genre}
//         </div>
//         <a target="_blank" rel="noopener noreferrer"
//            href={media.url}>
//           Link
//         </a>
//       </div>
//     </div>
//   )
// }