
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
const Vue = require('vue');
const Vuex = require('vuex');
const axios = require('axios');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const spotifyKey = 'BQCCSwzQ8hZX4bnPjxJj822N73wNtoDXVWwe2od0IBZIFsKHEPgs3404gY6HCdxez8dtMrH8dwhaoCh0sh4jy4bneCblSdjEwZWDheokFe4SEk5cJghwCZf_HYbRGZf_K_kAAEOdPMp2kJ94QgEVzdpPsjAauVbwyvNlh3cdiftM7pempB5FYV2L6zd62soFOj6Jf67svPCLjUP1UOFpMU-eSRi1JDoTxlVAIhnjUu2idQ0yWUZv5EwaCfNWg-zXIzenpdOUZMzxBoF6gqlsZ10MlSs';
const spotifyHttp = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
    Authorization: `Bearer ${spotifyKey}`,
  },
});

Vue.prototype.$http = axios;
Vue.prototype.$spotifyHttp = spotifyHttp;
Vue.use(Vuex);

Vue.component('core-comp', require('./components/Core.vue'));

const store = new Vuex.Store({
  
  state: {
    isPlaying: false,
    currentPlaylist: [],
  },
  
  mutations: {
    play (state) {
      state.isPlaying = true;
    },
    pause (state) {
      state.isPlaying = false;
    },
    setPlaylist (state, playList) {
      state.currentPlaylist = playList;
    },
  },
  
  actions: {
    getPlaylist({ commit }) {
      commit('setPlaylist');

      spotifyHttp
        .get('search', {
          params: {
            q: 'u2',
            type: 'track',
          },
        })
        .then(res => {
          commit('setPlaylist', res.data.tracks.items);
        });

    },
  },

});

store.dispatch('getPlaylist');

const app = new Vue({
  el: '#app',
  store,
  template: `
    <core-comp />
  `,
});
