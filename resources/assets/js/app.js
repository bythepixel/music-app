
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
const Vue = require('vue');
const Vuex = require('vuex');
const axios = require('axios');
import Pusher from "pusher-js";
import Echo from 'laravel-echo';

// Services
import SpotifyService from './services/SpotifyService';


window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '36c6686c75302a5ea911',
  cluster: 'us2',
});




/**
 * Add All FontAwesome Solid Icons.
 * This can be trimmed down later to make or bundle smaller.
 */
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
fontawesome.library.add(solid);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(Vuex);

Vue.prototype.$http = axios;
Vue.prototype.$spotifyHttp = SpotifyService;
Vue.prototype.$Echo = window.Echo;

Vue.component('core-comp', require('./components/Core.vue'));

const store = new Vuex.Store({
  
  state: {
    isPlaying: false,
    currentPlaylist: [],
    searchResults: [],
    currentTrack: undefined,
  },
  
  mutations: {
    play (state) {
      state.isPlaying = true;
    },
    pause (state) {
      state.isPlaying = false;
    },
    playTrack(state, track) {
      state.currentTrack = track;
      state.isPlaying = true;
      state.searchResults = [];
    },
    setPlaylist (state, playList) {
      state.currentPlaylist = playList;
    },
    setSearchResults (state, tracks) {
      state.searchResults = tracks;
    },
  },
  
  actions: {
    setPlaylist({ commit }, tracks) {
      commit('setPlaylist', tracks);
    },
    getPlaylist({ commit }) {
      SpotifyService
        .search('u2')
        .then(tracks => commit('setPlaylist', tracks));
    },
    getSearchResults({ commit }, query) {
      SpotifyService
        .search(query)
        .then(tracks => commit('setSearchResults', tracks));
    },
    play({ commit }) {
      axios.get('/api/player/play').then(() => {
        commit('play');
      });
    },
    pause({ commit }) {
      axios.get('/api/player/pause').then(() => {
        commit('pause');
      });
    },
  },

});

// store.dispatch('getPlaylist');

const app = new Vue({
  el: '#app',
  store,
  template: `
    <core-comp />
  `,
});
