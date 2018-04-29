<template>
  <div>
    <ul>
      <TrackListing v-for="track in searchResults" :key="track.id" :track="track">
        <button class="btn btn__icon-btn--icon-only" @click="addTrack(track)"><font-awesome-icon icon="plus-circle" /></button>
      </TrackListing>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import TrackListing from './TrackListing';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {

  name: 'SearchResults',

  components: {
    TrackListing,
    FontAwesomeIcon,
  },

  computed: {
    ...mapState({
      searchResults: state => state.searchResults,
    }),
  },

  methods: {
    ...mapActions([
      'addTrack',
    ]),
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