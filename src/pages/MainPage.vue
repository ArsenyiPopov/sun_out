<script setup>
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router';
useHead({
  title: 'Когда погаснет Солнце ?',
  description: 'Собираем интересные данные о солнце',
  meta: [
    { name: 'yandex-verification', content: 'a89e2621b00f15a0' },
    
  ],
})
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
      router.go(1);
    } else if (deltaX < -50) {
      // Свайп влево - переключаемся на следующую страницу
      router.go(-1);
    }
  }
  startX = null;
  endX = null;
};
</script>

<template>
  <div class="page" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <div class="video-bg">
      <video class="elementor-video"  src="https://sdo.gsfc.nasa.gov/assets/img/latest/mpeg/latest_1024_0171.mp4" typeof="video/mp4" autoplay muted loop playsinline controlslist="nodownload"></video>
      <div class="block_time">
      <h1>Когда погаснет Солнце ?</h1>
        <p>осталось ≈ {{ formattedTime }}</p>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  

  export default {
    name: 'MainPage',
    components: {
    
  },
  
    data() {
      return {
        targetTime: 5e9 * 365 * 24 * 60 * 60, // 5 миллиардов лет в секундах
        currentTime: 0,
        timerId: null,
      };
    },
  
    computed: {
      timeRemaining() {
        return Math.max(this.targetTime - this.currentTime, 0);
      },
      formattedTime() {
        const years = Math.floor(this.timeRemaining / (365 * 24 * 60 * 60));
        const days = Math.floor((this.timeRemaining % (365 * 24 * 60 * 60)) / (24 * 60 * 60));
        const hours = Math.floor((this.timeRemaining % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((this.timeRemaining % (60 * 60)) / 60);
  
        return `${years} лет, ${days} дней, ${hours} часов, ${minutes} минут`;
      },
    },
  
    methods: {
      updateTimer() {
        const now = Math.floor(Date.now() / 1000);
        this.currentTime = now;
      },
    },
  
    mounted() {
      this.updateTimer(); // первичное обновление
      this.timerId = setInterval(this.updateTimer, 1000);
    },
  
    beforeUnmount() {
      clearInterval(this.timerId); // очистка таймера при уничтожении компонента
    },
  };
  </script>
  
  <style>
  .video-bg {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #000000;
    z-index: -3;
  }
  .video-bg video {
    height: 100vh;
    width: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .block_time {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 50px;
    align-content: flex-end;
  }
  @media screen and (max-width: 766px) {
    .bg {
      display: flex;
    flex-wrap: wrap;
    align-content: flex-end;
  }
.block_time {
    padding: 24px;
}
.video-bg {
  flex-direction: column;
  }
}
@media screen and (min-width: 1024px) {
  
  .video-bg {
    background-color: #000000;
    z-index: -3;
    align-items: flex-start;
  }

  .video-bg video {
    position: unset;
    object-fit: contain;
  }
 
}

  </style>
  