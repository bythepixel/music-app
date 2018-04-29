import axios from 'axios';

export default {
  playTrack,
  play,
  pause,
  addTrack,
  getPlaylist,
  getState,
};

const apiInstance = axios.create({
  baseURL: '/api/player',
});

function playTrack(trackId) {
  if (trackId) {
    return apiInstance.get('playTrack', {
      params: {
        id: trackId,
      },
    });
  }
  else {
    return apiInstance.get('play');
  }
}

function play() {
  return apiInstance.get('play');
}

function pause() {
  return apiInstance.get('pause');
}

function addTrack(trackId) {
  return apiInstance.get('addTrack', {
    params: {
      id: trackId,
    },
  });
}

function getPlaylist() {
  return apiInstance.get('getPlaylist');
}

function getState() {
  return apiInstance.get('getState');
}

