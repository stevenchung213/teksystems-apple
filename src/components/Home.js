import React from 'react';
import Typography from '@material-ui/core/Typography';
import Loadable from 'react-loadable';
import Loading from './Loading';

const MediaTabs = Loadable({
  loader: () => import('./MediaTabs'),
  loading: Loading
});

const Home = ({ view, data, kinds, addData, removeData }) => {

  const homeContainer = {
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  };
  
  return (
    <div id={`home-wrapper`} style={view} key={data}>
      <div id={`home-container`} style={homeContainer}>
        {
         !data || !kinds || Object.keys(data).length === 0 ?
          <Typography variant="h5" style={{ marginTop: 30 }} color="textSecondary">
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
