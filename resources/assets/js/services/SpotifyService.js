const axios = require('axios');

const spotifyHttp = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
    Authorization: `Bearer ${document.querySelector('body').dataset.accessToken}`,
  },
});

export default spotifyHttp;