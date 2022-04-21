<template>
  <div id="app">
    <!-- initialiser le router view -->
    <router-view></router-view>
  </div>
</template>

<script>
//appeler
// import HomePage from '@/components/HomePage'

export default {
  name: 'App',
  //declarer
  components:{
  }
}
</script>

<style>
@import url('./style/reset.css');
@import url('https://fonts.googleapis.com/css2?family=Roboto%3Awght%40300%3B400%3B700&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
  padding:0px 20px;
}
</style>
