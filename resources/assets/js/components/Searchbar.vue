<template>
  <div>
    <input type="search" v-model="query" >
    <button @click="search(query)">Search</button>
    <ul class="search__results-list">
      <TrackListing v-for="track in tracks" :key="track.id" :track="track" />
    </ul>
  </div>
</template>

<script>
import TrackListing from './TrackListing';
export default {

  name: 'Searchbar',

  components: {
    TrackListing,
  },

  data () {
    return {
      tracks: [],
      query: '',
    };
  },

  methods: {
    search(query) {
      this.$spotifyHttp
        .get('search', {
          params: {
            q: query,
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

<style lang="css">

.album-image {
  width: 40px;
  margin-right: 1rem;
}

.search__results-list {
  list-style: none;
  text-align: left;
}

audio {
  align-self: flex-end;
}

</style>