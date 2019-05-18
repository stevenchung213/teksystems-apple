const axios = require('axios');

const getData = url => {
  return axios.get(url)
    .then(resp => resp.data)
    .catch(err => console.log(err));
};

const formatData = dataArray => {
  const result = {};
  dataArray.forEach(obj => {
    if (obj.kind) {
      if (!result[obj.kind]) {
        result[obj.kind] = [];
        result[obj.kind].push({
          id: obj.artistId,
          name: obj.artistName,
          track: obj.trackName,
          artwork: obj.artworkUrl100,
          genre: obj.primaryGenreName,
          url: obj.trackViewUrl
        });
      } else {
        result[obj.kind].push({
          id: obj.artistId,
          name: obj.artistName,
          track: obj.trackName,
          artwork: obj.artworkUrl100,
          genre: obj.primaryGenreName,
          url: obj.trackViewUrl
        });
      }
    }
  });
  return result;
};

module.exports.getData = getData;
module.exports.formatData = formatData;
