<template>
  <transition
    v-if="showToast || showLoading"
    name="fade"
  >
    <div class="loading-view">

      <div
        class="ajax-loading load-status"
        v-show="showLoading"
      >
        <div class="loading-box">
          <div class="la-square-jelly-box">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div
        class="ajax-toast load-status"
        v-show="showToast"
      >
        <div class="toast">
          <span>{{showToast?showToast:'完成'}}</span>
        </div>
      </div>
    </div>
  </transition>

</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    showLoading: "",
    showToast: ""
  }
}
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease;
}
@mixin flexcenter($x, $y) {
  display: flex;
  justify-content: $x;
  align-items: $y;
}
@mixin boxsizing($x) {
  box-sizing: $x;
}
.loading-view {
  position: fixed;
  top: 0;
  z-index: 99;
}
.ajax-loading {
  background-color: rgba(0, 0, 0, 0.65);
}
.ajax-loading,
.ajax-toast {
  width: 100%;
  height: 100%;
  @include flexcenter(center, center);
  position: fixed;
  padding: 96px 0;
  z-index: 10;
  color: #ffffff;
  @include boxsizing(border-box);
  .la-square-jelly-box {
    width: 72px;
    height: 72px;
    &,
    & > div {
      position: relative;
    }
    & > div {
      background-color: currentColor;
    }
    & > div:nth-child(1),
    & > div:nth-child(2) {
      position: absolute;
      left: 0;
      width: 100%;
    }
    & > div:nth-child(1) {
      top: -25%;
      z-index: 1;
      height: 100%;
      border-radius: 10%;
      -webkit-animation: square-jelly-box-animate 0.6s -0.1s linear infinite;
      -moz-animation: square-jelly-box-animate 0.6s -0.1s linear infinite;
      -o-animation: square-jelly-box-animate 0.6s -0.1s linear infinite;
      animation: square-jelly-box-animate 0.6s -0.1s linear infinite;
    }
    & > div:nth-child(2) {
      bottom: -9%;
      height: 10%;
      background: #000;
      border-radius: 50%;
      opacity: 0.2;
      -webkit-animation: square-jelly-box-shadow 0.6s -0.1s linear infinite;
      -moz-animation: square-jelly-box-shadow 0.6s -0.1s linear infinite;
      -o-animation: square-jelly-box-shadow 0.6s -0.1s linear infinite;
      animation: square-jelly-box-shadow 0.6s -0.1s linear infinite;
    }
  }
  /*!
 * Load Awesome
 */
  .toast {
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 12px;
    padding: 0 40px;
    line-height: 88px;
    font-size: 26px;
  }
}

@-webkit-keyframes square-jelly-box-animate {
  17% {
    border-bottom-right-radius: 10%;
  }

  25% {
    -webkit-transform: translateY(25%) rotate(22.5deg);
    transform: translateY(25%) rotate(22.5deg);
  }

  50% {
    border-bottom-right-radius: 100%;
    -webkit-transform: translateY(50%) scale(1, 0.9) rotate(45deg);
    transform: translateY(50%) scale(1, 0.9) rotate(45deg);
  }

  75% {
    -webkit-transform: translateY(25%) rotate(67.5deg);
    transform: translateY(25%) rotate(67.5deg);
  }

  100% {
    -webkit-transform: translateY(0) rotate(90deg);
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes square-jelly-box-animate {
  17% {
    border-bottom-right-radius: 10%;
  }

  25% {
    -webkit-transform: translateY(25%) rotate(22.5deg);
    -moz-transform: translateY(25%) rotate(22.5deg);
    -o-transform: translateY(25%) rotate(22.5deg);
    transform: translateY(25%) rotate(22.5deg);
  }

  50% {
    border-bottom-right-radius: 100%;
    -webkit-transform: translateY(50%) scale(1, 0.9) rotate(45deg);
    -moz-transform: translateY(50%) scale(1, 0.9) rotate(45deg);
    -o-transform: translateY(50%) scale(1, 0.9) rotate(45deg);
    transform: translateY(50%) scale(1, 0.9) rotate(45deg);
  }

  75% {
    -webkit-transform: translateY(25%) rotate(67.5deg);
    -moz-transform: translateY(25%) rotate(67.5deg);
    -o-transform: translateY(25%) rotate(67.5deg);
    transform: translateY(25%) rotate(67.5deg);
  }

  100% {
    -webkit-transform: translateY(0) rotate(90deg);
    -moz-transform: translateY(0) rotate(90deg);
    -o-transform: translateY(0) rotate(90deg);
    transform: translateY(0) rotate(90deg);
  }
}

@-webkit-keyframes square-jelly-box-shadow {
  50% {
    -webkit-transform: scale(1.25, 1);
    transform: scale(1.25, 1);
  }
}

@keyframes square-jelly-box-shadow {
  50% {
    -webkit-transform: scale(1.25, 1);
    -moz-transform: scale(1.25, 1);
    -o-transform: scale(1.25, 1);
    transform: scale(1.25, 1);
  }
}
</style>