<template>
  <div class="layout-wrapper">
    <sidebar />
    <div class="main-container">
      <navbar />
      <tagbar />
      <main-content />
    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar/index'
import Navbar from './navbar/index'
import Tagbar from './tagbar/index'
import Main from './main/index'
export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    Tagbar,
    MainContent: Main
  }
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
