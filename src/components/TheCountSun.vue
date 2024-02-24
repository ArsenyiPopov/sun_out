<template>
  <div>
    <p>Конец солнца в секундах</p>
    <p>≈ {{ formattedNumber }}</p>
  </div>
</template>

<script setup>
import { appwriteClient } from '../lib/appwrite.js';

import { ref, computed } from 'vue';

/* global BigInt */
const number = ref(BigInt('157700000000000000'));

const formattedNumber = computed(() => {
  return number.value.toString();
});

const databaseId = 'count_sun';

setInterval(() => {
  number.value--;

  appwriteClient
    .database
    .createDocument(databaseId, {
      field: number.value.toString(),
    })
    .then(response => {
      console.log('Значение счетчика обновлено успешно:', response);
    })
    .catch(error => {
      console.error('Ошибка при обновлении счетчика:', error);
    });
}, 1000);

</script>

<style>
  /* Если нужны стили, добавьте их здесь */
</style>
