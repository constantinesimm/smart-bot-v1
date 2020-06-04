<template>
  <component id="app" :is="layout">
      <router-view />
  </component>
</template>

<script>
  //import navMenu from './menu';
  export default {
      computed: {
      layout() {
        return `${ this.$route.meta.layout || 'default' }-layout`
      }
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    width: 100%;
    height: 100%;
    font-family: 'Ubuntu', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>