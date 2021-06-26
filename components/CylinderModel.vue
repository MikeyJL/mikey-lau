<style lang="scss" scoped>
#cylinder-scene {
  margin: auto;
  height: 200px;
  width: 200px;
  perspective: 600px;
  opacity: .15;
  position: fixed;
  z-index: -1;
  top: 38%;
  left: 0;

  > #model-cylinder {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: 10s spin linear infinite;

    > div {
      height: 200px;
      width: 80px;
      position: absolute;
      border: 1px solid var(--accent);
      border-radius: 10px;
    }

    > .one {
      transform: rotateY(0) translateZ(60px);
    }
    > .two {
      transform: rotateY(60deg) translateZ(60px);
    }
    > .three {
      transform: rotateY(120deg) translateZ(60px);
    }
    > .four {
      transform: rotateY(180deg) translateZ(60px);
    }
    > .five {
      transform: rotateY(-60deg) translateZ(60px);
    }
    > .six {
      transform: rotateY(-120deg) translateZ(60px);
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
</style>

<template>
  <div id="cylinder-scene">
    <div id="model-cylinder">
      <div class="one" />
      <div class="two" />
      <div class="three" />
      <div class="four" />
      <div class="five" />
      <div class="six" />
    </div>
  </div>
</template>