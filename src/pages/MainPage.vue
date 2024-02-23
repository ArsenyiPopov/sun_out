<template>
    <div>
      <h1>Отсчет времени до красного гиганта</h1>
      <div>
        <p>Осталось: {{ formattedTime }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainPage',
  
    data() {
      return {
        targetTime: 5e9 * 365 * 24 * 60 * 60, // 5 миллиардов лет в секундах
        currentTime: 0,
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
        const seconds = Math.floor(this.timeRemaining % 60);
  
        return `${years} лет, ${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд`;
      },
    },
  
    methods: {
      updateTimer() {
        const now = Math.floor(Date.now() / 1000);
        this.currentTime += now - this.currentTime; // обновляем только при открытии страницы
      },
    },
  
    mounted() {
      this.updateTimer();
      setInterval(this.updateTimer, 1000);
    },
  };
  </script>
  
  <style>
  /* Ваши стили могут быть добавлены здесь */
  </style>
  
  