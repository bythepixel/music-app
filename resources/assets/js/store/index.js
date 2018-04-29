import spotifyService from '../services/spotifyService';
import player from '../services/PlayerService';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  
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
    setTrack(state, track) {
      state.currentTrack = track;
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

    clearSearchResults({ commit }) {
      commit('setSearchResults', []);
    },

    getSearchResults({ commit }, query) {
      spotifyService.search(query)
        .then(tracks => commit('setSearchResults', tracks));
    },

    play({ commit }) {
      commit('play');
      player.play();
    },

    pause({ commit }) {
      commit('pause');
      player.pause();
    },

    addTrack({ commit }, track) {
      commit('setSearchResults', []);
      player.addTrack(track.id);
    },

    getPlaylist({ commit }) {
      player.getPlaylist()
        .then(resp => commit('setPlaylist', resp.data.items));
    },

    playTrack({ commit }, track) {
      commit('play');
      commit('setTrack', track);
      player.playTrack(track.id);
    },

    getState({ commit }) {
      player.getState()
        .then(resp => {
          commit('setTrack', resp.data.item);
          resp.data.is_playing ? commit('play') : commit('pause');
        });
    },
  },

});