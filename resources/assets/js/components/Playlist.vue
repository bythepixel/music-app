<template>
  <ul class="search__results-list">
    <TrackListing v-for="track in currentPlaylist" :key="track.id" :track="track" />
  </ul>
</template>

<script>
import { mapState } from 'vuex';
import TrackListing from './TrackListing';

export default {

  name: 'PlayerControls',

  components: {
    TrackListing,
  },

  data () {
    return {

    };
  },

  computed: {
    ...mapState({
      currentPlaylist: state => state.currentPlaylist,
    }),
  },

};
</script>

<style lang="css" scoped>


</style>