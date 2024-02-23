<template>
    <div>
      <p> конец солнца в секундах</p>
      <p>≈ {{ formattedNumber }}</p>
    </div>
  </template>
  
  <script>
  /* eslint-disable-next-line */
/* global BigInt */
  export default {
    name: 'TheCountSun',
  
    data() {
      return {
        number: BigInt('157700000000000000'),
      };
    },
  
    computed: {
      formattedNumber() {
        return this.number.toString();
      },
    },
  
    mounted() {
      setInterval(() => {
        this.number--;
      }, 1000);
    },
  };
  </script>
  
  <style>
  /* Если нужны стили, добавьте их здесь */
  </style>
  