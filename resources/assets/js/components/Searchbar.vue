<template>
  <div>
    <form class="search" @submit.prevent="getSearchResults(query)">
      <font-awesome-icon icon="search" class="search__icon" />
      <input class="search__input"
        type="search"
        v-model="query"
        placeholder="Search"
        >
      <button v-if="query" type="button" @click="clearSearch()" class="btn btn__icon-btn--icon-only clear__icon" aria-label="clear search"><font-awesome-icon icon="times-circle" /></button>
    </form>
    <div class="list-counter" v-if="searchResults.length >= 1">{{ searchResults.length }} songs found</div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
export default {

  name: 'Searchbar',

  components: {
    FontAwesomeIcon,
  },

  data () {
    return {
      tracks: [],
      query: undefined,
    };
  },

  computed: {
    ...mapState({
      searchResults: state => state.searchResults,
    }),
  },

  methods: {
    ...mapActions([
      'getSearchResults',
      'clearSearchResults',
    ]),
    clearSearch() {
      this.query = undefined;
      this.clearSearchResults();
    },
  },

};
</script>

<style lang="scss">
@import '../../sass/variables/variables';

.list-counter {
  color: lighten($color__bg-color, 40%);
  font-size: .8em;
  padding: 0.5rem;
}

.search {
  display: flex;
  align-items: center;
  position: relative;

  .search__icon {
    position: absolute;
    left: 1rem;
  }

  .clear__icon {
    position: absolute;
    right: 1rem;
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

    &:focus {
      background-color: lighten($color__bg-color, 15%);
    }
  }
}

</style>