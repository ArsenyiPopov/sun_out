<script setup>
import { useHead } from '@unhead/vue'
useHead({
  title: 'Все о солнце',
  description: 'Собираем интересные и полезные данные о солнце',
  meta: [
    { name: 'yandex-verification', content: 'a89e2621b00f15a0' },
    
  ],
})
</script>
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
   
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {
  margin: 0;
  padding: 0;
  color: white;
}
p {
  color: white;
}
</style>
