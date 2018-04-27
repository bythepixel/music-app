<template>
  <div :style="backgroundImage">
    <button v-if="!isPlaying" @click="play()">Play</button>
    <button v-if="isPlaying" @click="pause()">Pause</button>
    <pre>{{ currentTrack ? currentTrack.name : '' }}</pre>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';

export default {

  name: 'PlayerControls',

  data () {
    return {

    };
  },

  computed: {
    ...mapState({
      isPlaying: state => state.isPlaying,
      currentTrack: state => state.currentTrack,
    }),
    backgroundImage() {
      if (this.isPlaying && this.currentTrack) {
        console.log(`"url${this.currentTrack.album.images[0].url}"`)
        return {
          backgroundImage: `url("${this.currentTrack.album.images[0].url}")`,
        };
      }
    },
  },

  methods: {
    ...mapMutations([
      'pause',
      'play',
    ]),
  },
};
</script>

<style lang="css" scoped>
</style>