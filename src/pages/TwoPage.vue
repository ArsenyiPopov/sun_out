<template>
    <div class="video-bg" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
      <video class="elementor-video" src="https://sdo.gsfc.nasa.gov/assets/img/latest/mpeg/latest_1024_1700.mp4" type="video/mp4" autoplay muted loop playsinline controlslist="nodownload"></video>
      <div class="block_time">
        <h1>Пятна на солнце</h1>
        <p v-if="data">{{ data.date.local }}</p>
        <p v-if="data">Уровень геомагнитных возмущений: {{ data.gm }}</p>
        <p v-else>Loading...</p>
      </div>
    </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const data = ref(null);
    const router = useRouter();
    let startX = null;
    let endX = null;

    const fetchData = () => {
      fetch('https://cors-anywhere.herokuapp.com/https://api.gismeteo.net/v3/weather/', {
        headers: {
          'X-Gismeteo-Token': '56b30cb255.3443075'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        data.value = result;
      })
      .catch(error => {
        console.error('Произошла ошибка:', error);
      });
    };

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

    onMounted(() => {
      fetchData();
      const interval = setInterval(fetchData, 10 * 60 * 1000);
      onUnmounted(() => {
        clearInterval(interval);
      });
    });

    return {
      data,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd
    };
  }
};
</script>

<style>
/* Ваши стили */
</style>
