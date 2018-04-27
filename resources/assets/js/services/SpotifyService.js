const axios = require('axios');

const spotifyInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
    Authorization: `Bearer ${document.querySelector('body').dataset.accessToken}`,
  },
});

function search(query) {
  return spotifyInstance
    .get('search', {
      params: {
        q: query,
        type: 'track',
      },
    })
    .then(res => {
      return res.data.tracks.items;
    })
    .catch(err => {
      const error = err.response.data.error;
      if (error.status === 401 && error.message === 'The access token expired') {
        axios.get('/api/spotifyAuth/refreshAccessToken').then(res => {
          console.error(res);
        });
      }
    });
}

export default {
  search,
};