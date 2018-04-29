<template>
  <div>
    <div class="list-counter">{{ songList.length }} songs in playlist</div>
    <ul>
      <TrackListing v-for="track in songList" :key="track.id" :track="track.track" >
        <button class="btn btn__icon-btn--icon-only"
          aria-label="play"
          @click="playTrack(track.track)"
          v-show="!isCurrentlyPlaying(track.track.id)"
        >
          <font-awesome-icon icon="play-circle" />
        </button>
        <button class="btn btn__icon-btn--icon-only" 
          aria-label="pause"
          @click="pause()"
          v-show="isCurrentlyPlaying(track.track.id)"
        >
          <font-awesome-icon icon="pause-circle" />
        </button>
      </TrackListing>
    </ul>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import TrackListing from './TrackListing';

export default {

  name: 'PlayerControls',

  components: {
    TrackListing,
    FontAwesomeIcon,
  },

  computed: {
    ...mapState({
      songList: state => state.currentPlaylist,
      currentTrack: state => state.currentTrack,
      isPlaying: state => state.isPlaying,
    }),
  },

  methods: {
    ...mapActions([
      'playTrack',
      'pause',
    ]),
    togglePlayback(track) {
      if (!this.currentTrack) {
        this.playTrack(track);
      }
      else if (this.isCurrentlyPlaying(track.id)) {
        this.pause();
      }
    },
    isCurrentlyPlaying(trackId) {
      return this.isPlaying && this.currentTrack && (this.currentTrack.id === trackId);
    },
  },

};
</script>

<style lang="scss" scoped>
@import '../../sass/variables/variables';

.list-counter {
  color: lighten($color__bg-color, 40%);
  font-size: .8em;
  padding: 0.5rem;
}

</style>