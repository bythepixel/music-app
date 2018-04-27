<template>
  <div>
    <form class="search" @submit="search">
      <font-awesome-icon icon="search" class="search__icon" />
      <input class="search__input"
        type="search"
        v-model="query"
        placeholder="Search"
        >
    </form>
    <ul class="search__results-list">
      <TrackListing v-for="track in tracks" :key="track.id" :track="track" />
    </ul>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import TrackListing from './TrackListing';
export default {

  name: 'Searchbar',

  components: {
    TrackListing,
    FontAwesomeIcon,
  },

  data () {
    return {
      tracks: [],
      query: '',
    };
  },

  methods: {
    search(e) {
      e.preventDefault();
      this.$spotifyHttp
        .get('search', {
          params: {
            q: this.query,
            type: 'track',
          },
        })
        .then(res => {
          this.tracks = res.data.tracks.items;
        });
    },
  },

};
</script>

<style lang="scss">
@import '../../sass/variables/variables';

.search {
  display: flex;
  align-items: center;
  position: relative;

  .search__icon {
    position: absolute;
    left: 1rem;
  }

  .search__input {
    width: 100%;
    background-color: $color__bg-color;
    border: none;
    color: lighten(invert($color__bg-color), 40%);
    padding: 1rem 1rem 1rem 3rem;

    &:hover, &:focus {
      background-color: lighten($color__bg-color, 10%);
    }
  }
}

</style>