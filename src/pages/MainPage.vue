<template>
    <div>
      <h1>Когда погаснет Солнце ?</h1>
      <div>
        <p>осталось ≈ {{ formattedTime }}</p>
      </div>
      <TheCountSun/>
    </div>
  </template>
  
  <script>
  import TheCountSun from "@/components/TheCountSun.vue"; // Замените путь на фактический путь к вашему компоненту

  export default {
    name: 'MainPage',
    components: {
    TheCountSun,
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
  /* Ваши стили могут быть добавлены здесь */
  </style>
  