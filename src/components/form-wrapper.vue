<template>
  <div class="form-wrapper">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  position: relative;
  padding: 18px 10px 0 10px;
  border-bottom: 1px solid #f1f1f1;
  z-index: 999;
}
</style>
