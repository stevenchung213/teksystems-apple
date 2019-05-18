import React from 'react';

const Home = ({ view }) => {
  
  const homeContainer = {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '5vh'
  };
  
  return (
    <div id={`home-wrapper`} style={view}>
      <div id={`home-container`} style={homeContainer}>
        <h2>
          Home component
        </h2>
      </div>
    </div>
  );
};

export default Home;
