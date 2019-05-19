import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import MediaTabs from './MediaTabs';

const Home = ({ view }) => {
  
  const [localData, setData] = useState(undefined);
  const [kinds, setKinds] = useState(undefined);
  
  useEffect(() => {
    if (localStorage.getItem('itunes')) {
      const parsedData = JSON.parse(localStorage.getItem('itunes'));
      const localKinds = Object.keys(parsedData);
      setData(parsedData);
      setKinds(localKinds);
    }
    return localData;
  }, []);
  
  const homeContainer = {
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  };
  console.log(localData);
  
  return (
    <div id={`home-wrapper`} style={view}>
      <div id={`home-container`} style={homeContainer}>
        {
          !localData ?
            <Typography variant="h3">
              No saved media
            </Typography>
            :
            <MediaTabs kinds={kinds} data={localData} home/>
        }
      </div>
    </div>
  );
};

export default Home;
