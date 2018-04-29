const Vue = require('vue');

import store from './store/index';
import socketService from './services/socketService';

socketService.initListeners(socketService.createConnection(), 'music-app', store);
socketService.getInitialState(store);

const app = new Vue({
  el: '#app',
  store,
  components: {
    'music-app': require('./components/Root.vue'),
  },
  template: `
    <music-app />
  `,
});
