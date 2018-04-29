<template>
  <div class="controls__container" :style="backgroundImage" v-show="this.currentTrack">
    <div class="controls__button-row">
      <button class="btn btn__icon-btn--icon-only btn__icon-btn--large" v-if="!isPlaying" @click="play()" aria-label="play">
        <font-awesome-icon :icon="['far', 'play-circle']" />
      </button>

      <button class="btn btn__icon-btn--icon-only btn__icon-btn--large" v-if="isPlaying" @click="pause()" aria-label="pause">
        <font-awesome-icon :icon="['far', 'pause-circle']" />
      </button>
    </div>

    <div class="controls__track-info">
      <span>{{ currentTrack ? currentTrack.name : '' }}</span>
    </div>

  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {

  name: 'PlayerControls',

  components: {
    FontAwesomeIcon,
  },

  computed: {
    ...mapState({
      isPlaying: state => state.isPlaying,
      currentTrack: state => state.currentTrack,
    }),
    backgroundImage() {
      if (this.isPlaying && this.currentTrack) {
        return {
          backgroundImage: `url("${this.currentTrack.album.images[0].url}")`,
        };
      }
      else if (!this.isPlaying && this.currentTrack) {
        return {
          backgroundColor: 'rgba(0,0,0,0.9)',
          backgroundImage: `url("${this.currentTrack.album.images[0].url}")`,
        };
      }
    },
  },

  methods: {
    ...mapActions([
      'pause',
      'play',
    ]),
  },
};
</script>

<style lang="css" scoped>

.controls__container {
  transition: background-color ease 300ms;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(0,0,0,.65);
  background-blend-mode: multiply;
  background-position: center;
}

.controls__button-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.controls__track-info {
  text-align: center;
  margin-bottom: 1rem;
}
</style>