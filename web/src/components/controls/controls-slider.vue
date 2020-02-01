<template>
  <div class="controls-slider">
    <vue-slider
      min="0"
      width="85%"
      duration="0"
      v-model="newFrame"
      :max="getFramesCount"
      :processStyle="{ backgroundColor: '#00D2C2' }"
      :tooltipStyle="{ backgroundColor: '#00D2C2', borderColor: '#00D2C2' }"
    ></vue-slider>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  name: "controls-slider",
  components: { VueSlider },
  methods: {
    ...mapActions(["setCurrentFrame"])
  },
  computed: {
    ...mapGetters(["getCurrentFrame", "getFramesCount"]),
    newFrame: {
      get() {
        return this.getCurrentFrame;
      },
      set(value) {
        this.setCurrentFrame(value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.controls-slider {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}
</style>
