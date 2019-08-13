<template>
  <div class="home">
    <dashboard></dashboard>
  </div>
</template>

<script>
import dashboard from '_c/dashboard/index.vue'

export default {
  name: 'home',
  components: {
    dashboard
  }
}
</script>
<style scoped>
.home{
  width: 100%;
  height: 100%;
}
</style>

