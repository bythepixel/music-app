<template>
  <div class="app-layout">
    <Searchbar class="header" />
    <SearchResults v-if="searchResults.length >= 1" class="search-results" />
    <Playlist class="main-view" />
    <PlayerControls v-if="searchResults.length === 0" class="controls" />
  </div>
</template>

<script>
import PlayerControls from './PlayerControls';
import Searchbar from './Searchbar';
import Playlist from './Playlist';
import SearchResults from './SearchResults';
import { mapState } from 'vuex';

/**
 * Add All FontAwesome Solid Icons.
 * This can be trimmed down later to make or bundle smaller.
 */
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
fontawesome.library.add(regular, solid);

export default {
  name: 'MusicApp',

  components: {
    PlayerControls,
    Searchbar,
    Playlist,
    SearchResults,
  },

  computed: {
    ...mapState({
      searchResults: state => state.searchResults,
    }),
  },

};
</script>

<style scoped>

  .app-layout {
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr max-content;
    grid-template-areas: "header"
                         "main-view"
                         "controls";
  }

  .header {
    grid-area: header;
  }

  .main-view {
    grid-area: main-view;
    overflow-y: scroll;
    position: relative;
  }

  .controls {
    grid-area: controls;
  }

  .search-results {
    z-index: 10;
    grid-area: main-view;
    overflow-y: scroll;
  }

</style>
