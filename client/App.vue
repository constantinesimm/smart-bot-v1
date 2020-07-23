<template>
  <component id="app" :is="layout">
      <main class="app-content" role="main">
          <router-view />
      </main>
  </component>
</template>

<script>
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
  .app-content {
      height: calc(100vh - 175px);
      padding: 25px 10px;
      background: #eff1ea;
  }
</style>