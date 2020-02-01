<template>
  <div class="view-controls">
    <div class="view-controls-buttons">
      <controls-play-pause/>
      <controls-speed/>
      <controls-loop/>
    </div>
    <div class="view-controls-timing">
      {{ getCurrentFrame }} / {{ getFramesCount }} frames ({{ getFrameRate }} FPS)
    </div>
    <controls-slider/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import ControlsPlayPause from './controls/controls-play-pause';
  import ControlsSpeed from './controls/controls-speed';
  import ControlsLoop from './controls/controls-loop';
  import ControlsSlider from './controls/controls-slider';

  export default {
    name: 'view-controls',
    components: {
      ControlsPlayPause,
      ControlsSpeed,
      ControlsLoop,
      ControlsSlider,
    },
    computed: {
      ...mapGetters([
        'getFramesCount',
        'getCurrentFrame',
        'getFrameRate',
      ]),
    },
  };
</script>

<style lang="scss" scoped>
  .view-controls{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #1b1b1b;
    padding: 16px 0;
    color: white;
    border-top: 16px solid #00D2C2;

    &-buttons{
      display: flex;
      margin-right: 16px;
      
      .controls-play-pause, .controls-loop, .controls-speed{
        margin: auto;
        margin-right: 16px;
      }
    }

    &-timing{
      margin: auto 0;
    }
  }
</style>

