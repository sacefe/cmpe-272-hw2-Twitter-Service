<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>
<style lang="scss">
@import '@/scss/app.scss';
</style>
