import Pusher from "pusher-js";
import Echo from 'laravel-echo';

export default {
  createConnection,
  initListeners,
  getInitialState,
};

function createConnection() {
  return new Echo({
    broadcaster: 'pusher',
    key: '36c6686c75302a5ea911',
    cluster: 'us2',
  });
}

function initListeners(socketConnection, channelName, store) {
  socketConnection.channel(channelName)
    .listen('.player.play', () => {
      console.debug('socket message: PLAY received!');
      store.dispatch('play');
    });

  socketConnection.channel(channelName)
    .listen('.player.pause', () => {
      console.debug('socket message: PAUSE received!');
      store.dispatch('pause');
    });

  socketConnection.channel(channelName)
    .listen('.player.playlistUpdated', () => {
      console.debug('socket message: REFRESH PLAYLIST received!');
      store.dispatch('getPlaylist');
    });
}

/**
| Get the initial global data. We need the state of the remote player,
| as well as the playlist.
**/
function getInitialState(store) {
  store.dispatch('getState');
  store.dispatch('getPlaylist');
}
