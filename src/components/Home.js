import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import MediaTabs from './MediaTabs';

const Home = ({ view, data, kinds, addData, removeData }) => {
  
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
          Array.isArray(kinds) && kinds.length === 0 ?
            <Typography variant="h5" style={{ marginTop: 30, backgroundColor: '-internal-root-color' }} color="textSecondary">
              You have no saved media...
            </Typography>
            :
            <MediaTabs kinds={kinds} data={data} home
                       addData={addData} removeData={removeData}/>
        }
      </div>
    </div>
  );
};

export default Home;
