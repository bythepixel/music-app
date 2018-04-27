<template>
  <div>
    <button v-if="!isPlaying" @click="play()">Play</button>
    <button v-if="isPlaying" @click="pause()">Pause</button>
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
    }),
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