<template>
  <div class="search__result">
    <img class="track__image" :src="track.album.images[0].url" >
    <div class="track__details">
      <div class="track__name">{{ track.name }}</div>
      <div class="track__artist-name">{{ track.artists[0].name }}</div>
    </div>
    
    <div class="track__actions">
      <slot></slot>
    </div>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {

  name: 'TrackListing',

  props: {
    track: {
      type: Object,
      default: () => {
        return {
          id: 'asdf',
          name: 'Default Name',
          artists: [
            {
              id: 'fdsa',
              name: 'Artist Name',
            },
          ],
          album: {
            name: 'Album Name',
            images: [
              {
                url: '',
              },
            ],
          },
        };
      },
    },
  },

  methods: {
    ...mapActions([
      'playTrack',
    ]),
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

  .track__actions {
    padding-right: 1rem;
    opacity: 0;
    visibility: hidden;
    transition: transform ease 400ms, opacity ease 200ms, visibility ease 200ms;
  }

  &:hover, &:focus {

    .track__actions {
      transition: transform ease 400ms, opacity ease 100ms, visibility ease 100ms;
      transition-delay: 75ms;
      opacity: 1;
      visibility: visible;
      transform: scale(1.2);
    }
  }
}

.search__result .track__details {
  flex: 1 0 auto;
}

.track__artist-name {
  font-size: 0.9em;
  color: darken(invert($color__bg-color), 20%);
}

.track__image {
  border-radius: 50%;
  flex: 0 1 3em;
  max-width: 3em;
  margin-right: 1rem;
}

</style>