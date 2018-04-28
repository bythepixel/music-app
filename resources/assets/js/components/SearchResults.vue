<template>
  <div>
    <ul>
      <SearchResult v-for="track in songList" :key="track.id" :track="track" />
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SearchResult from './SearchResult';

export default {

  name: 'SearchResults',

  components: {
    SearchResult,
  },

  computed: {
    ...mapState({
      songList: state => state.searchResults,
    }),
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