<template>
  <section class="main-content">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive> -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {

}
</script>
