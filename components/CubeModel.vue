<style lang="scss" scoped>
#cube-scene {
  margin: auto;
  height: 200px;
  width: 200px;
  perspective: 600px;
  opacity: .15;
  position: fixed;
  z-index: -1;
  top: 38%;
  left: 0;

  > #model-cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: 10s spin linear infinite;

    > div {
      height: 200px;
      width: 200px;
      position: absolute;
      border: 1px solid var(--accent);
      border-radius: 10px;
    }

    > .front {
      transform: rotate(0) translateZ(90px);
    }
    > .back {
      transform: rotateY(180deg) translateZ(90px);
    }
    > .top {
      transform: rotateX(90deg) translateZ(90px);
    }
    > .bottom {
      transform: rotateX(-90deg) translateZ(90px);
    }
    > .left {
      transform: rotateY(-90deg) translateZ(90px);
    }
    > .right {
      transform: rotateY(90deg) translateZ(90px);
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate3d(1, 1, 1, 0);
  }
  20% {
    transform: rotate3d(.5, 0, 1, 72deg);
  }
  40% {
    transform: rotate3d(0, 1, .5, 144deg);
  }
  60% {
    transform: rotate3d(1, .2, 0, 216deg);
  }
  80% {
    transform: rotate3d(1, 0, .8, 288deg);
  }
  100% {
    transform: rotate3d(0, .2, 1, 360deg);
  }
}

@media (max-width: 425px) {
  #cube-scene {
    opacity: .1;
  }
}
</style>

<template>
  <div id="cube-scene">
    <div id="model-cube">
      <div class="front" />
      <div class="back" />
      <div class="top" />
      <div class="bottom" />
      <div class="left" />
      <div class="right" />
    </div>
  </div>
</template>