<template>
    <div class="video-bg" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
      <video class="elementor-video" src="https://sdo.gsfc.nasa.gov/assets/img/latest/mpeg/latest_1024_1700.mp4" type="video/mp4" autoplay muted loop playsinline controlslist="nodownload"></video>
      <div class="block_time">
        <h1>Пятна на солнце</h1>
        <p v-if="data">{{ data.location.name }}</p>
        <p v-if="data">Время {{ data.location.localtime }}</p>
        <p v-if="data">Уровень геомагнитных возмущений: {{ data.astronomy.astro.moon_phase }}</p>
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
    let latitude = null; // объявляем переменные latitude и longitude здесь
    let longitude = null;

    const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude; // присваиваем значение latitude и longitude
        console.log(latitude);
        longitude = position.coords.longitude;
        console.log(longitude);
        fetchData(); // вызываем fetchData без передачи параметров
      }, (error) => {
        console.error('Ошибка получения геолокации:', error);
      });
    } else {
      console.error('Геолокация не поддерживается вашим браузером');
    }
  };
  
  const fetchData = () => {
  if (!latitude || !longitude) {
    console.error('Широта и долгота не определены');
    return;
  }

  let url = `https://api.weatherapi.com/v1/astronomy.json?key=fc2459eb94e940e6a90142700243004&q=${latitude},${longitude}&dt=2024-05-01`;

  fetch(url, {
    headers: {
      // Здесь могут быть ваши заголовки, если нужно
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
      getUserLocation(); 
      const interval = setInterval(fetchData, 10 * 60 * 1000);
      onUnmounted(() => {
        clearInterval(interval);
      });
    });

    return {
      getUserLocation,
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
