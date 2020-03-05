<template>
  <section class="main-content">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  computed: {
    cachedViews() {
      return this.$store.state.tabs.cacheViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>
