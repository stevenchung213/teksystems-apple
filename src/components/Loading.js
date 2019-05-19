import React from 'react';

const Loading = ({error}) => {
  if (error) {
    return 'UH OH';
  } else {
    return <h3>Loading...</h3>
  }
};

export default Loading;
