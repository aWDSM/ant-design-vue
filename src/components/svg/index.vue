<template>
  <svg
    :class="`scoped-svg-icon ${spin ? 'scoped-svg-animation' : ''}`"
    aria-hidden="true"
    v-on="$listeners"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    spin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.scoped-svg-icon {
  width: 36px;
  height: 36px;
  vertical-align: middle;
  overflow: hidden;
  &.scoped-svg-animation {
    animation: rotate 1.5s linear infinite;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
