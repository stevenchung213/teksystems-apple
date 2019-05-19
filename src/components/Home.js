import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import MediaTabs from './MediaTabs';

const Home = ({ view }) => {
  
  const [localData, setData] = useState(undefined);
  const [kinds, setKinds] = useState(undefined);
  
  useEffect(() => {
    const storedData = localStorage.getItem('itunes');
    if (storedData && Object.keys(JSON.parse(storedData)) > 0) {
      const parsedData = JSON.parse(localStorage.getItem('itunes'));
      const localKinds = Object.keys(parsedData);
      setData(parsedData);
      setKinds(localKinds);
      return localData;
    } else {
      localStorage.clear();
      return localData;
    }
  },[]);
  
  const homeContainer = {
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  };
  
  return (
    <div id={`home-wrapper`} style={view}>
      <div id={`home-container`} style={homeContainer}>
        {
          localData === undefined ?
            <Typography variant="h5" style={{marginTop: 30}} color="textSecondary">
              You have no saved media...
            </Typography>
            :
            <MediaTabs kinds={kinds} data={localData} home/>
        }
      </div>
    </div>
  );
};

export default Home;
