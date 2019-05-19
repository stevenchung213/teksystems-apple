import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Media from './Media';

const Home = ({ view }) => {
  
  const [localData, setData] = useState(undefined);
  
  useEffect(() => {
    if (localStorage.getItem('itunes')) {
      const parsedData = JSON.parse(localStorage.getItem('itunes'));
      setData(parsedData);
    }
    return localData;
  }, []);
  
  const homeContainer = {
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: '5vh'
  };
  
  return (
    <div id={`home-wrapper`} style={view}>
      <div id={`home-container`} style={homeContainer}>
        {
          !localData ?
            <Typography variant="h3">
              No saved media
            </Typography>
            :
            localData.map((media, i) =>
              <Media media={media} key={`local-${i}`}/>)
        }
      </div>
    </div>
  );
};

export default Home;
