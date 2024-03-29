<template>
  <div id="app" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

let startX = null;
let endX = null;

const handleTouchStart = (event) => {
  startX = event.touches[0].clientX;
};

const handleTouchMove = (event) => {
  if (!startX) return;
  endX = event.touches[0].clientX;
};

const handleTouchEnd = () => {
  if (startX && endX) {
    const deltaX = endX - startX;
    if (deltaX > 50) {
      // Свайп вправо - переключаемся на предыдущую страницу
      router.go(-1);
    } else if (deltaX < -50) {
      // Свайп влево - переключаемся на следующую страницу
      router.go(1);
    }
  }
  startX = null;
  endX = null;
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1, p {
  color: white;
}
</style>
