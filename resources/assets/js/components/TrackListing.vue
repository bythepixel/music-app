<template>
  <div class="search__result">
    <img class="track__image" :src="track.album.images[0].url" >
    <div>
      <div class="track__name">{{ track.name }}</div>
      <div class="track__artist-name">{{ track.artists[0].name }}</div>
    </div>
    
    <audio :id="'audio__' + _uid" 
:src="track.preview_url" 
v-if="track.preview_url" 
controls/>

    </div>
</template>

<script>
export default {

  name: 'TrackListing',

  props: {
    track: {
      type: Object,
      default: () => {
        return {
          name: 'Default Name',
        };
      },
    },
  },

  data () {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>

@import '../../sass/variables/variables';

.search__result {
  display: flex;
  align-items: center;

  background-color: lighten($color__bg-color, 15%);
  border-bottom: 1px solid $color__bg-color;
  color: invert($color__bg-color);

  padding: 0.75rem 0.5rem;
  font-size: 0.9em;
}

.search__result span {
  flex: 1 0 auto;
}

.track__artist-name {
  font-size: 0.9em;
  color: darken(invert($color__bg-color), 20%);
}

.track__image {
  border-radius: 50%;
  flex: 0 1 3em;
  margin-right: 1rem;
}

</style>