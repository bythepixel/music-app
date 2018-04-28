<template>
  <div>
    <div class="list-counter">{{ songList.length }} songs</div>
    <ul>
      <TrackListing v-for="track in songList" :key="track.id" :track="track.track" />
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import TrackListing from './TrackListing';

export default {

  name: 'PlayerControls',

  components: {
    TrackListing,
  },

  computed: {
    ...mapState({
      songList: state => state.currentPlaylist,
    }),
  },

  methods: {
    ...mapActions([
      'setPlaylist',
      'playTrack',
    ]),
  },

  created() {
    this.$http.get('/api/player/getPlaylist')
      .then(res => {
        this.setPlaylist(res.data.items);
      });
  },

};
</script>

<style lang="scss" scoped>
@import '../../sass/variables/variables';

.list-counter {
  color: lighten($color__bg-color, 40%);
  font-size: .8em;
  padding: 0 0.5rem;
}

</style>