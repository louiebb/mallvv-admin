<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app,html,body {
  height: 100%;
  position: relative;
}
.html,body::-webkit-scrollbar { width: 0 !important }
.html,body { -ms-overflow-style: none; }
.html,body { overflow: -moz-scrollbars-none; }
</style>
