<template>
  <div>
    <Searchbar />
    <PlayerControls />
    <Playlist />
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

</style>
