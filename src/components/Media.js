import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonBase from "@material-ui/core/ButtonBase";
import HeartIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

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

const Media = (props) => {
  
  const { classes, media, kind, saved } = props;
  
  const saveToLocal = (media, kind) => {
    
    if (!localStorage.getItem('itunes')) {
      const newStorage = { [kind]: [] };
      newStorage[kind].push(media);
      localStorage.setItem('itunes', JSON.stringify(newStorage));
    } else {
      const existingStorage = localStorage.getItem('itunes');
      if (!existingStorage.includes(media.url)) {
        const parsedStorage = JSON.parse(existingStorage);
        if (parsedStorage[kind]) {
          parsedStorage[kind].push(media);
          localStorage.setItem('itunes', JSON.stringify(parsedStorage));
        } else {
          parsedStorage[kind] = [];
          parsedStorage[kind].push(media);
          localStorage.setItem('itunes', JSON.stringify(parsedStorage));
        }
      }
    }
  };
  
  const deleteLocal = (media, kind) => {
    
    const localData = localStorage.getItem('itunes');
    const parsedData = JSON.parse(localData);
    const filtered = parsedData[kind].filter(localMedia => localMedia.url !== media.url);
    parsedData[kind] = filtered;
    for (let key in parsedData) {
      if (!parsedData[key].length) {
        delete parsedData[key]
      }
    }
    if (Object.keys(parsedData).length === 0) {
      localStorage.clear();
    }
    localStorage.setItem('itunes', JSON.stringify(parsedData));
  };
  
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle2" color="textSecondary"
                      style={{ height: 23, overflow: 'hidden' }}>
            {media.name}
          </Typography>
          <Typography variant="subtitle1" style={{ height: 56, overflow: 'hidden' }}>
            {media.track}
          </Typography>
          <Typography color="textSecondary">
            <i>{media.genre}</i>
          </Typography>
          <Typography>
            <a target="_blank" rel="noopener noreferrer"
               href={media.url} style={{ width: 25 }}>
              Link
            </a>
            <ButtonBase title={`Add to favorites`} style={{ float: 'right' }}>
              {
                saved ?
                  <DeleteForeverOutlinedIcon style={{ zIndex: 1 }} onClick={() => deleteLocal(media, kind)}/>
                  :
                  <HeartIcon style={{ zIndex: 1 }} onClick={() => saveToLocal(media, kind)}/>
              }
            </ButtonBase>
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

export default withStyles(styles, { withTheme: true })(Media);
