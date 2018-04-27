<template>
  <div class="app-layout">
    <Searchbar class="header" />
    <Playlist class="main-view" />
    <PlayerControls class="controls" />
  </div>
</template>

<script>
import PlayerControls from './PlayerControls';
import Searchbar from './Searchbar';
import Playlist from './Playlist';

export default {
  name: 'HelloWorld',

  components: {
    PlayerControls,
    Searchbar,
    Playlist,
  },

};
</script>

<style scoped>

  .app-layout {
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
    grid-area: "header";
  }

  .main-view {
    grid-area: "main-view";
    overflow: scroll;
  }

  .controls {
    grid-area: "controls";
  }

</style>
