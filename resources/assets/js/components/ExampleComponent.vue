<template>
  <div>
    <input type="search" v-model="query" >
    <button @click="search(query)">Search</button>
    <ul class="search__results-list">
      <li class="search__result" v-for="track in tracks" :key="track.id">
        <img class="album-image" :src="track.album.images[0].url" >
        <span>{{ track.name }} |
        {{ track.artists[0].name }}</span>
        
        <audio :id="'audio__' + _uid" 
:src="track.preview_url" 
v-if="track.preview_url" 
controls/>

        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.album-image {
  width: 40px;
  margin-right: 1rem;
}

.search__results-list {
  list-style: none;
  text-align: left;
}

.search__result {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.search__result span {
  flex: 1 0 auto;
}

audio {
  align-self: flex-end;
}
</style>
